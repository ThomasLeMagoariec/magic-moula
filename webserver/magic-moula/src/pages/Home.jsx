import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();

  return (
    <>
    <Header />
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: "#F7EDE2"}}>
      <button onClick={() => navigate('/login')} className='btn btn-primary'>Login</button>
    </div>
    <Footer />
    </>
  );
};

export default Home;