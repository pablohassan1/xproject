import React from 'react';
// import axios from 'axios';

import Home from './components/home/home.component';

import './App.css';


class App extends React.Component{
  // constructor(){
  //   super();

  //   this.state = { records: []}
  // }

  // componentDidMount(){
  //   axios.get('/records')
  //       .then(res => {            
  //           this.setState({records:res.data});
  //           console.log(this.state.records);            
  //        })
  // }

  render(){
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
