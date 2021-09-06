import './App.css';
import CreateAccount from './CreateAccount';

function App() {

  return (
    <div className="App">

<div className="createAccountPage">
            <div className="formSection" id="formSection">
               <div className='form-register'>
                   <h1 className='register-headTitle'>Let’s set up your account</h1>
                   <div className='register-subTitle'>
                       Already have a account? 
                       <a href="" className='sign-in'> Sign in
                       </a>
                    </div>


      <CreateAccount></CreateAccount>


      <div className='register-subTitle next'>
                   By clicking the “Next” button, you agree to creating a free account, and to  <a href="" className='sign-in'>Terms of Service
                       </a> and <a href="" className='sign-in'>Privacy Policy
                       </a> .
                    </div>

               </div>
            </div>

            <div className="details" id="details">
                <div>
                <h2 className='detail-title'>
                    Dummy Heading
                </h2>
                <p className='details-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                </div>            
            </div>
        </div>
    
    </div>
  );
}

export default App;
