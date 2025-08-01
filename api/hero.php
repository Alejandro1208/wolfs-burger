<?php
ini_set('display_errors', 1); error_reporting(E_ALL);
require_once 'db_connection.php';
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetHero();
        break;
    case 'POST':
        handleUpdateHero();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido.']);
        break;
}

function handleGetHero() {
    $conn = getDbConnection();
    $result = $conn->query("SELECT * FROM hero_content WHERE id = 1");
    $hero_content = null;
    if ($result) {
        $hero_content = $result->fetch_assoc();
    }
    header('Content-Type: application/json');
    echo json_encode($hero_content);
    $conn->close();
}

function handleUpdateHero() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("UPDATE hero_content SET title=?, subtitle=?, cta1_text=?, cta1_link=?, cta2_text=?, cta2_link=? WHERE id = 1");
    $stmt->bind_param(
        "ssssss",
        $data['title'],
        $data['subtitle'],
        $data['cta1_text'],
        $data['cta1_link'],
        $data['cta2_text'],
        $data['cta2_link']
    );
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>