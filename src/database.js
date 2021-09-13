const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app'
});

//validar si se conecto o no a la DB
conexion.connect((error)=>{
    if (error) {
        console.error('El error de conexión es: '+error);
        return
    } else {
        console.log('Conexion a la BD con Exito');
    }
});


module.exports = conexion;