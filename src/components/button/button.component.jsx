import React from 'react';

import './button.css';

const Button = props =>(
    
        <button 
                className={props.color}
                type={props.type}  
                onClick={props.action}              
                
                >{props.name}</button>
    
)

export default Button;