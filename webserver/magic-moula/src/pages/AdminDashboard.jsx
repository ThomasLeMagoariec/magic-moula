import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

function AdminDashboard() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [number, setNumber] = useState(0);
    
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

    

    const setBal = (id) => {
        const amount = window.prompt("Enter the amount to set the balance to: ");
        fetch("http://localhost:5000/update_balance", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "amount": amount,
                "id": id
            })
        })
    }

    return (
        <>
            <Header />
            <h1>Total Money in system: €{totalAmount} ({number} accounts)</h1>
            <br />
            <div className="container" style={{display: "flex"}}>
                {accounts.map((account) => (
                    <div className="card" style={{width: "20rem", height: "200px"}}>
                        <div className="card-body">
                            <h5 className="card-title">{account[1]} {account[2]}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{account[3]}</h6>
                            <p className="card-text">Balance: {account[5]}</p>
                            <button className="btn btn-danger" style={{position: "absolute", bottom: 0}} onClick={() => setBal(account[0])}>Set Balance</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AdminDashboard;