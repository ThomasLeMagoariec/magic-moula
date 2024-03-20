import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        
        fetch('http://localhost:5000/create_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, name: name, last_name: lastname })
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem('connected', "true")
                navigate('/dashboard')
            } else {
                localStorage.setItem('connected', "false")
            }
        }
        )
    };

    return (
        <>
        <Header />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '72vh', backgroundColor: "#F7EDE2"}}>
        <div style={{border: 'solid 3px #283044',width: '450px', padding: "20px", display: 'flex',flexDirection:'column', alignItems: 'center'}} className='rounded-4 bg-light'>
            <h1>Register</h1>
            <div className='d-grid gap-2 col-12 mx-auto'>
            <div className="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
            
            <input id='email' type="text" placeholder="Email" onChange={(ev) => setName(ev.target.value)} className="form-control" />
            <label htmlFor="email" className="form-label">Name</label>
            </div>
            <div className="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
            <input id='password' type="text" placeholder="Mot de passe" onChange={(ev) => setLastname(ev.target.value)} className="form-control" />
            <label htmlFor="password" className="form-label">Last Name</label>
            </div>
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
            <button className='mt-3 btn btn-primary rounded-4 btn-lg' onClick={() => handleSubmit()}>Register</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
            <h1 color='#283044'>or</h1>
            <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
            </div>
            <div className='d-grid gap-2 col-9 mx-auto'>
            <button className='btn btn-primary rounded-4 btn-lg' onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
        </div>
        <Footer />  
        </>
    );
};

export default Register;
