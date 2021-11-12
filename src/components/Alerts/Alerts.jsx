import React from 'react';
import './alerts.css';

export const Alerts = ({msg,type})=>{
    return(
        <div className={`alert ${type === 'success'? 'success' : 'error'}`}>
            {msg}
        </div>
    )
}