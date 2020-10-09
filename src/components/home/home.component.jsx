import React from 'react';
import axios from 'axios';

import Table from '../table/table.component';
import Button from '../button/button.component';

import './home.styles.css';



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '' ,
            id:''          
        }
    }   
    

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    clearState = () => {
        this.setState({name: '', email: '', phone: '', id: Math.random().toString()});
    }

    handleSubmit =  async event => {
        event.preventDefault(); 
        const { name, email, phone } = this.state;
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials':true
            }
        };
         await axios.post('/records', {name , email, phone}, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.clearState();                
             })                           
      
    }



    render(){
        return(
            <div>
                <div className='form-container'>
                    <form className='form' onSubmit={this.handleSubmit}>
                        
                        <input type='text' name='name' placeholder='Name' autoComplete='off' onChange={this.handleChange} value={this.state.name} />
                        <input type='text' name='email' placeholder='Email Address' autoComplete='off' onChange={this.handleChange} value={this.state.email} />
                        <input type='text' name='phone' placeholder='Mobile Number' autoComplete='off' onChange={this.handleChange} value={this.state.phone} />
                                                
                        <Button className='submit-button' type='submit' name='Submit' color='white'/>
                    </form>
                </div>
                <Table 
                    key={this.state.id}
                    refresh={this.clearState}
                />

            </div>
        )
    }    
}

export default Home;