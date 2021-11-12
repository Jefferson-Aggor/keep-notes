import React,{useState,useRef} from 'react';
import {SignIn} from '../signIn/SignIn';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {app} from '../../../config/config'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import './signup.css';


export const SignUp = () => {
    const [state, setState] = useState('sign-up');
    const [ui, setUi] = useState({
        loading: false,
        error: null
    })
    // const [data, setData] = useState({})
    const inputName = useRef(null);
    const inputEmail= useRef(null);
    const inputPassword= useRef(null);
 
    const auth = getAuth(app);

    const formSubmit= (e)=>{
        e.preventDefault()
      
        //  let  name = inputName.current.value;
          let email = inputEmail.current.value;
           let password = inputPassword.current.value

           setUi({loading: true,error: null})
           createUserWithEmailAndPassword(auth,email,password)
           .then(cred => {
              cred ? setState('sign-in') : setState('sign-up') ;
              setUi({loading: false,error: null})
           })
           .catch(err => {
               console.log(err)
               setUi({loading: false,error: 'Failed to create an account'})
           })
       
      
    }



    const showLogin = ()=>{
       setState('sign-in')
    }

    return (
        <div className='container '>
            {state === 'sign-up'? 
            
        (
            <div className="signup">    
            <div className="signup-text">
                <h3>Sign Up</h3>
            </div>
           <div className="signup-content">
               <form action="" onSubmit={formSubmit}>
                    <div className="input">
                    <label htmlFor="name" >Full Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder='eg John Doe'
                    ref={inputName}
                    required />
                    </div>
                    <div className="input">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    name="email" 
                    id="email" 
                    placeholder='eg john@gmail.com'
                    ref={inputEmail} 
                    required/>
                    </div>
                    <div className="input">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='More than 6 chars'
                    ref={inputPassword}
                    required
                    />
                    </div>
                    <div className="">
                        <button type="submit" className='btn signup-btn'>
                            {
                            ui.loading? (
                                <Loader type="ThreeDots" color="#00BFFF" height={30} width={50}/>
                            )
                                : 'Sign Up'
                            
                        }
                        </button>
                    </div>
               </form>

            <div className="cta">
                <p className="cta-text">Already have an account? <span onClick={showLogin}>Sign in</span> </p>
            </div>

           </div>
            </div>
        ): <SignIn/> 
        }
            
           
        </div>
    )
}
