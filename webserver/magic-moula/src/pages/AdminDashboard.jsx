import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

function AdminDashboard() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [number, setNumber] = useState(0);
    const [value, setValue] = useState(0);
    
    useEffect(() => {
        fetch("http://localhost:5000/get_admin_data", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',        
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            if (data) {
                setAccounts(data["data"]);
                setValue(data["magic_value"])
            }
        });

    }, []);

    useEffect(() => {
        var total = 0;
        accounts.forEach((account) => {
            console.log(account[5])
            if (account[5] === null) account[5] = 0;
            total += parseFloat(account[5]);
        })

        setTotalAmount(total);
        setNumber(accounts.length);
    }, [accounts])

    

    const setBal = async (id, amount) => {
        if (amount == undefined) amount = window.prompt("Enter the amount to set the balance to: ");
        fetch("http://localhost:5000/update_balance", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "amount": amount,
                "id": id
            })
        });
    }

    const setBalPublic = async (id) => {
        const amount = window.prompt("Enter the amount to add: ");

        fetch("http://localhost:5000/transfer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "from": 1,
                "to": id,
                "amount": amount,
                "category": "Transfer",
                "message": "Transfer from public account"
            })
        }).then((response) => {
            if (response.status === 200) {
                window.location.reload(true);
            }
        })
        
    }

    return (
        <>
            <Header />
            <div className="content" style={{background: "#F7EDE2", height: "100vh"}}>
                <h1 style={{margin: "20px"}}>{new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(totalAmount)}<br />{number} accounts <br />$MAGIC: {value}</h1>
                <br />
                <div className="container" style={{display: "flex"}}>
                    {accounts.map((account) => (
                        <div className="card" style={{width: "20rem", height: "200px", margin: "5px"}}>
                            <div className="card-body" style={{width: "100%"}}>
                                <h5 className="card-title">{account[1]} {account[2]}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{account[3]}</h6>
                                <p className="card-text">Balance: {new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(account[5])}</p>
                                <button className="btn btn-danger" style={{position: "absolute", bottom: 0, left: 0}} onClick={() => setBal(account[0])}>Set Balance</button>
                                <button className="btn btn-danger" style={{position: "absolute", bottom: 0, right: 0}} onClick={() => setBalPublic(account[0])}>Transfer</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-danger" onClick={() => navigate("/")} style={{position: "absolute", bottom: 0}}>home</button>
            </div>
        </>
    );
}

export default AdminDashboard;