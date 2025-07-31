<?php
// api/banners.php (VERSIÓN CORREGIDA Y FINAL)
ini_set('display_errors', 1); error_reporting(E_ALL);
require_once 'db_connection.php';
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET': handleGetBanners(); break;
    case 'POST': handlePostBanner(); break;
    case 'DELETE': handleDeleteBanner(); break;
    default: http_response_code(405); echo json_encode(['error' => 'Método no permitido.']); break;
}

function handleGetBanners() {
    $conn = getDbConnection();
    $sql = "SELECT id, image_url, alt_text FROM banners ORDER BY id DESC";
    $result = $conn->query($sql);
    $banners = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $host = $_SERVER['HTTP_HOST'];
            $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
            $row['image_url'] = "$scheme://$host$basePath/" . $row['image_url'];
            $banners[] = $row;
        }
    }
    header('Content-Type: application/json');
    echo json_encode($banners);
    $conn->close();
}

function handlePostBanner() {
    $conn = getDbConnection();
    if (isset($_FILES['banner'])) {
        $file = $_FILES['banner'];
        $alt_text = 'Imagen de fondo de la portada';

        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400); echo json_encode(['error' => 'Error en la subida del archivo.']); return;
        }

        $uploadDir = 'uploads/banners/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

        $fileName = uniqid('banner_') . '-' . basename($file['name']);
        $uploadPath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            // ESTA ES LA PARTE CORREGIDA: La consulta ahora es simple.
            $stmt = $conn->prepare("INSERT INTO banners (image_url, alt_text) VALUES (?, ?)");
            $stmt->bind_param("ss", $uploadPath, $alt_text);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Error al guardar en la base de datos.', 'db_error' => $stmt->error]);
            }
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo mover el archivo. Verifica los permisos de la carpeta.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No se recibió el archivo "banner".']);
    }
    $conn->close();
}

function handleDeleteBanner() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    if (!$id) {
        http_response_code(400); echo json_encode(['error' => 'ID de banner requerido.']); return;
    }

    $stmt = $conn->prepare("SELECT image_url FROM banners WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $filePath = $row['image_url'];
        $deleteStmt = $conn->prepare("DELETE FROM banners WHERE id = ?");
        $deleteStmt->bind_param("i", $id);
        if ($deleteStmt->execute()) {
            if (file_exists($filePath)) unlink($filePath);
            http_response_code(200);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar de la base de datos.']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Banner no encontrado.']);
    }
    $conn->close();
}
?>