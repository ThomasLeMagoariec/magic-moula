import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();

  return (

    <>
      <Header />
      <div style={{position: 'absolute', left: 0, bottom:0}}>
      <img src="../../dist/assets/farfadet.png" style={{scale: "0.3", position: "sticky", bottom: 0, left: 0, zIndex: 10, transform: "translate(-100%, 100%)", cursor: "pointer"}} onClick={() => alert("Je suis un farfadet malicieux, rempli d'espièglerie!!")} />
      </div>
      <div style={{display: 'flex', height: '100vh', background: "linear-gradient(to right, #00dbde, #fc00ff)"}}>
        <h2 style={{margin: "100px"}}>Bienvenue chez Magic Moula, votre banque enchantée!</h2>
        <div className="btndiv" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "100%"}}>
          <button onClick={() => navigate('/login')} className='btn btn-primary btn-lg' style={{marginBottom: '250px', fontSize: '3rem', padding: '30px', paddingRight: "100px", paddingLeft: "100px"}}>Login</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;