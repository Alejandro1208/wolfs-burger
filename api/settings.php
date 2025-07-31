<?php
// api/settings.php
require_once 'db_connection.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetSettings();
        break;
    case 'POST': // POST ahora manejará tanto texto como archivos
        handleUpdateSettings();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido.']);
        break;
}

function handleGetSettings() {
    $conn = getDbConnection();
    $result = $conn->query("SELECT `key`, `value` FROM `site_settings`");
    $settings = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            // Si es la URL del logo, la construimos completa
            if ($row['key'] === 'site_logo_url' && !empty($row['value'])) {
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
                $row['value'] = "$scheme://$host$basePath/" . $row['value'];
            }
            $settings[$row['key']] = $row['value'];
        }
    }
    echo json_encode($settings);
    $conn->close();
}

function handleUpdateSettings() {
    $conn = getDbConnection();
    
    // 1. Manejar la subida del nuevo logo, si existe
    if (isset($_FILES['site_logo'])) {
        $file = $_FILES['site_logo'];
        if ($file['error'] === UPLOAD_ERR_OK) {
            // Borrar el logo anterior del servidor
            $old_logo_result = $conn->query("SELECT value FROM site_settings WHERE `key` = 'site_logo_url'");
            if ($old_logo_result && $old_logo_row = $old_logo_result->fetch_assoc()) {
                if (file_exists($old_logo_row['value'])) {
                    unlink($old_logo_row['value']);
                }
            }

            // Subir el nuevo logo
            $uploadDir = 'uploads/site/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            $fileName = 'logo-' . time() . '-' . basename($file['name']);
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                // Guardar la nueva ruta en la base de datos
                $stmt = $conn->prepare("INSERT INTO site_settings (`key`, `value`) VALUES ('site_logo_url', ?) ON DUPLICATE KEY UPDATE `value` = ?");
                $stmt->bind_param("ss", $uploadPath, $uploadPath);
                $stmt->execute();
                $stmt->close();
            }
        }
    }

    // 2. Actualizar el resto de los datos de texto que vienen de $_POST
    $stmt = $conn->prepare("INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
    foreach ($_POST as $key => $value) {
        // Nos aseguramos de no intentar guardar el campo del logo como texto
        if ($key !== 'site_logo_url') {
            $stmt->bind_param("ss", $key, $value);
            $stmt->execute();
        }
    }

    if ($stmt->error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    } else {
        http_response_code(200);
        echo json_encode(['success' => true]);
    }
    $stmt->close();
    $conn->close();
}
?>