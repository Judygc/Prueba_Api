import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
require ('../style/counter.css');

export default class Login extends React.Component {

  //Formulario de inicio de sesión
constructor(props){
    super(props);
    this.state={
      mostrarerrorUser:false,
      mostrarerrorPasword:false,
      mostrarerrorLogin:false,

    }
    this.login=this.login.bind(this);
    this.errorLogin = this.errorLogin.bind(this);
}

errorLogin(){
  this.setState({mostrarerrorUser:false, mostrarerrorPasword:false, mostrarerrorLogin:true});
  this.refs['u'].value = '';
  this.refs['p'].value ='';
  this.refs['u'].focus();
}

login(){
   this.setState({mostrarerrorUser:false, mostrarerrorPasword:false, mostrarerrorLogin:false});
    if(_.isEmpty(this.refs['u'].value)){
      this.refs['u'].focus();
      this.setState({mostrarerrorUser: true});
      return;
    }
    if(_.isEmpty(this.refs['p'].value)){
      this.refs['p'].focus();
      this.setState({mostrarerrorPasword: true});
      return;
    }

    axios.post('/issue-token', {
      "username": this.refs['u'].value,
      "password": this.refs['p'].value,
      "client_name": "My Awesome App",
      "client_vendor": "ACME Inc"

    }).then((response) =>{
      this.props.login(response.data.token);
    }).catch(
      (error)=>{
        this.errorLogin();
      }
    );
}



  render() {
    return (
      <div style={{width:'100%',textAlign:'center'}}>

        <h1 className={(this.state.mostrarerrorLogin)? 'Error':""}>{(this.state.mostrarerrorLogin)? 
            <span>Login Error</span>:<span>Login</span>}
        </h1>

        <input className = {(this.state.mostrarerrorUser)? 'boderError': ''} type="text" ref="u" placeholder="Usuario" required="required" onKeyDown={(e)=>(e.keyCode === 13) ? this.refs['p'].focus():null} />
            { (this.state.mostrarerrorUser) ? <span className='ErrorUser'><i style={{  color:'#b71c1c'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i> </span>: null}

        <input className = {(this.state.mostrarerrorPasword)? 'boderError': ''} type="password" ref="p" placeholder="Contraseña" required="required" onKeyDown={(e)=>(e.keyCode === 13) ? this.login():null}/>
            { (this.state.mostrarerrorPasword) ? <span className='ErrorPass'><i style={{  color:'#b71c1c'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i> </span>: null}
        <button type="submit" className="btn btn-primary btn-block btn-large" onClick={this.login}>Entrar</button>

      </div>

    );
  }

}




