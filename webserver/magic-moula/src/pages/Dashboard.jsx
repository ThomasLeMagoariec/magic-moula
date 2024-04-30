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
    const [iban, setIban] = useState("");
    const [montant, setMontant] = useState(0.00);
    const [transfer, setTransfer] = useState([{}]);
    const [reload, setReload] = useState(0);



    const handleSend = (iban,montant) => {
        var msg = prompt("enter a message for transfer:")
        fetch("http://localhost:5000/transfer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                to: iban,
                amount: montant,
                category: "transfer",
                message: msg
            })
        }).then((response) => {
            if (response.status === 200) {
                setReload(Date.now)
            }
        })

        }

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
                setTransactions(data.transactions);
                setTransfer(data.recent_transfer);
                setLoading(false)
            }
        });
    }, [reload]);




    const disconnect = () => {
        localStorage.removeItem("token");
        localStorage.setItem("connected", "false");
        navigate("/")
    }


    return (
    <>
    <Header />
    <div style={{background: "#F7EDE2", height: '109vh'}}>
    
    <div className="container">
        <div className="row" style={{paddingTop: '35px'}}>
            <div className="col" style={{maxWidth: '30%'}}>
                <div style={{display: 'flex',flexDirection: 'column',borderRadius: '30px', justifyContent: 'space-around', width: '100%', height: '140px', backgroundColor: '#283044', padding: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '30px'}}>Hello, {name}</h1>
                    <h1 style={{color: 'white',textAlign:'right', fontSize: '35px'}}>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(balance)}</h1>
                </div>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '280px',marginTop:'20px', backgroundColor: '#283044'}}></div>
            </div>
            <div className="col">
                <div style={{padding: '25px',display: 'flex',flexDirection: 'column', borderRadius: '30px', width: '100%', height: '440px', backgroundColor: '#283044'}}>
                <h1 style={{color: 'white', fontSize: '30px', marginBottom: '10px'}}>Recent Transactions</h1>
                    {loading ? null : transactions.map((transaction) => (
                        <div style={{color: 'black',padding: '10px',borderRadius: '10px',backgroundColor: "#69a197" ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '19px', margin: '3px'}} key={transaction[5]}>
                            {transaction[7] ? <img src={flecher} height={"40px"}/>: <img src={flechev} height={"40px"}/>}
                            <a>{"Object : " + transaction[4]}</a>
                            {transaction[7] ? <a>{"Envoyer à " + transaction[6]}</a> : <a>{"Recu de "+ transaction[6]}</a>}
                            <a>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(transaction[2])}</a>
                        </div>
                    ))}
                
                </div>
            </div>
        </div>
        <div className="row" style={{marginTop: '30px'}}>
            <div className='col'>
                    <div style={{display: 'flex',flexDirection:'column', padding: '25px',borderRadius: '30px',  width: '100%', height: '440px', backgroundColor: '#283044', color: "white"}}>
                        <h1 style={{color: 'white', fontSize: '30px', marginBottom: '10px'}}>Quick Transfer</h1>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: "black"}}>
                        <div className="border border-2 rounded-3 form-floating m-2">
                            <input id='password' type="text" placeholder="Mot de passe" value={iban} onChange={(ev) => {if ((ev.target.value.length <= 2 && /^[0-9]+$/.test(ev.target.value))|| ev.target.value === "") {setIban(ev.target.value)}}} className="form-control" />
                            <label htmlFor="password" className="form-label">IBAN</label>
                        </div>
                        <div className="border border-2 rounded-3 form-floating mt-2 mb-2">
                            <input id='password' type="text" placeholder="Mot de passe" value={montant} onChange={(ev) => {if (/^[0-9]+$/.test(ev.target.value) || ev.target.value === "") {setMontant(ev.target.value)}}} className="form-control" />
                            <label htmlFor="password" className="form-label">Amount</label>
                        </div>
                        <button className='btn btn-lg btn-primary' onClick={() => handleSend(iban,montant)}>Send</button>
                        </div>
                        {loading ? null : transfer.map((transaction2) => (
                            <div key={transaction2[0]} style={{display: 'flex',alignItems: 'center',justifyContent:'space-around',color: 'black',marginLeft: "10px",backgroundColor: "#69a197",borderRadius: '10px',marginTop: '25px', fontSize: '20px',height: "60px"}}>
                                <a>Iban : {transaction2[0]} </a>
                                <a>Amount : {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(transaction2[1])} </a>
                                <button className='btn btn-primary' onClick={() => handleSend(transaction2[0],transaction2[1])}>Send Again</button>
                            </div>)
                        )}
                    </div>
            </div>  
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '440px', backgroundColor: '#283044'}}></div>
            </div>
        </div>
    </div>
    </div>
    <Footer />
    </>
    )

}

export default Dashboard;