import React,{useState,useRef} from 'react';
import { useLocation, Route, Redirect } from 'react-router'; 
import {v4 as uuid} from 'uuid'
import {db} from '../../config/config';
import {setDoc,doc} from 'firebase/firestore'
import Loader from 'react-loader-spinner'
import './addNote.css'

export const AddNote = () => {
    const [uiState, setUiState] = useState({
        loading: false,
        error: null,
        new: false
    })

    const {state} = useLocation();
    

    const noteBody = useRef(null);
    const noteTitle = useRef(null);

    // const collectionRef = collection(db, 'notes');
    const submitForm = async (e)=>{
        
        e.preventDefault();
        try {
            setUiState({loading: true,error:null, new: false})
            await setDoc(doc(db,'notes',`${uuid()}`), {
                title: noteTitle.current.value,
                body: noteBody.current.value,
                owner: state.user
            })
            setUiState({loading: false, error: null, new:true})
        } catch (error) {
            setUiState({loading: false,error: 'Failed to add note', new: false})
        }

     
    }

    return (
        <div className='container'>
            {uiState.new ? <Route>
                 <Redirect to={{
                     pathname:'/dashboard',
                     state: {
                         data:{ user: state.user }
                     }
                 }}/>
            </Route>: null}
            <div className="addNote">   
                <form action="" onSubmit= {submitForm}>
                    <textarea className='title' name="title" id="" cols="30" rows="2" placeholder='Title' ref={noteTitle}></textarea>
                    <textarea className='body' name="body" id="" cols="30" placeholder ='type notes here' ref={noteBody} ></textarea>

                    <button type="submit" className='btn'>
                        {uiState.loading ? <Loader type='ThreeDots' color="#00BFFF" height={30} width={40}/>
                        : 'Add'
                    }
                    </button>
        
                </form>
            </div>
        </div>
    )
}
