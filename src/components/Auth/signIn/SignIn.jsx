import React,{useState,useRef} from 'react';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import {app} from '../../../config/config'
import {SignUp} from '../signup/SignUp';
import {Dashboard} from '../../Dashboard/Dashboard'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './signin.css';
const auth = getAuth(app)

export const SignIn = () => {
    const [state, setState] = useState('sign-in');
    const [ui, setUi] = useState({
        loading: false,
        error: null
    })
    const [user,setUser] = useState(null)

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    const showSignUp = ()=>{
       setState('sign-up')
    }

    const signIn = ()=>{
        const email = inputEmail.current.value;
        const password = inputPassword.current.value;
        setUi({loading: true, error: null})
        signInWithEmailAndPassword(auth, email,password)
        .then((cred)=>{
            setUser(cred.user)
            setUi({loading: false, error: null})
        })
        .catch(err => {
            setUser(null)
            setUi({loading: false, error: err.message})
        })
    }

    const submitForm = (e)=>{
        e.preventDefault();
        signIn()
    }
    

    const renderer = ()=>{
        if(user){
            return <Dashboard user={user}/>
        }else {
            return  <div className='container '>
            {state === 'sign-in'? (
                 <div className="signin">
                 <div className="signup-logo">
                     <h1>KNotes</h1>
                 </div>
                <div className="signin-content">
     
                    <form action="" onSubmit={submitForm}>
                         
                         <div className="input">
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" id="email" ref={inputEmail} placeholder='eg john@gmail.com' required/>
                         </div>
                         <div className="input">
                         <label htmlFor="password">Password</label>
                         <input type="password" name="password" id="password" ref={inputPassword} placeholder='More than 6 chars'/>
                         </div>
                         <div className="">
                             <button type="submit" className='btn signup-btn'>
                                 {ui.loading? (
                                     <Loader type='ThreeDots' color="#00BFFF" height={30} width={50}/>
                                     
                                 )
                                 : 'Login'
                             }
                             </button>
                         </div>
                    </form>
     
                 <div className="cta">
                     <p className="cta-text">Don't have an account? <span onClick={showSignUp}>Sign up</span> </p>
                 </div>
     
                </div>
                 </div>
            ): <SignUp/> }
            
         </div>
        }
    }

    
    return (
       renderer()
    )
}
