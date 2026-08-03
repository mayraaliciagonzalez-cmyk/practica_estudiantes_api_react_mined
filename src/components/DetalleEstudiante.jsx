import { useEffect, useState } from "react";
import { getStudentById } from "../api/estudiantes";
import { useParams, Link } from "react-router";

export default function DetalleEstudiante() {
    // creando el estado donde se va guardar la informacion del estudiante
    const [estudiante, setEstudiante] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // capturando el id del estudiante que viene del parametro de la ruta
    const { estudianteId } = useParams();

    // metodo para obtener al estudiante
    const obtenerDetalleEstudiante = async () => {
        setCargando(true);
        setError(null);
        try {
            // el estudianteId viene del useParams
            const respuesta = await getStudentById(estudianteId);
            // actualizando el estado con la informacion del estudiante encontrado
            setEstudiante(respuesta);
        } catch (err) {
            setError("No se pudo cargar la información del estudiante");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerDetalleEstudiante();
    }, [estudianteId]);

    // iniciales para el avatar, con validación por si el nombre aún no cargó
    const iniciales = estudiante?.nombre
        ? estudiante.nombre
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((palabra) => palabra[0].toUpperCase())
              .join("")
        : "?";

    return (
        <section className="pagina">
            <section className="contenido contenido--angosto">
                <p className="migaja">
                    <Link to="/">Alumnos</Link> › <strong>Detalle del estudiante</strong>
                </p>

                {cargando && (
                    <div className="tarjeta-detalle">
                        <p className="ayuda">Cargando información del estudiante...</p>
                    </div>
                )}

                {!cargando && error && (
                    <div className="tarjeta-detalle">
                        <p style={{ color: "var(--color-error)" }}>{error}</p>
                    </div>
                )}

                {!cargando && !error && estudiante && (
                    <div className="tarjeta-detalle">
                        <div className="detalle-cabecera">
                            <div className="detalle-avatar" aria-hidden="true">{iniciales}</div>
                            <div>
                                <h1 className="detalle-nombre">{estudiante.nombre}</h1>
                                <span className="detalle-id">ID #{estudiante.id}</span>
                            </div>
                        </div>

                        <hr className="separador" />

                        <dl className="detalle-lista">
                            <div className="detalle-fila">
                                <dt className="detalle-etiqueta">
                                    <span aria-hidden="true">🎂</span> Edad
                                </dt>
                                <dd className="detalle-valor">{estudiante.edad} años</dd>
                            </div>
                            <div className="detalle-fila">
                                <dt className="detalle-etiqueta">
                                    <span aria-hidden="true">📧</span> Correo electrónico
                                </dt>
                                <dd className="detalle-valor">{estudiante.correo}</dd>
                            </div>
                        </dl>

                        <div className="acciones">
                            <Link to={`/estudiantes/email/${estudiante.id}`} className="boton boton--primario">
                                Actualizar correo
                            </Link>
                            <Link to="/" className="boton boton--secundario">
                                Volver al listado
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </section>
    );
}
