import React from 'react';
import _ from 'lodash';

//Formulario para la creación de alertas por pantalla
class ConfirmacionPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return(

      <div >
          <i className="fa fa-exclamation-triangle"  style={{fontSize:30, color: 'red'}} aria-hidden="true"></i>
            <div className="confirm-title">{this.props.titulo}</div>
            <div style={{width:'100%', margin:'auto', textAlign:'center' }}>



              <button   className="myButton"  onClick={()=>this.props.confir()}>
                Aceptar
              </button>


                <button   className="myButton" onClick={()=>this.props.cancel()}>
                Cancelar
                </button>




              </div>
      </div>);

  }
}

export default ConfirmacionPopup;
