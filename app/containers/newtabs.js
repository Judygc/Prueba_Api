import React from 'react';
import _ from 'lodash';
import axios from 'axios';

//Formulario para la creación de nuevas tareas
class newTabs extends React.Component {
  constructor(props) {
    super(props);
    this.guardar = this.guardar.bind(this);
  }


  guardar(){
         axios.defaults.headers.post['X-Angie-AuthApiToken'] = this.props.token;
         axios.post('/projects/' +  this.props.proyectid + '/tasks', {
              "name": this.refs['u'].value,
              "body": this.refs['p'].value
              }).then((response) =>{

                this.props.getTasks();
                if(response.status===400)
                {
                  this.props.errorguardado();
                }
              }).catch(
                (error)=>{
                  console.log('no se puede guardar dato');
                }
  );

    this.props.cerrar();

  }

  render() {


    return(

      <div >
            <button className='Button' onClick={()=>this.guardar()}>
              <span className="tooltipV">
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  <span className="tooltiptextB" style={{top:80}}>Guardar tarea</span>
              </span>
            </button>
            <button className='Button' onClick={()=>this.props.cerrar()}>
              <span className="tooltipV">
                  <i className="fa fa-times" aria-hidden="true"></i>
                  <span className="tooltiptextB" style={{top:80}}>Salir</span>
              </span>
            </button>
            <div style={{width:'100%', margin:'auto', textAlign:'center', marginTop:10 }}>

              <input type="text" ref="u" placeholder="Nueva Tarea" required="required" onKeyDown={(e)=>(e.keyCode === 13) ? this.refs['p'].focus():null} />
              <input  type="text" ref="p" placeholder="Descripción nueva tarea" required="required" onKeyDown={(e)=>(e.keyCode === 13) ? this.guardar():null}/>


              </div>
      </div>);

  }
}

export default newTabs;
