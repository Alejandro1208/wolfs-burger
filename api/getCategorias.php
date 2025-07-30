<?php
require_once 'db_connection.php';

$conn = getDbConnection();

$sql = "SELECT id, name FROM categories ORDER BY id";

$result = $conn->query($sql);

$categories = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
}

$conn->close();

echo json_encode($categories);
?>