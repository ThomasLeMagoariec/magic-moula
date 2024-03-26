import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import flechev from '../img/flechev.png';
import flecher from '../img/flecher.png';

function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0.00)
    const [name, setName] = useState("");
    const [transactions, setTransactions] = useState([{}]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false)
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
    <div style={{background: "#F7EDE2", height: '92vh'}}>
    
    <div className="container">
        <div className="row" style={{paddingTop: '35px'}}>
            <div className="col" style={{maxWidth: '30%'}}>
                <div style={{display: 'flex',flexDirection: 'column',borderRadius: '30px', justifyContent: 'space-around', width: '100%', height: '140px', backgroundColor: '#283044', padding: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '30px'}}>Hello, {name}</h1>
                    <h1 style={{color: 'white',textAlign:'right', fontSize: '35px'}}>{balance} €</h1>
                </div>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '280px',marginTop:'20px', backgroundColor: '#283044'}}></div>
            </div>
            <div className="col">
                <div style={{padding: '25px',display: 'flex',flexDirection: 'column', borderRadius: '30px', width: '100%', height: '440px', backgroundColor: '#283044'}}>
                <h1 style={{color: 'white', fontSize: '30px', marginBottom: '10px'}}>Recent Transactions</h1>
                    {loading ? null : transactions.map((transaction) => (
                        <div style={{color: 'black',padding: '10px',borderRadius: '10px',backgroundColor: "#69a197" ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '19px'}} key={transaction[5]}>
                            {transaction[7] ? <img src={flecher} height={"40px"}/>: <img src={flechev}/>}
                            <a>{"Type: " + transaction[3]}</a>
                            {transaction[7] ? <a>{"Envoyer à " + transaction[6]}</a> : <a>{"Recu de "+ transaction[6]}</a>}
                            <a>{ transaction[0]+" €"}</a>
                        </div>
                    ))}
                
                </div>
            </div>
        </div>
        <div className="row" style={{marginTop: '30px'}}>
            <div className='col'>
                <div style={{display: 'flex',flexDirection:'column', padding: '25px',borderRadius: '30px',  width: '100%', height: '300px', backgroundColor: '#283044'}}>
                    <h1 style={{color: 'white', fontSize: '30px', marginBottom: '10px'}}>Quick Transfer</h1>
                    <div className="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
                        <input id='password' type="password" placeholder="Mot de passe" onChange={(ev) => setPassword(ev.target.value)} className="form-control" />
                        <label htmlFor="password" className="form-label">Iban</label>
                    </div>
                </div>
            </div>
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '300px', backgroundColor: '#283044'}}></div>
            </div>
        </div>
    </div>
    </div>
    <Footer />
    </>
    )

}

export default Dashboard;