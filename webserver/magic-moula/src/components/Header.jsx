
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import { useEffect,useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const disconnect = () => {
    localStorage.removeItem("token");
    localStorage.setItem("connected", "false");
    navigate("/")
  }
  useEffect(() => {
    setConnected(localStorage.getItem("connected") === "true")
  }, []) 
  return (
    <>
    <div style={{height: '180px', width: '100%',display: 'flex',flexDirection:'row',alignItems: 'center',justifyContent: 'center', backgroundColor: '#283044'}}>
      <img onClick={() => navigate('/')} src={logo} alt="logo" style={{height: '170px', width: '170px', cursor: 'pointer'}} />
    </div>
    {connected ? <button className="btn btn-danger dc" onClick={disconnect} style={{position: 'absolute', right: "20px", top: '66px'}}>Disconnect</button>: null}
    </>
  );
};

export default Header;
