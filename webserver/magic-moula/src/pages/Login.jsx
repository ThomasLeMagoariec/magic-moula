import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log('email', email)
    console.log('password', password)
    fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: password, email: email})
  }).then(response => {
      if (response.status === 200) {
        localStorage.setItem('connected', "true")
        return response.json()
      } else {
        localStorage.setItem('connected', "false")
      }
    }
  ).then(data => {
    if (data) {
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    }
  })
  }
  
  

  return (
    <>
    <Header />
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', backgroundColor: "#F7EDE2"}}>
      <div style={{border: 'solid 3px #283044',width: '400px', padding: "20px", display: 'flex',flexDirection:'column', alignItems: 'center'}} className='rounded-4 bg-light'>
        <h1>Login</h1>
        <div className='d-grid gap-2 col-12 mx-auto'>
        <div className="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
        
          <input id='email' type="text" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} className="form-control" />
          <label htmlFor="email" className="form-label">Email</label>
        </div>
        <div className="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
          <input id='password' type="password" placeholder="Mot de passe" onChange={(ev) => setPassword(ev.target.value)} className="form-control" />
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        </div>
        <div className='d-grid gap-2 col-9 mx-auto'>
        <button className='mt-3 btn btn-primary rounded-4 btn-lg' onClick={() => handleSubmit()}>Login</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
          <h1 color='#283044'>or</h1>
          <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
        </div>
        <div className='d-grid gap-2 col-9 mx-auto'>
        <button className='btn btn-primary rounded-4 btn-lg' onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
    <Footer />  
    </>
  );
};

export default Login;
