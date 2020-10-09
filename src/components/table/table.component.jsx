import React from 'react';
import axios from 'axios';

import Button from '../button/button.component';

import './table.styles.css';


class Table extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            records: []            
        }
    }

    componentDidMount(){
        axios.get('/records')
            .then(res => {            
                this.setState({records:res.data});
                console.log(this.state.records);            
             })
      }

     
    deleteItem = itemId => {
        var { records } = this.state;
        var newArray = records.filter(item => item._id !== itemId)
        console.log(newArray);
        // console.log(records);
        this.setState({records: newArray});
    }
       
    
    

    render(){
        return (
            <table 
                className='table'
                key={this.state.id}
            >
                <thead className='table-header'>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                        this.state.records.map( record => 
                        
                        (
                            <tr key={record._id}>
                                <td >{record.name}</td>
                                <td>{record.email}</td>
                                <td>{record.phone}</td>
                                <td>
                                    <div className='action'>
                                        <Button name='Read' color='white' />
                                        <Button name='Update' color='green' />
                                        <Button name='Save' color='green' />
                                        <Button type='button' action={ 
                                            () => {
                                                console.log(record._id)
                                                axios.delete('/records/' + record._id, {data: {id: record._id}})
                                                .then(res => {
                                                    console.log(res);
                                                    this.deleteItem(record._id);
                                                    })
                                                                                              
                                                }} name='Delete' color='red' />
                                    </div>
                                </td>                
                            </tr>
                        ))
                    }                    
                </tbody>
            </table>
        )
    }
}



export default Table;