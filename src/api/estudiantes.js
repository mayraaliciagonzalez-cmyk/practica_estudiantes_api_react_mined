//en este archivo vamos a consumir la api de estudiantes de express
import axios from "axios";


//creando el método para obtener todos los estudiantes
export const obtenerEstudiantes = async () => {

    //url/endpoint de la api, SINO le especificamos el piensa que es un get


    const respuesta = await fetch("http://localhost:3000/api/estudiantes");
    //la respuesta la especificamos .json

    const dataEstudiantes = await respuesta.json();
    return dataEstudiantes;
}

//metodo para obtener estudiantes con AXIOS

export const getStudents = async () => {
    const respuesta = await axios.get("https://expressapiestudiantes-production.up.railway.app/api/estudiantes");
    return respuesta.data;
}

//metodo para obtener estudiantes por su ID

export const getStudentById = async (studentID) => {
const respuesta = await axios.get(`https://expressapiestudiantes-production.up.railway.app/api/estudiantes/${studentID}`);
    return respuesta.data;
}

//metodo para registrar estudiantes en la api
//el "objetoEstudiante" tiene que mandar un objeto con la info del estudiante, ejemplo: {nombre: "Juan", edad: 20, correo: "
export const saveStudent = async (objetoEstudiante) => {
    const respuesta = await axios.post("https://expressapiestudiantes-production.up.railway.app/api/estudiantes", 
        objetoEstudiante
    );
    return respuesta.data;
}   
 
export const updateEmail = async (studentID, correo) => {
const respuesta = await axios.patch(`https://expressapiestudiantes-production.up.railway.app/api/estudiantes/${studentID}`, 
 { correo });
    return respuesta.data;
}
