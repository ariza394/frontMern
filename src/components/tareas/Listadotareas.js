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
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    //array destructuring para el arreglo
    const [proyectoActual] = proyecto; 
    
    
    return ( 
        <>
            <h2>proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                
                    ? (<li className="tarea"><p>No Hay Tareas</p></li>)

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
            >Eliminar Proyecto &times;</button>
        </>
     );
}
 
export default ListadoTareas;