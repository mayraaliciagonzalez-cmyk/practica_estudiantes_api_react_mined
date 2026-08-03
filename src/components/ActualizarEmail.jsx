import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { updateEmail, getStudentById } from "../api/estudiantes";
import Swal from "sweetalert2";

export default function ActualizarEmail() {
    // el ID del estudiante viene de la URL (/estudiantes/email/:estudianteId),
    // no como prop, porque el componente se renderiza directo desde la <Route>
    const { estudianteId } = useParams();
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [estudiante, setEstudiante] = useState(null);
    const [cargandoEstudiante, setCargandoEstudiante] = useState(true);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(false);

    // precargamos los datos del estudiante (nombre + correo actual) para mostrarlos en el formulario
    useEffect(() => {
        const cargarEstudiante = async () => {
            try {
                const data = await getStudentById(estudianteId);
                setEstudiante(data);
                setCorreo(data.correo || "");
            } catch (err) {
                setError("No se pudo cargar la información del estudiante");
            } finally {
                setCargandoEstudiante(false);
            }
        };
        cargarEstudiante();
    }, [estudianteId]);

    const validarCorreo = (valor) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setExito(false);

        if (!correo.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Digita el correo",
                footer: "El correo no puede estar vacío📬",
            });
            return;
        }

        if (!validarCorreo(correo)) {
            setError("El formato del correo no es válido");
            return;
        }

        setCargando(true);
        try {
            // usamos el estudianteId que viene de la URL, no un prop
            const estudianteActualizado = await updateEmail(estudianteId, correo);
            setExito(true);
            Swal.fire({
                icon: "success",
                title: "¡Listo!",
                text: "Correo actualizado correctamente",
                timer: 1500,
                showConfirmButton: false,
            });
            setTimeout(() => {
                navigate(`/estudiantes/detalle/${estudianteId}`);
            }, 1500);
            if (estudianteActualizado) {
                setEstudiante(estudianteActualizado);
            }
        } catch (err) {
            setError(err.response?.data?.mensaje || err.message || "Ocurrió un error al actualizar el correo");
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className="pagina">
            <section className="contenido contenido--angosto">
                <p className="migaja">
                    <Link to={`/estudiantes/detalle/${estudianteId}`}>‹ Volver al detalle</Link>
                </p>
                <h1 className="titulo">Actualizar correo</h1>
                <p className="subtitulo">
                    {estudiante ? `Estudiante: ${estudiante.nombre}` : "Cambia el correo electrónico del estudiante."}
                </p>

                <div className="tarjeta-formulario">
                    {cargandoEstudiante ? (
                        <p className="ayuda">Cargando información del estudiante...</p>
                    ) : (
                        <form onSubmit={manejarSubmit}>
                            <div className="campo">
                                <label className="etiqueta" htmlFor="correo">
                                    Correo electrónico <span className="requerido">*</span>
                                </label>
                                <input
                                    id="correo"
                                    className="entrada"
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    disabled={cargando}
                                    placeholder="correo@ejemplo.com"
                                />
                                {error && <span className="ayuda" style={{ color: "var(--color-error)" }}>{error}</span>}
                            </div>

                            <div className="acciones">
                                <button type="submit" className="boton boton--primario" disabled={cargando}>
                                    {cargando ? "Actualizando..." : "Actualizar correo"}
                                </button>
                                <Link to={`/estudiantes/detalle/${estudianteId}`} className="boton boton--secundario">
                                    Cancelar
                                </Link>
                            </div>

                            {exito && <p style={{ color: "var(--color-accent-green)" }}>Correo actualizado correctamente</p>}
                        </form>
                    )}
                </div>
            </section>
        </section>
    );
}
