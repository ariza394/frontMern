import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //extraer context proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener context tareas
    const tareasContext = useContext(tareaContext);
    const {errortarea, tareaseleccionada,agregarTarea,validarTarea,obtenerTareas,
            actualizarTarea,limpiarTarea} = tareasContext;

    //effect para cuando algo cambie en el state de tareaseleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada]);

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre:''
    })

    //restructuring tarea
    const {nombre} = tarea;

    //si no hay proyecto
    if(!proyecto) return null;

    //array destructuring para el arreglo
    const [proyectoActual] = proyecto;

    //leer valores del formulario
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        
        //validar
        if(nombre.trim() ===''){
            validarTarea();
            return;
        }

        // si es edicion o nueva tarea
        if(tareaseleccionada === null){
            //agregar tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //actualiza tarea
            actualizarTarea(tarea);

            //elimina tarea seleccionada
            limpiarTarea();
        }
        

        //obtener la nueva tarea
        obtenerTareas(proyectoActual.id);

        //reinicia form
        guardarTarea({
            nombre:''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Invalid Name</p>: null}
        </div>        
     );
}
 
export default FormTarea;