<?php
$allowedOrigins = ['http://localhost:5173'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");
require_once '../config/db.php';
require_once '../helpers/auth.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'الرجاء إدخال جميع البيانات']);
    exit;
}

$username = mysqli_real_escape_string($conn, $username);
$sql = "SELECT id, password_hash FROM users WHERE username = '$username'";
$result = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($result);
if (!$user || !password_verify($password, $user['password_hash'])) {
    echo json_encode(['status' => 'error', 'message' => 'بيانات الدخول غير صحيحة']);
    exit;
}

$_SESSION['user_id'] = $user['id'];
echo json_encode(['status' => 'success', 'user_id' => $user['id']]);
?>
