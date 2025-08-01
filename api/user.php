<?php

require_once 'db_connection.php';


$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        handleGetUsers();
        break;
    case 'POST':
        handleCreateUser($data);
        break;
    case 'PUT':
        handleUpdateUser($data);
        break;
    case 'DELETE':
        handleDeleteUser($data);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleGetUsers() {
    $conn = getDbConnection();
    $result = $conn->query("SELECT id, email, role FROM admins ORDER BY id ASC");
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
    $conn->close();
}

function handleCreateUser($data) {
    $conn = getDbConnection();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $role = $data['role'] ?? 'admin';
    
    if (empty($email) || empty($password)) {
        http_response_code(400); echo json_encode(['error' => 'Email y contraseña son requeridos.']); return;
    }
    
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO admins (email, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password_hash, $role);
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'El email ya existe o hubo un error.']);
    }
    $conn->close();
}

function handleUpdateUser($data) {
    $conn = getDbConnection();
    $id = $data['id'] ?? null;
    $email = $data['email'] ?? '';
    $role = $data['role'] ?? 'admin';
    $password = $data['password'] ?? null;

    if (empty($id) || empty($email)) {
        http_response_code(400); echo json_encode(['error' => 'ID y email son requeridos.']); return;
    }

    if (!empty($password)) { 
        $password_hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE admins SET email = ?, role = ?, password = ? WHERE id = ?");
        $stmt->bind_param("sssi", $email, $role, $password_hash, $id);
    } else { 
        $stmt = $conn->prepare("UPDATE admins SET email = ?, role = ? WHERE id = ?");
        $stmt->bind_param("ssi", $email, $role, $id);
    }
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar el usuario.']);
    }
    $conn->close();
}

function handleDeleteUser($data) {
    $conn = getDbConnection();
    $id = $data['id'] ?? null;

    if (empty($id)) {
        http_response_code(400); echo json_encode(['error' => 'El ID es requerido.']); return;
    }
    if ($id == 1) {
        http_response_code(403); echo json_encode(['error' => 'No se puede eliminar al superadministrador principal.']); return;
    }

    $stmt = $conn->prepare("DELETE FROM admins WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar el usuario.']);
    }
    $conn->close();
}
?>