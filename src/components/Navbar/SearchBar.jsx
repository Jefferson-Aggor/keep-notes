import React,{useRef} from 'react';
import {HiMenuAlt2} from 'react-icons/hi'
import {BiGridAlt} from 'react-icons/bi'
import './navbar.css'

export const SearchBar = (props) => {
    const searchRef =  useRef(null);
    return (
        <div className='searchbar'>
            <HiMenuAlt2 size='2rem'/>
            <input type="search" name="" id="" placeholder='Search your notes' onChange={()=> props.search(searchRef.current.value)} ref={searchRef} />
            <BiGridAlt size='2rem'/>
            <div className="user-icon">
                <p>A</p>
            </div>
        </div>
    )
}
