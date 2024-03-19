import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from 'react';

function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0.00)

    fetch('http://localhost:5000/get_balance', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            localStorage.setItem('connected', "false")
        }
    }).then(data => {
        if (data) {
            setBalance(data)
        }
    });
    return (
    <>
    <Header />
    <div style={{background: "#F7EDE2", height: '81vh'}}>
    <div className="container">
        <div className="row" style={{paddingTop: '35px'}}>
            <div className="col">
                <div style={{display: 'flex',flexDirection: 'column',borderRadius: '30px', justifyContent: 'space-around', width: '100%', height: '155px', backgroundColor: '#283044', padding: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '30px'}}>Balance</h1>
                    <h1 style={{color: 'white',textAlign:'right', fontSize: '35px'}}>{balance} $</h1>
                </div>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '155px',marginTop:'20px', backgroundColor: '#283044'}}></div>
            </div>
            <div className="col" >
                <div style={{padding: '20px',display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '330px', backgroundColor: '#283044'}}>
                <h1 style={{color: 'white', fontSize: '30px'}}>Recent Transactions</h1>
                </div>
            </div>
            <div className="col">
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '330px', backgroundColor: '#283044'}}></div>
            </div>
        </div>
        <div className="row" style={{marginTop: '20px'}}>
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '300px', backgroundColor: '#283044'}}></div>
            </div>
            <div className='col'>
                <div style={{display: 'flex',borderRadius: '30px', justifyContent: 'space-between', width: '100%', height: '300px', backgroundColor: '#283044'}}></div>
            </div>
        </div>
    </div>
    </div>
    </>
    )

}

export default Dashboard;