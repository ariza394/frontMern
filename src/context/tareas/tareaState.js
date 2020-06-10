import React,{useReducer} from 'react';
import TareaContext from './tareaContext';
import Tareareducer from './tareaReducer';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas:[ 
            {id:0,nombre:'Elejir Plataforma', estado: true,proyectoId:1},
            {id:1,nombre:'Elejir Colores', estado: false,proyectoId:2},
            {id:2,nombre:'Elejir Plataformas de pago', estado: false,proyectoId:3},
            {id:3,nombre:'Elejir Hosting', estado: true,proyectoId:4},
            {id:4,nombre:'Elejir Plataforma', estado: true,proyectoId:1},
            {id:5,nombre:'Elejir Colores', estado: false,proyectoId:2},
            {id:6,nombre:'Elejir Plataformas de pago', estado: false,proyectoId:2},
            {id:7,nombre:'Elejir Plataforma', estado: true,proyectoId:4},
            {id:8,nombre:'Elejir Colores', estado: false,proyectoId:4},
            {id:9,nombre:'Elejir Plataformas de pago', estado: false,proyectoId:3},
            {id:10,nombre:'Elejir Plataforma', estado: true,proyectoId:1},
            {id:11,nombre:'Elejir Colores', estado: false,proyectoId:3},
            {id:12,nombre:'Elejir Plataformas de pago', estado: false,proyectoId:1}
        ],
        tareasproyecto:null,
        errortarea:false
    }

    //crea dispatch
    const [state, dispatch] = useReducer(Tareareducer,initialState);

    //crea funciones

    //obtener tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type:TAREAS_PROYECTO,
            payload:proyectoId
        })
    }

    //agregar una tarea
    const agregarTarea = tarea => {
        dispatch({
            type:AGREGAR_TAREA,
            payload:tarea
        })
    }

    //validar tarea y muestra error
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //elimina tarea
    const eliminarTarea = id => {
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareas:state.tareas,
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                eliminarTarea,
                obtenerTareas,
                agregarTarea,
                validarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;