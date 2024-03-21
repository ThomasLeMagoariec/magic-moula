import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from 'react';

function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0.00)
    const [name, setName] = useState("");
    const [transactions, setTransactions] = useState([{}]);
    const [id, setId] = useState(0);
    useEffect(() => {
    fetch("http://localhost:5000/get_user_info", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        }
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        }
    }).then((data) => {
        if (data) {
            setName(data.name)
            setBalance(data.balance);
            setId(data.id)
        }
    });
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/get_recent_transactions", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            }
        }).then((data) => {
            if (data) {
                setTransactions(data);
                console.log(data)
            }
        });
    }, []);

    const disconnect = () => {
        localStorage.removeItem("token");
        localStorage.setItem("connected", "false");
        navigate("/")
    }


    return (
    <>
    <Header />
    <div style={{background: "#F7EDE2", height: '81vh'}}>
    
    <div className="container">
        <div className="row" style={{paddingTop: '35px'}}>
            <div className="col" style={{maxWidth: '30%'}}>
                <div style={{display: 'flex',flexDirection: 'column',borderRadius: '30px', justifyContent: 'space-around', width: '100%', height: '155px', backgroundColor: '#283044', padding: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '30px'}}>Hello, {name}</h1>
                    <h1 style={{color: 'white',textAlign:'right', fontSize: '35px'}}>{balance} €</h1>
                </div>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '280px',marginTop:'20px', backgroundColor: '#283044'}}></div>
            </div>
            <div className="col">
                <div style={{padding: '20px',display: 'flex',flexDirection: 'column', borderRadius: '30px', width: '100%', height: '455px', backgroundColor: '#283044'}}>
                <h1 style={{color: 'white', fontSize: '30px', marginBottom: '10px'}}>Recent Transactions</h1>
                    {transactions.map((transaction) => (
                        <div style={{color: 'white', display: 'flex', justifyContent: 'space-between'}} key={transaction[5]}>
                            {transaction[0] === id ? <p>{"Envoyer"}</p> : <p>{"Recu"}</p>}
                            <p>{"Amount : " + transaction[0]}</p>
                            <p>{"Lastname : "+ transaction}</p>
                        </div>
                    ))}
                
                </div>
            </div>
        </div>
        <div className="row" style={{marginTop: '30px'}}>
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '300px', backgroundColor: '#283044'}}></div>
            </div>
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '300px', backgroundColor: '#283044'}}></div>
            </div>
        </div>
    </div>

    <button className="btn btn-danger dc" onClick={disconnect} style={{position: 'absolute', bottom: 0}}>DC</button>
    </div>
    </>
    )

}

export default Dashboard;