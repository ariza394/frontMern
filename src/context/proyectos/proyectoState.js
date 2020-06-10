import React,{useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import uuid from 'uuid';
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';


const ProyectoState = props =>{

    const proyectos = [
        {id:1, nombre:'Tienda Virtual'},
        {id:2, nombre:'Intranet'},
        {id:3, nombre:'Diseño sitio web'},
        {id:4, nombre:'MERN'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario:false,
        proyecto:null
    }

    //dispatch para las acciones
    const [state,dispatch] = useReducer(proyectoReducer, initialState);

    //serie de funciones
    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //obtener proyectos
    const obtenerProyectos = () => {
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos
        })
    }

    //agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuid.v4();

        //inserta en el state
        dispatch({
            type:AGREGAR_PROYECTOS,
            payload:proyecto
        })
    }

    //valida el formulario
    const mostrarError = () =>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    //cambia a proyecto actual
    const proyectoActual = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    //elimina proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload:proyectoId
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos:state.proyectos,
                formulario: state.formulario,
                errorformulario:state.errorformulario,
                proyecto:state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;