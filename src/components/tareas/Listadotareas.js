import React,{useContext} from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;
    
    //extrae tareas del state inicial
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //si no hay proyecto
    if(!proyecto) return <h2>Select a Project</h2>

    //array destructuring para el arreglo
    const [proyectoActual] = proyecto; 
    
    
    return ( 
        <>
            <h2>Project: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                
                    ? (<li className="tarea"><p>You Dont Have Task</p></li>)

                    : 
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >Delete Project &times;</button>
        </>
     );
}
 
export default ListadoTareas;