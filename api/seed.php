<?php
require_once 'db_connection.php';

set_time_limit(60);

echo "<h1>Ejecutando Seeder...</h1>";

try {
    $conn = getDbConnection();

    $conn->query('SET FOREIGN_KEY_CHECKS=0;');
    echo "<p>Revisión de claves foráneas desactivada.</p>";

    $conn->query('TRUNCATE TABLE `products`;');
    echo "<p>Tabla 'products' vaciada con éxito.</p>";
    $conn->query('TRUNCATE TABLE `categories`;');
    echo "<p>Tabla 'categories' vaciada con éxito.</p>";

    $conn->query('SET FOREIGN_KEY_CHECKS=1;');
    echo "<p>Revisión de claves foráneas reactivada.</p>";

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