import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as actionCreators from '../redux-stuff/reducers';
import Login from './Login';
import ReactDataGrid,{CheckboxEditor}  from 'react-data-grid';
import {Formatters } from 'react-data-grid-addons';
import update from 'react-addons-update';
import Confirmacion from './confirmacion';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import NewTab from './newtabs';

require ('../style/counter.css');

const Columns=[

   {
    key:'name',
    name:'Name',
    width:200,
    resizable:true,

  },
   {
    key:'body',
    name:'Descripción',
    width:200,
    resizable:true,

  }
]

export default class tablaProyects extends React.Component {


constructor(props){
    super(props);
    this.state={
      rows:this.props.datosTab,
      confirm: false,
      borrar: false,
      nueva:false
    }
    this.getRowAt= this.getRowAt.bind(this),
    this.getSize = this.getSize.bind(this);


    this.selected = this.selected.bind(this);
    this.delete = this.delete.bind(this);

  }

  selected(rows) {

      this.setState({selectedIndexes: rows});
  }

  delete(){
    let rows = this.state.rows;


    _.map(this.state.selectedIndexes, (val)=>{

        axios.delete('/projects/' +  this.props.proyectid + '/tasks/' + val.id, {
            headers: {'X-Angie-AuthApiToken': this.props.token }
            }).then((response)=>{
              this.props.getTasks();
              if(response.status === 401)
              {
                this.props.cerrarSesion();
              }
             }).catch(
              (error)=>{console.log('No se ha podido eliminar')}
            );

      });

       this.setState({borrar: false, selectedIndexes:[]});


  }



  componentWillReceiveProps(nextprops){

      this.setState({rows:nextprops.datosTab});

  }


  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  }

  getSize() {
    return this.state.rows.length;
  }





  render() {

    return (
      <div>
       <div className="infoBar">
                <div className="cabecerainfoBar">
                    Listado de tareas del proyecto {this.props.nameproyectSelect}
                </div>

             <button style={{position:'absolute', background:'transparent', border:'none', zIndex:3000, right:10}} aria-label="Dismiss alert"  data-close>
                <span aria-hidden="true" onClick={()=>{this.props.proyects(''); this.props.getproyect()}}>
                  <i className="fa fa-times-circle" aria-hidden="true" style={{color:'#fff'}}/>
                </span>
         </button>
         </div>
      <div>
        {
          (this.state.borrar) ?
          <ModalContainer zIndex={5000} >
            <ModalDialog width='50%' style={{ overflow:'auto', marginTop:0, height:'30%'}} >
             <Confirmacion confir= {()=>this.delete()} cancel={()=>this.setState({borrar:false})} titulo={'Va a borrar las tareas seleccionadas, ¿Esta seguro?'}/>
              </ModalDialog>
           </ModalContainer>
             :null
        }
      </div>

       <div>
        {
          (this.state.nueva) ?
          <ModalContainer zIndex={5000} >
            <ModalDialog width='50%' style={{ overflow:'auto', marginTop:0, height:'30%'}} >
             <NewTab errorguardado = {()=>this.props.cerrarSesion()} token={this.props.token} proyectid={this.props.proyectid} cerrar={()=>this.setState({nueva:false})} getTasks= {this.props.getTasks}/>
              </ModalDialog>
           </ModalContainer>
             :null
        }
      </div>
      <div>
        <div style={{height:'70px', marginTop:30}}>

          <button className='Button' onClick={()=>this.setState({nueva:true})}>
              <span className="tooltipV">
                  <i className="fa fa-plus" aria-hidden="true" style={{color:"#000", zIndex:3000}}></i>
                  <span className="tooltiptextB">Nueva tarea</span>
                </span>
          </button>
          {(!_.isEmpty(this.state.selectedIndexes))?
          <button className='Button' onClick={()=>this.setState({borrar: true})}>
            <span className="tooltipV">
              <i className="fa fa-trash" aria-hidden="true"></i>
            <span className="tooltiptextB">Borrar tarea</span>
                </span>
          </button>
          : null}


        </div>
        <div>
            <ReactDataGrid
              className='gridTarea'
              ref="grid"
              enableCellSelect={true}
              columns={Columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              enableRowSelect={true}
              onRowSelect={this.selected}
              rowHeight={50}
              minHeight={270}
              width={'99%'}
              rowScrollTimeout={200} />
        </div>

      </div>
      <div style={{fontSize:12}}>
        Para activar el botón borrrar debe seleccionar al menos una tarea
      </div>
     <button  style={{bottom:15, position:'absolute', right:15, fontSize:30}} onClick={()=>this.props.cerrarsesion()}>
       <span className="tooltipV">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          <span className="tooltiptextTop">Cerrar sesión</span>
                </span>
      </button>
    </div>
  );


  }

}

