<?php
// Incluir el archivo de conexión a la base de datos
require_once 'db_connection.php';

// Establecer un límite de tiempo más largo para la ejecución, por si acaso
set_time_limit(60);

// Mensaje de estado
echo "<h1>Ejecutando Seeder...</h1>";

try {
    // Obtener la conexión a la base de datos
    $conn = getDbConnection();

    // --- PASO 1: Desactivar revisión de claves foráneas para la limpieza ---
    $conn->query('SET FOREIGN_KEY_CHECKS=0;');
    echo "<p>Revisión de claves foráneas desactivada.</p>";

    // --- PASO 2: Vaciar las tablas ---
    $conn->query('TRUNCATE TABLE `products`;');
    echo "<p>Tabla 'products' vaciada con éxito.</p>";
    $conn->query('TRUNCATE TABLE `categories`;');
    echo "<p>Tabla 'categories' vaciada con éxito.</p>";

    // --- PASO 3: Reactivar revisión de claves foráneas ---
    $conn->query('SET FOREIGN_KEY_CHECKS=1;');
    echo "<p>Revisión de claves foráneas reactivada.</p>";

    // --- PASO 4: Insertar las categorías ---
    $categories = [
        'Hamburguesas',
        'Bebidas',
        'Papas',
        'Combos'
    ];

    $stmt = $conn->prepare("INSERT INTO `categories` (`name`) VALUES (?)");
    
    foreach ($categories as $category) {
        $stmt->bind_param("s", $category);
        $stmt->execute();
    }
    
    $stmt->close();
    echo "<p><b>" . count($categories) . " categorías</b> han sido insertadas con éxito.</p>";

    // --- FIN ---
    echo "<hr><h2>¡Seeder completado exitosamente!</h2>";
    echo "<p>La base de datos ha sido poblada con los datos iniciales.</p>";
    echo "<p><strong>Importante:</strong> Por seguridad, considera eliminar este archivo del servidor una vez que hayas terminado de usarlo.</p>";

} catch (Exception $e) {
    // Manejo de errores
    http_response_code(500);
    echo "<h2>¡Ha ocurrido un error!</h2>";
    echo "<p style='color:red;'>Error: " . $e->getMessage() . "</p>";
} finally {
    // Asegurarse de que la conexión se cierre
    if (isset($conn)) {
        $conn->close();
    }
}
?>