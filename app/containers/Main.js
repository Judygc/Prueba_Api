import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as actionCreators from '../redux-stuff/reducers';
import Login from './Login';
import Proyects from './tablaProyects';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Tarea from './tablaTabs';

class MainComponent extends React.Component {


constructor(props){
    super(props);
    this.state={



    }
    this.getTasks= this.getTasks.bind(this);
    this.getProyect = this.getProyect.bind(this);

  }
  componentWillReceiveProps(nextprops){
    if ( nextprops.token !== '' && nextprops.token!== this.props.token){
        this.getProyect(nextprops.token);
    }
    if(nextprops.proyectSelect !== '' && nextprops.proyectSelect!== this.props.proyectSelect){

      this.getTasks(nextprops.proyectSelect);
    }
    if(nextprops.proyectSelect=== '' && nextprops.proyectSelect!== this.props.proyectSelect)
    {

    }
  }

getProyect(token)
{
  axios.get('/projects', {
        headers: {'X-Angie-AuthApiToken': token }
        }).then((response)=>{

          this.props.actions.dataProyectCreate(response.data);
          console.log(response);
           if(response.status===400)
          {
            this.props.actions.login('');
          }
        }).catch(
          (error)=>{ console.log('error de conexión')}
        );
}


getTasks(projects){
   axios.get('/projects/' +  projects + '/tasks', {
        headers: {'X-Angie-AuthApiToken': this.props.token }
        }).then((response)=>{

          this.props.actions.dataTabsCreate(response.data.tasks);
           if(response.status===400)
          {
            this.props.actions.login('');
          }
        }).catch(
          (error)=>{console.log('No hay proyectos disponibles')}
        );
}



  render() {


    return (
      <div>
      {(_.isEmpty(this.props.token))?
         <ModalContainer zIndex={5000} >
            <ModalDialog width='30%' style={{ overflow:'auto', marginTop:0, height:'40%', background: '#9DC1EC'}} >
                <Login login={this.props.actions.login}/>
            </ModalDialog>
        </ModalContainer>
        :null
      }
      {(!_.isEmpty(this.props.dataProyect)) ?
         <ModalContainer zIndex={5000} >
            <ModalDialog width='50%' style={{ overflow:'auto', marginTop:0, height:'70%'}} >
                <Proyects proyectname = {this.props.actions.proyectname}  cerrarsesion={()=>this.props.actions.login('')} data={this.props.dataProyect} proyects={this.props.actions.proyects}/>
            </ModalDialog>
        </ModalContainer>
      : null}
       {(!_.isEmpty(this.props.proyectSelect)) ?
         <ModalContainer zIndex={5000} >
            <ModalDialog width='50%' style={{ overflow:'auto', marginTop:0, height:'70%'}} >
                <Tarea  nameproyectSelect = {this.props.nameproyectSelect} cerrarsesion={()=>this.props.actions.login('')} datosTab={this.props.dataTabs} proyectid ={this.props.proyectSelect} token ={this.props.token}  getTasks ={ ()=> this.getTasks(this.props.proyectSelect)} proyects={this.props.actions.proyects} getproyect = {()=>this.getProyect(this.props.token)}/>
            </ModalDialog>
        </ModalContainer>
      : null}
      </div>
    );
  }

}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}


export default connect(
  (state) => ({
    token : state.app.token,
    dataProyect: state.app.dataProyect,
    proyectSelect:state.app.proyectSelect,
    dataTabs:state.app.dataTabs,
    nameproyectSelect:state.app.nameproyectSelect,
  }),mapDispatchToProps

)(MainComponent)
