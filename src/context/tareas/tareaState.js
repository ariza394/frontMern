import React,{useReducer} from 'react';
import TareaContext from './tareaContext';
import Tareareducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null
    }

    //crea dispatch
    const [state, dispatch] = useReducer(Tareareducer,initialState);

    //crea funciones

    //obtener tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {            
            const resultado = await clienteAxios.get('./api/tareas',{params:{proyecto}});
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
            
        }
    }

    //agregar una tarea
    const agregarTarea = async tarea => {
        try {
           const resultado = await clienteAxios.post('./api/tareas',tarea);
            dispatch({
                type:AGREGAR_TAREA,
                payload:resultado.data.tarea
            })
        } catch (error) {
            
        }
    }

    //validar tarea y muestra error
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //elimina tarea
    const eliminarTarea = async (id,proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }
    //extrae tarea actual
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }
    //edita tarea
    const actualizarTarea = async tarea => {    
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }
    //elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                tareaseleccionada:state.tareaseleccionada,
                eliminarTarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;