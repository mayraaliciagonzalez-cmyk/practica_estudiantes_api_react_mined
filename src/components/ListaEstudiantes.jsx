import { Link } from "react-router";
import { getStudents} from "../api/estudiantes";
import { useEffect, useState } from "react";
 
export default function ListaEstudiantes() {
    // creamos un estado para la lista de estudiantes que viene de la api
    const [listaEstudiantes, setListaEstudiantes] = useState([])
 
    //metodo para obtener los datos de la api
    const obtenerDetalleEstudiantes = async () => {
 
        const respuestaData = await getStudents()
        // actualizamos el estado con la data de los estudiantes
        setListaEstudiantes(respuestaData)
        // console.log(respuestaData)
    }
 
    // utilizando useEffect para que la obtencion de los datos solo se haga una vez
    useEffect(() => {
        obtenerDetalleEstudiantes()
    }, []) //dependencia
   
    console.log(listaEstudiantes)
 
    return (
        <section className="pagina">
            <section className="contenido">
                <h1 className="titulo">Listado de Alumnos</h1>
                <p className="subtitulo">Visualiza y administra la base de datos de estudiantes matriculados.</p>
       
                <div className="tarjeta">
                    <div className="barra-superior">
                        <div className="buscador">
                            <span className="buscador__icono" aria-hidden="true">🔍</span>
                            <input type="text" placeholder="Buscar por nombre, correo o ID..." className="buscador__input" />
                        </div>
                        {/** utilizando Link de react router para redireccionar al formulario de registro */}
                        <Link to="/estudiantes/registro" className="boton boton--primario">
                            <span aria-hidden="true">+</span> Agregar Estudiante
                        </Link>
                    </div>
           
                    <table className="tabla">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Correo</th>
                            <th className="th-acciones">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                // iterando el estado del arreglo estudiantes
                                listaEstudiantes.map((estudiante, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{estudiante.nombre}</td>
                                            <td>{estudiante.edad}</td>
                                            <td className="celda-correo">{estudiante.correo}</td>
                                            <td className="td-acciones">
                                                <Link to={`/estudiantes/detalle/${estudiante.id}`} className="enlace-detalle">Ver detalle ›</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
           
                    <div className="pie-tabla">
                        <span className="pie-tabla__info">Mostrando x de 150 estudiantes</span>
                        <div className="paginacion">
                            <button className="paginacion__boton" aria-label="Página anterior">‹</button>
                            <button className="paginacion__boton" aria-label="Página siguiente">›</button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}