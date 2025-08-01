<?php
require_once 'db_connection.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

switch ($method) {
    case 'GET':
        handleGetCategories();
        break;
    case 'POST':
        handleCreateOrUpdateCategory();
        break;
    case 'DELETE':
        handleDeleteCategory();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleGetCategories() {
    $conn = getDbConnection();
    // Ahora pedimos también la imagen y descripción
    $result = $conn->query("SELECT id, name, description, image_url FROM categories ORDER BY id ASC");
    $categories = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            if (!empty($row['image_url'])) {
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
                $row['image_url'] = "$scheme://$host$basePath/" . $row['image_url'];
            }
            $categories[] = $row;
        }
    }
    echo json_encode($categories);
    $conn->close();
}

function handleCreateOrUpdateCategory() {
    $conn = getDbConnection();
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';

    if (empty($name)) {
        http_response_code(400); echo json_encode(['error' => 'El nombre es requerido.']); return;
    }

    $image_path = $_POST['existing_image_url'] ?? null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        if ($id) {
            $stmt_old = $conn->prepare("SELECT image_url FROM categories WHERE id = ?");
            $stmt_old->bind_param("i", $id);
            $stmt_old->execute();
            $result_old = $stmt_old->get_result()->fetch_assoc();
            if ($result_old && !empty($result_old['image_url']) && file_exists($result_old['image_url'])) {
                unlink($result_old['image_url']);
            }
        }
        
        $uploadDir = 'uploads/categories/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
        $fileName = 'cat_' . time() . '-' . basename($_FILES['image']['name']);
        $image_path = $uploadDir . $fileName;
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
            http_response_code(500); echo json_encode(['error' => 'No se pudo mover la imagen.']); return;
        }
    }

    if ($id) { 
        $stmt = $conn->prepare("UPDATE categories SET name = ?, description = ?, image_url = ? WHERE id = ?");
        $stmt->bind_param("sssi", $name, $description, $image_path, $id);
    } else { 
        $stmt = $conn->prepare("INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $description, $image_path);
    }

    if ($stmt->execute()) {
        http_response_code($id ? 200 : 201);
        echo json_encode(['success' => true, 'id' => $id ? $id : $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar la categoría.']);
    }
    $stmt->close();
    $conn->close();
}

function handleDeleteCategory() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    if (empty($id)) {
        http_response_code(400); echo json_encode(['error' => 'El ID es requerido.']); return;
    }
    $stmt_old = $conn->prepare("SELECT image_url FROM categories WHERE id = ?");
    $stmt_old->bind_param("i", $id);
    $stmt_old->execute();
    $result_old = $stmt_old->get_result()->fetch_assoc();
    if ($result_old && !empty($result_old['image_url']) && file_exists($result_old['image_url'])) {
        unlink($result_old['image_url']);
    }

    $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar la categoría.']);
    }
    $stmt->close();
    $conn->close();
}
?>