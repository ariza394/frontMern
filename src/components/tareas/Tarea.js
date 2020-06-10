import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //extraer context proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener context tareas
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea,obtenerTareas} = tareasContext;

    const [proyectoActual] = proyecto;

    //funcion para eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id)
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
                            >Completo</button>
                        )
                    :   
                        (
                            <button
                                type="button"
                                className="incompleto"
                            >Incompleto</button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;