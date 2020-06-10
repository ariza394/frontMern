import React,{useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //extraer context proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener context tareas
    const tareasContext = useContext(tareaContext);
    const {errortarea, agregarTarea,validarTarea,obtenerTareas} = tareasContext;

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

        //agregar tarea al state de tareas
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        agregarTarea(tarea);

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
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Nombre de tarea Obligatorio</p>: null}
        </div>        
     );
}
 
export default FormTarea;