
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
    console.log(command)
    const handlelogin = () => {
        if (localStorage.getItem('connected') === 'true') {
            return (<>
            <div className="row">
              <div className="col">
            {command.map((item) => {
                return <div key={item.name}>
                  
                    <h1>{item.name}</h1>
                </div>
            })}
            </div>
            <div className="col">
                    <button className="btn btn-success">Pay</button>
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
    <div>
      {handlelogin()}
    </div>
    <Footer />
    </>
  );
};

export default Paiement;
