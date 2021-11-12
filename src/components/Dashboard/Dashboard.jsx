import React,{useState,useEffect} from 'react';
import { collection, getDocs,query,where } from 'firebase/firestore'
import {db} from '../../config/config'
import {Link, useLocation} from 'react-router-dom'
import {Navbar} from '../Navbar/Navbar'
import {SearchBar} from '../Navbar/SearchBar'
import {Loading } from '../Loading/Loading'
import {Alerts} from '../Alerts/Alerts'
import './dashboard.css';


export const Dashboard = ({user}) => {
    
   const [notes,setNotes] = useState([]);
   const [uiState, setUiState] = useState({
       loading: false,
       error: null
   })
   const {state} = useLocation();


   let id;
   user ? id = user.uid :  id =  state.data.user

    useEffect(()=>{
       let isMounted = false
       
        setUiState({loading: true})
        const collectionRef = collection(db, 'notes')

        const getNotes = async ()=>{
            try {
                let q;
                if (user){
                    q  = query(collectionRef, where("owner", "==", user.uid));
                }else{
                    q = query(collectionRef, where("owner", "==",state.data.user));
                }
                const data = await getDocs(q)
                
                   if(!isMounted){
                    setNotes(data.docs)
                    setUiState({loading: false})
                   }
               
            } catch (error) {
                setUiState({loading:false,error:'Failed to fetch notes'})
            }   
        }

        getNotes();

       

        return ()=>{
            isMounted = true
        }
    },[user, state])

   
    
    const search = (val)=>{
        notes.map(note => {
            const {title} = note.data();
            console.log(title)
            return ''
        })
        console.log(val)
    }



    const notesRenderer = ()=>{
      return  notes.map((note) => {

            return <Link  className='link' to={{
                pathname: `/update/${note.id}` ,
                state: {
                    data: {
                        id: note.id,
                        title: note.data().title,
                        body: note.data().body,
                        owner: id
                    }
                }
            }} key={note.id}>
            <div className="note">
                <p className="note-title">{note.data().title}</p>
                <p className="note-body">
                   {note.data().body}
                </p>
            </div>
            </Link>
        })
    }

    return (
                 <div className='dashboard'>
                 <div className='dashboard-body'>   
                 <SearchBar className='search' search = {search}/>
                 {uiState.loading ? <Loading/>
                 : 
                 <div className="notes-output">
                    {notes.length !== 0 ? notesRenderer(): 'empty'}
                  </div>
                 }

                 {uiState.error ? <Alerts data={{msg: uiState.error,type: 'error'}}/>: null}
                  
                 </div>
                    {user ? <Navbar className='dashboard-nav' user={user.uid }/> : <Navbar className='dashboard-nav' user={state.data.user}/> }
                  
              </div>
         
        
    )
}
