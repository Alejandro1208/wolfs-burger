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
        handleGetProducts();
        break;
    case 'POST':
        handleCreateProduct();
        break;
    case 'PUT':
        handleUpdateProduct();
        break;
    case 'DELETE':
        handleDeleteProduct();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleGetProducts() {
    $conn = getDbConnection();
    $sql = "SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC";
    $result = $conn->query($sql);
    $products = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['is_featured'] = ($row['is_featured'] == 1);
            
            $images = [];
            $stmt_images = $conn->prepare("SELECT id, image_url FROM product_images WHERE product_id = ? ORDER BY order_index");
            $stmt_images->bind_param("i", $row['id']);
            $stmt_images->execute();
            $result_images = $stmt_images->get_result();

            while ($img_row = $result_images->fetch_assoc()) {
                $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
                $img_row['image_url'] = "$scheme://$host$basePath/" . $img_row['image_url'];
                $images[] = $img_row;
            }
            $stmt_images->close();
            $row['images'] = $images;
            $products[] = $row;
        }
    }
    echo json_encode($products);
    $conn->close();
}

function handleCreateProduct() {
    $conn = getDbConnection();
    // Añadimos 'is_featured' al INSERT
    $stmt = $conn->prepare("INSERT INTO products (name, description, price, category_id, pedidosya_link, is_featured) VALUES (?, ?, ?, ?, ?, ?)");
    $is_featured = isset($_POST['is_featured']) && $_POST['is_featured'] == 'true' ? 1 : 0;
    $stmt->bind_param("ssdisi", $_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'], $_POST['pedidosya_link'], $is_featured);
    
    if ($stmt->execute()) {
        $productId = $stmt->insert_id;
        handleImageUpload($conn, $productId);
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $productId]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear el producto', 'details' => $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function handleUpdateProduct() {
    $conn = getDbConnection();
    $id = $_POST['id'];

    // Añadimos 'is_featured' al UPDATE
    $stmt = $conn->prepare("UPDATE products SET name=?, description=?, price=?, category_id=?, pedidosya_link=?, is_featured=? WHERE id=?");
    $is_featured = isset($_POST['is_featured']) && $_POST['is_featured'] == 'true' ? 1 : 0;
    $stmt->bind_param("ssdisii", $_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'], $_POST['pedidosya_link'], $is_featured, $id);
    $stmt->execute();
    $stmt->close();

    // Sincronizar imágenes
    $existing_images = isset($_POST['existing_images']) ? json_decode($_POST['existing_images'], true) : [];
    $existing_ids = array_map(function($img) { return $img['id']; }, $existing_images);
    
    $stmt_select_old = $conn->prepare("SELECT id, image_url FROM product_images WHERE product_id = ?");
    $stmt_select_old->bind_param("i", $id);
    $stmt_select_old->execute();
    $result_old = $stmt_select_old->get_result();
    $stmt_delete_img = $conn->prepare("DELETE FROM product_images WHERE id = ?");
    while($row = $result_old->fetch_assoc()){
        if(!in_array($row['id'], $existing_ids)){
            if(file_exists($row['image_url'])) unlink($row['image_url']);
            $stmt_delete_img->bind_param("i", $row['id']);
            $stmt_delete_img->execute();
        }
    }
    $stmt_select_old->close();
    $stmt_delete_img->close();

    // Subir imágenes nuevas
    handleImageUpload($conn, $id);
    
    echo json_encode(['success' => true, 'id' => $id]);
    $conn->close();
}

function handleDeleteProduct() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $stmt_img = $conn->prepare("SELECT image_url FROM product_images WHERE product_id = ?");
    $stmt_img->bind_param("i", $id);
    $stmt_img->execute();
    $result_images = $stmt_img->get_result();
    while($row = $result_images->fetch_assoc()) {
        if (file_exists($row['image_url'])) unlink($row['image_url']);
    }
    $stmt_img->close();

    $stmt_prod = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt_prod->bind_param("i", $id);
    if ($stmt_prod->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar el producto']);
    }
    $stmt_prod->close();
    $conn->close();
}

function handleImageUpload($conn, $productId) {
    if (isset($_FILES['new_images'])) {
        $uploadDir = 'uploads/products/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
        
        foreach ($_FILES['new_images']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['new_images']['error'][$key] === UPLOAD_ERR_OK) {
                $fileName = uniqid('prod_' . $productId . '_') . '-' . basename($_FILES['new_images']['name'][$key]);
                $uploadPath = $uploadDir . $fileName;
                if (move_uploaded_file($tmp_name, $uploadPath)) {
                    $stmt_img = $conn->prepare("INSERT INTO product_images (product_id, image_url, order_index) VALUES (?, ?, ?)");
                    $stmt_img->bind_param("isi", $productId, $uploadPath, $key);
                    $stmt_img->execute();
                    $stmt_img->close();
                }
            }
        }
    }
}
?>