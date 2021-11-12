import React,{useRef, useState} from 'react';
import {setDoc,doc} from 'firebase/firestore'
import {db} from '../../config/config'

import {useLocation,Route,Redirect} from 'react-router-dom';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './update.css';

export const Update = (props) => {
    const [updateState, setUpdateState] = useState(false)
    const [uiState, setUiState] = useState({
        loading: false,
        error: null
    })

   const {state} = useLocation()
   const {title,body,id,owner} = state.data;

   const titleRef = useRef(null)
   const bodyRef = useRef(null)

    const updateForm = async (e)=>{
        e.preventDefault()
        try {
            setUiState({loading:true,error: null})
            await setDoc(doc(db,'notes', id),{
                title: titleRef.current.value,
                body: bodyRef.current.value,
                owner 
            })

            setUpdateState(true)
            setUiState({loading: false,error: null})
            
        } catch (error) {
            console.log(error);
            setUiState({loading:false, error: 'Failed to update note'})
        }

    }

    return (
        <div className='container'>
        <div className="addNote">
            {updateState? <Route exact path='/update/:id'>
                <Redirect exact to = {
                    {
                        pathname:'/dashboard',
                        state: {
                            data:{
                                user: owner
                            }
                        }
                    }
                }/>
            </Route>:null}   
            <form action="" onSubmit={updateForm} >
                <textarea className='title' name="title" id="" cols="30" rows="2" placeholder='Title' defaultValue={title} ref={titleRef}></textarea>
                <textarea className='body' name="body" id="" cols="30" placeholder ='type notes here'  defaultValue={body} ref={bodyRef}></textarea>
                <button type="submit" className='btn'>
                    {uiState.loading?<Loader type='ThreeDots' color="#00BFFF" height={30} width={40}/>: 'Save'}
                </button>
                

            </form>
        </div>
    </div>
    )
}
