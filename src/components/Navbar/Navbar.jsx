import React,{useState} from 'react';
import {getAuth,signOut} from 'firebase/auth'
import {Link,Route,Redirect} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {BsCheck2Square, BsPlusLg} from 'react-icons/bs'
import './navbar.css';

export const Navbar = ({user}) => {
    const [active,setActive] = useState(true)
    const auth = getAuth();
    const logOut = async ()=>{
       await signOut(auth);
       setActive(false)
    }

    return (
        <div className='navbar'>
            <div className="navbar-options">
                {!active ? <Route>
                        <Redirect to={
                            {
                                pathname:'/',
                                state: {
                                    data: 'Logged Out'
                                }
                            }
                        }/>
                    </Route>: null}
                <FiLogOut size='2rem' onClick={logOut}/>
                <BsCheck2Square size='2rem'/>
            </div>
            <div className="navbar-add">
            <Link to={{
                pathname:'/add',
                state: {
                    user
                }
            }} className='links'><BsPlusLg size='2rem'/></Link>    
            </div>
        </div>
    )
}
