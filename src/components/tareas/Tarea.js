import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //extraer context proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener context tareas
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea,obtenerTareas,actualizarTarea, guardarTareaActual} = tareasContext;

    const [proyectoActual] = proyecto;

    //funcion para eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id,proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }

    //funcion cambia estado tarea
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea);
    }

    //Agrega a tarea actual
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ? 
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :   
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;