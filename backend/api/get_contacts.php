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


$res = mysqli_query($conn, "SELECT * FROM contact_requests ORDER BY id DESC");
$contacts = [];
while ($row = mysqli_fetch_assoc($res)) {
    $contacts[] = $row;
}
echo json_encode(['status' => 'success', 'data' => $contacts]);
?>
