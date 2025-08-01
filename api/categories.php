<?php
require_once 'db_connection.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

if ($method == 'POST' && isset($_POST['action']) && $_POST['action'] == 'reorder') {
    handleReorderCategories();
    return;
}

switch ($method) {
    case 'GET':
        handleGetCategories();
        break;
    case 'POST': 
        handleSaveCategory();
        break;
    case 'PUT': 
        handleSaveCategory();
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
    $result = $conn->query("SELECT id, name, description, image_url, order_index FROM categories ORDER BY order_index ASC");
    $categories = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            if (!empty($row['image_url'])) {
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
                $row['image_url'] = "$scheme://$host$basePath/" . ltrim($row['image_url'], '/');
            }
            $categories[] = $row;
        }
    }
    echo json_encode($categories);
    $conn->close();
}

function handleReorderCategories() {
    $conn = getDbConnection();
    $orderedIds = $_POST['orderedIds'] ?? [];

    if (empty($orderedIds) || !is_array($orderedIds)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se proporcionó un orden válido.']);
        return;
    }

    $stmt = $conn->prepare("UPDATE categories SET order_index = ? WHERE id = ?");
    foreach ($orderedIds as $index => $id) {
        $order = $index + 1;
        $stmt->bind_param("ii", $order, $id);
        $stmt->execute();
    }

    if ($stmt->error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Error al actualizar el orden.']);
    } else {
        echo json_encode(['success' => true]);
    }
    $stmt->close();
    $conn->close();
}


function handleSaveCategory() {
    $conn = getDbConnection();
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    
    $image_path_for_db = null;
    if ($id) {
        $stmt_get_existing = $conn->prepare("SELECT image_url FROM categories WHERE id = ?");
        $stmt_get_existing->bind_param("i", $id);
        $stmt_get_existing->execute();
        $result = $stmt_get_existing->get_result()->fetch_assoc();
        if ($result) {
            $image_path_for_db = $result['image_url'];
        }
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/categories/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        if ($id && $image_path_for_db && file_exists($image_path_for_db)) {
            unlink($image_path_for_db);
        }
        $fileName = 'cat_' . time() . '-' . basename($_FILES['image']['name']);
        $uploadPath = $uploadDir . $fileName;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            $image_path_for_db = $uploadPath;
        } else {
            http_response_code(500); echo json_encode(['success' => false, 'error' => 'No se pudo mover el archivo.']); return;
        }
    }

    if ($id) {
        $stmt = $conn->prepare("UPDATE categories SET name = ?, description = ?, image_url = ? WHERE id = ?");
        $stmt->bind_param("sssi", $name, $description, $image_path_for_db, $id);
    } else {
        $result = $conn->query("SELECT MAX(order_index) as max_order FROM categories");
        $max_order = $result->fetch_assoc()['max_order'] ?? 0;
        $new_order_index = $max_order + 1;

        $stmt = $conn->prepare("INSERT INTO categories (name, description, image_url, order_index) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $name, $description, $image_path_for_db, $new_order_index);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $id ? $id : $stmt->insert_id]);
    } else {
        http_response_code(500); echo json_encode(['success' => false, 'error' => 'Error al guardar en la base de datos.']);
    }
    $stmt->close();
    $conn->close();
}

function handleDeleteCategory() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    if (empty($id)) { http_response_code(400); echo json_encode(['error' => 'ID requerido.']); return; }

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
        http_response_code(500); echo json_encode(['error' => 'Error al eliminar.']);
    }
    $stmt->close();
    $conn->close();
}
?>