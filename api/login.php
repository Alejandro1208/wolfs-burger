<?php
require_once 'db_connection.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email y contraseña son requeridos.']);
    return;
}

$conn = getDbConnection();
$stmt = $conn->prepare("SELECT * FROM admins WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        unset($user['password']); 
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Credenciales inválidas.']);
    }
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Credenciales inválidas.']);
}

$stmt->close();
$conn->close();
?>