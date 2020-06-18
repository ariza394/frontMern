import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //obtener proyecto context
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //obtener tareas context
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //funcion para agregar evento actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //fija el proyecto actual
        obtenerTareas(id); //obtiene tareas
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;