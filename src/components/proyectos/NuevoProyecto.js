import React,{useState,useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el state
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //state de nuevo proyecto
    const [proyecto,guardarProyecto] = useState({
        nombre:''
    });

    const {nombre} = proyecto;

    //lee el nombre del proyecto
    const onChangeproyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    
    //submit del proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();
        
        //validar proyecto
        if(nombre===''){
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar form
        guardarProyecto({
            nombre:''
        })
    };

    return ( 
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={mostrarFormulario}           
            >New project</button>

            {formulario ?
                <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Project Name"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeproyecto}
                    />
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Add Project"
                    />
                </form>

            : null}

            {errorformulario ? <p className="mensaje error">Invalid Name</p> : null}
        </>
     );
}
 
export default NuevoProyecto;