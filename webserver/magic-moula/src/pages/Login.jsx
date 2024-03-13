
import Footer from '../components/Footer';
import Header from '../components/Header';

const Login = () => {
  return (
    <>
    <Header />
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', backgroundColor: "#F7EDE2"}}>
      <div style={{border: 'solid 3px #283044',width: '400px', padding: "20px", display: 'flex',flexDirection:'column', alignItems: 'center'}} className='rounded-4 bg-light'>
        <h1>Login</h1>
        <div className='d-grid gap-2 col-12 mx-auto'>
        <div class="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
        
          <input id='email' type="text" placeholder="Email" className="form-control" />
          <label for="email" class="form-label">Email</label>
        </div>
        <div class="border border-2 rounded-3 form-floating input-group-lg mt-2 mb-2">
          <input id='password' type="password" placeholder="Mot de passe" className="form-control" />
          <label for="password" class="form-label">Mot de passe</label>
        </div>
        </div>
        <div className='d-grid gap-2 col-9 mx-auto'>
        <button className='mt-3 btn btn-primary rounded-4 btn-lg'>Login</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
          <h1 color='#283044'>ou</h1>
          <div className='rounded-4' style={{height: '5px', width: '35%', backgroundColor: '#283044'}}></div>
        </div>
        <div className='d-grid gap-2 col-9 mx-auto'>
        <button className='btn btn-primary rounded-4 btn-lg'>Register</button>
        </div>
      </div>
    </div>
    <Footer />  
    </>
  );
};

export default Login;
