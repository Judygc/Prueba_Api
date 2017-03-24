import { createAction, handleActions } from 'redux-actions';


const update = require('react-addons-update');

export const login = createAction('LOGIN', payload => payload);
export const dataProyectCreate = createAction('PROYECTS', payload => payload);
export const proyects = createAction('SELECTPROYECT', payload => payload);
export const dataTabsCreate = createAction('TABS', payload => payload);
export const proyectname = createAction('NAMEPROYECT', payload=>payload);

const initialState = {
   token: '',
   dataProyect:[],
   proyectSelect:[],
   dataTabs:[],
   nameproyectSelect:'',
}


export default handleActions({
  [`${login}`]: (state, action) => (
    update(state, { token: { $set: action.payload } })
  ),
    [`${dataProyectCreate}`]: (state, action) => (
    update(state, { dataProyect: { $set: action.payload } })
  ),
    [`${proyects}`]: (state, action) => (
    update(state, { proyectSelect: { $set: action.payload } })
  ),
    [`${dataTabsCreate}`]: (state, action) => (
    update(state, { dataTabs: { $set: action.payload }, dataProyect:{$set:[]} })
  ),
    [`${proyectname}`]: (state, action) => (
    update(state, { nameproyectSelect: { $set: action.payload }})
  )
}, initialState)
