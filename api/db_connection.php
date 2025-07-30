<?php
// Configuración de la base de datos para Wolf's Burger
define('DB_HOST', 'localhost');
define('DB_USER', 'ale287_wolfs-usuario');
define('DB_PASS', 'Giovanni2906.');
define('DB_NAME', 'ale287_wolfs_db');

/**
 * Función para obtener una conexión a la base de datos.
 * Devuelve un objeto mysqli o termina la ejecución si hay un error.
 */
function getDbConnection() {
    // Crear la conexión
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // Verificar la conexión
    if ($conn->connect_error) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Error de conexión a la base de datos.']);
        exit();
    }

    // Asegurar que la conexión use UTF-8
    $conn->set_charset("utf8mb4");

    return $conn;
}

// Configuración de las cabeceras para permitir peticiones (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar peticiones OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>