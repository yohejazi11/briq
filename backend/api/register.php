<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// api/register.php
$allowedOrigins = ['http://localhost:5173'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");
require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'الرجاء إدخال جميع البيانات']);
    exit;
}

$username = mysqli_real_escape_string($conn, $username);

$check = mysqli_query($conn, "SELECT id FROM users WHERE username = '$username'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'اسم المستخدم مستخدم بالفعل']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (username, password_hash) VALUES ('$username', '$hash')";
if (mysqli_query($conn, $sql)) {
    $userId = mysqli_insert_id($conn);
    echo json_encode(['status' => 'success', 'user_id' => $userId]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'حدث خطأ أثناء التسجيل']);
}

?>
