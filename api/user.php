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
    $email = $data['email'];
    $password = $data['password'];
    $role = $data['role'];
    
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO admins (email, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password_hash, $role);
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear el usuario.']);
    }
    $conn->close();
}

?>