import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //extraer valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //usuario o pass incorrecto
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history]);

    // state para iniciar sesion
    const [usuario,guardarUsuario] = useState({
        email:'',
        password:''
    });

    //extraer de usuario
    const {email, password} = usuario;

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando inicia
    const onSubmit = e =>{
        e.preventDefault();
        
        //validar campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Please write your name and password','alerta-error');
        }else{
            //pasarlo al action
            iniciarSesion({email,password});    
        }        
    };



    return ( 
        <div className="form-usuario">            
            <div className="contenedor-form sombra-dark">
                <h1>LogIn</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="your Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Log In"/>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Create Account
                </Link>
            </div>
        </div>
     );
}
 
export default Login;