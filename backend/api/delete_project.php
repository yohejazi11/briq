<?php
// api/add_project.php
$allowedOrigins = ['http://localhost:5173'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");
require_once '../config/db.php';

$id = intval($_POST['id'] ?? 0);
if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'رقم المشروع غير صحيح']);
    exit;
}

$id = mysqli_real_escape_string($conn, $id);
$check = $conn->query("SELECT id FROM projects WHERE id = '$id'");
if ($check->num_rows == 0) {
    echo json_encode(['status' => 'error', 'message' => 'المشروع غير موجود']);
    exit;
}

// جلب جميع الصور المرتبطة بالمشروع من جدول project_images
$images_res = $conn->query("SELECT image_url FROM project_images WHERE project_id = '$id'");
while ($img = $images_res->fetch_assoc()) {
    $imgPath = str_replace('http://localhost/buildcompany/backend/', '../', $img['image_url']);
    if (file_exists($imgPath)) {
        unlink($imgPath);
    }
}
// حذف جميع الصور من جدول project_images لهذا المشروع
$conn->query("DELETE FROM project_images WHERE project_id = '$id'");

$sql = "DELETE FROM projects WHERE id = '$id'";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'حدث خطأ أثناء الحذف']);
}
?>
