
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginComp from "../components/Login";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";


const Paiement = () => {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [montant, setMontant] = useState(0.00);
    // recupere les argument de l'url
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const amount = params.get('amount');
    const command = JSON.parse(params.get('command'));
    const [balance, setBalance] = useState(0.00)
    console.log(command)
    const handlePaie = (taxprice2) => {
      console.log(taxprice2)
      fetch("http://localhost:5000/transfer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                to: 9,
                amount: taxprice2,
                category: "transfer",
                message: ""
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            }
        }).then((data) => {
            if (data === 'success') {
                // window.location.href = '/dashboard'
            }
        });
    }
    useEffect(() => {
        fetch("http://localhost:5000/get_balance", {
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
                setBalance(data)
            }
        });
    }, [])

    const handlelogin = () => {
        if (localStorage.getItem('connected') === 'true') {
          const taxprice = +amount+ +amount*0.69;
            return (<>
            <div className="row" style={{maxWidth: '100vw'}}>
              <div className="col" style={{display: "flex",minHeight: '69.3vh', padding: '40px',alignItems: 'center', justifyContent: 'center'}}>
                <div style={{position: 'relative',width: '55%',boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: '30px',textAlign:'center'}}>
            {command.map((item) => {
                return <div key={item.name} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  
                    <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>{item.name}</h1>
                    <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>{item.count+"x"+" "+item.price*item.count} €</h1>
                </div>
            })}
            <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>---------------------</h1>
            <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>Total HT</h1>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>{amount+" €"}</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>Farfadet's Tax (69%)</h1>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>{(amount*0.69).toFixed(2)} €</h1>
            </div>
            <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>---------------------</h1>
            <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>Total</h1>
              <h1 style={{fontSize: '2.5rem',fontFamily: 'Receipt'}}>{taxprice} €</h1>
            </div>
            </div>
            </div>
              <div className="col" style={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center'}}>
              
              <h1 style={{fontSize: '2rem',}}>Your balance now: {balance} €</h1>
              <h1 style={{fontSize: '2rem',}}>----------------------</h1>
              <h1 style={{fontSize: '2rem',marginBottom:'25px'}}>Your balance after: {(balance - taxprice).toFixed(2)} €</h1>
                    <button className="btn btn-success btn-lg" onClick={() => handlePaie(taxprice)}>Pay with MagicMoula</button>
              
              </div>
            </div>
            </>)
        } else {
            return <LoginComp />
        }
    }


  return (
    <>
    <Header />
      {handlelogin()}
    <Footer />
    </>
  );
};

export default Paiement;
