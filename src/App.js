import React from 'react';
import ListItems from '../src/components/ListItems/ListItems.component';
import Button from '../src/components/button/button.component';
import axios from 'axios';

import './App.css';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],           
      currentItem:{
        name:'',
        email:'',
        phone:''               
      }
    }
    
  }
  addItem = e => {
    e.preventDefault();
    const { name,email,phone } = this.state.currentItem;
    const myId = Math.random().toString();
    const items = [...this.state.items, {name, email, phone, myId: myId}];
    this.setState({
      items: items,      
      currentItem:{
        name:'',
        email:'',
        phone:'',
        myId:''
      }
    })

    const config = {
      headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true
      }
    };

    axios.post('https://cors-anywhere.herokuapp.com/enigmatic-scrubland-87375.herokuapp.com/records', {name , email, phone, myId: myId}, config)
      .then(res => {                
        console.log(res);
        console.log(res.data);    
      })   
  }

  handleChange = event => {
    const { name, value } = event.target;    
    this.setState({          
      currentItem: {
        ...this.state.currentItem, [name]: value
      }         
    });
}

  
  deleteItem = myId => {
    const filteredItems= this.state.items.filter( item =>  item.myId!==myId);
    this.setState({
      items: filteredItems
    })
    axios.delete('https://enigmatic-scrubland-87375.herokuapp.com/records/' + myId, {data: {id: myId}})
      .then(res => console.log(res))
  }

  
    componentDidMount(){
      axios.get('https://cors-anywhere.herokuapp.com/enigmatic-scrubland-87375.herokuapp.com/records')
          .then(res => {  
              console.log(res.data)          
              this.setState({items:res.data}); 
              console.log(this.state)                          
      })
    }

    readItem = item => {  
      this.setState  ({readItem: item}); 
      console.log(this.state);       
    }
        
    closePopup = () => {
      this.setState({readItem: ''})
    }


 render(){
  return (
    <div className="App">

      <div className='container'>
        <div className='form-container'>
          <form className='form' onSubmit={this.addItem}>
                          
            <input type='text' name='name' placeholder='Name' autoComplete='off' onChange={this.handleChange} value={this.state.currentItem.name} />
            <input type='text' name='email' placeholder='Email Address' autoComplete='off' onChange={this.handleChange} value={this.state.currentItem.email} />
            <input type='text' name='phone' placeholder='Mobile Number' autoComplete='off' onChange={this.handleChange} value={this.state.currentItem.phone} />
                                                  
            <Button className='submit-button' type='submit' name='Submit' color='white'/>
          </form>
        </div>

        <div className='table-container'>
          {
              this.state.items.length > 0 ?
              (<table className='table'>
                <thead className='table-header'>
                  <tr>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Mobile Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody> 
                    <ListItems items={this.state.items} deleteItem={this.deleteItem} readItem={this.readItem}/>
                </tbody>
              </table> )
              :null
            } 

        </div>
      </div>
      

      {
        this.state.readItem ?
          (<div className='popup'>
              <div className='close-button'>
                <button onClick={this.closePopup} className='close'>x</button>
              </div>              
              <p>Name: {this.state.readItem.name}</p>
              <p>Email Address: {this.state.readItem.email}</p>
              <p>Mobile Number: {this.state.readItem.phone} </p>
          </div>) 
          : null
      }                
      
    </div>
  );
 }
}


export default App;

