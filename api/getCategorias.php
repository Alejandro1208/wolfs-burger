<?php
// api/getCategorias.php (Ahora se llamará categories.php o un nombre similar)
// O puedes reemplazar el contenido de getCategorias.php con esto
require_once 'db_connection.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        handleGetCategories();
        break;
    case 'POST':
        handleCreateCategory($data);
        break;
    case 'PUT':
        handleUpdateCategory($data);
        break;
    case 'DELETE':
        handleDeleteCategory($data);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleGetCategories() {
    $conn = getDbConnection();
    $result = $conn->query("SELECT id, name FROM categories ORDER BY id ASC");
    $categories = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
    }
    echo json_encode($categories);
    $conn->close();
}

function handleCreateCategory($data) {
    $conn = getDbConnection();
    $name = $data['name'] ?? '';
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'El nombre es requerido.']);
        return;
    }
    $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");
    $stmt->bind_param("s", $name);
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear la categoría.']);
    }
    $stmt->close();
    $conn->close();
}

function handleUpdateCategory($data) {
    $conn = getDbConnection();
    $id = $data['id'] ?? null;
    $name = $data['name'] ?? '';
    if (empty($id) || empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Se requieren el ID y el nombre.']);
        return;
    }
    $stmt = $conn->prepare("UPDATE categories SET name = ? WHERE id = ?");
    $stmt->bind_param("si", $name, $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar la categoría.']);
    }
    $stmt->close();
    $conn->close();
}

function handleDeleteCategory($data) {
    $conn = getDbConnection();
    $id = $data['id'] ?? null;
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'El ID es requerido.']);
        return;
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