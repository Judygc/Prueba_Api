import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as actionCreators from '../redux-stuff/reducers';
import Login from './Login';
import ReactDataGrid from 'react-data-grid';
import update from 'react-addons-update';
import FontAwesome from 'react-fontawesome';

// Formulario para mostrar los proyectos en el grid y seleccionar para ver sus tareas

require ('../style/counter.css');

const Columns=[
  {
    key:'id',
    name:'ID',
    width:80,
    resizable:false
  },
   {
    key:'name',
    name:'Name',
    width:200,
    resizable:true,
  }


]


export default class tablaProyects extends React.Component {


  constructor(props){
    super(props);
    this.state={
      rows:this.props.data,
      save:false,

    }
    this.getRowAt= this.getRowAt.bind(this),
    this.getSize = this.getSize.bind(this);
    this.onRowSelect=this.onRowSelect.bind(this);
  }

 componentWillReceiveProps(nextprops){

      this.setState({rows:nextprops.data});

  }

  onRowSelect(rows) {
      if(!_.isEmpty(rows))
      {
        this.props.proyects(_.toString(rows[0].id));
        this.props.proyectname(rows[0].name);
      }
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
                Listado de proyectos
            </div>
        </div>
        <div style={{marginTop:'10%' }}>
            <ReactDataGrid
               className='gridProyecto'
              ref="grid"
              enableCellSelect={true}
              columns={Columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              enableRowSelect={true}
              onRowSelect={this.onRowSelect}
              rowHeight={50}
              minHeight={270}
              width={'99%'}
              rowScrollTimeout={200} />
        </div>
        <div style={{fontSize:12}}>
            Para ver las tareas de un proyecto seleccionar el proyecto deseado
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

