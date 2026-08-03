import {useForm} from "react-hook-form"; 
import { saveStudent } from "../api/estudiantes";
import Swal from "sweetalert2"

export default function RegistroEstudiante() {
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: {errors}, 
        reset
    } = useForm();


        //funcion para registrar los datos del estudiante

const registrarEstudiante= async (estudiante)=>{
   // console.log("Estudiante registrado", estudiante);
    
   const respuesta =await saveStudent(estudiante);
    console.log(respuesta);
    Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        // limpiamos el formulario
        reset()
}
    return (
        <section className="pagina">
            <section className="contenido contenido--angosto">        
                <h1 className="titulo">Registrar Nuevo Estudiante</h1>
                <p className="subtitulo">Completa la información para dar de alta al estudiante.</p>
        
                <form className="tarjeta-formulario" onSubmit={handleSubmit(registrarEstudiante)}>
                    <div className="seccion">
                        <span className="seccion__icono" aria-hidden="true">🧑‍🎓</span>
                        <h2 className="seccion__titulo">Datos del Estudiante</h2>
                    </div>
                    <hr className="separador" />
        
                    <div className="campo">
                        <label htmlFor="nombre" className="etiqueta">Nombre Completo <span className="requerido">*</span></label>
                        
               <input id="nombre" type="text" className="entrada" placeholder="Ej. Juan Pérez" 
               {...register("nombre", {required: true})} />
                {errors.nombre && <span className="error">El nombre es obligatorio</span>}

            <span className="ayuda">Ingresa el nombre tal como figura en el documento oficial. </span>
                    </div>
        
                    <div className="fila">
                        <div className="campo">
                            <label htmlFor="edad" className="etiqueta">Edad <span className="requerido">*</span></label>
                            <input id="edad" type="number" className="entrada" placeholder="00" {...register("edad", { required: true, min: 0 })} />
                            {errors.edad && <span className="error">La edad es obligatoria y debe ser un número positivo</span>}
                        </div>
            
                        <div className="campo">
                            <label htmlFor="correo" className="etiqueta">
                                Correo Electrónico <span className="requerido">*</span>
                            </label>
                            <input id="correo" type="email" className="entrada" placeholder="estudiante@ejemplo.com" {...register("correo", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                            {errors.correo && <span className="error">El correo electrónico es obligatorio y debe ser válido</span>}
                        </div>
                    </div>
            
                    <hr className="separador" />
        
                    <div className="acciones">
                        <button type="submit" className="boton boton--primario">
                            <span aria-hidden="true">💾</span> Guardar Estudiante
                        </button>
                        <button type="button" className="boton boton--secundario">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
    )
}
