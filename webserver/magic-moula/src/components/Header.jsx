
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div style={{height: '180px', width: '100%',display: 'flex',flexDirection:'row',alignItems: 'center',justifyContent: 'center', backgroundColor: '#283044'}}>
      <img onClick={() => navigate('/')} src={logo} alt="logo" style={{height: '170px', width: '170px'}} />
    </div>
  );
};

export default Header;
