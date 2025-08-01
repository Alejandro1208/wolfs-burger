<?php
require_once 'db_connection.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetSettings();
        break;
    case 'POST':
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
    
    if (isset($_FILES['site_logo'])) {
        $file = $_FILES['site_logo'];
        if ($file['error'] === UPLOAD_ERR_OK) {
            $old_logo_result = $conn->query("SELECT value FROM site_settings WHERE `key` = 'site_logo_url'");
            if ($old_logo_result && $old_logo_row = $old_logo_result->fetch_assoc()) {
                if (file_exists($old_logo_row['value'])) {
                    unlink($old_logo_row['value']);
                }
            }

            $uploadDir = 'uploads/site/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            $fileName = 'logo-' . time() . '-' . basename($file['name']);
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                $stmt = $conn->prepare("INSERT INTO site_settings (`key`, `value`) VALUES ('site_logo_url', ?) ON DUPLICATE KEY UPDATE `value` = ?");
                $stmt->bind_param("ss", $uploadPath, $uploadPath);
                $stmt->execute();
                $stmt->close();
            }
        }
    }

    $stmt = $conn->prepare("INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
    foreach ($_POST as $key => $value) {
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