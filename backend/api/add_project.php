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

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$images = $_FILES['images'] ?? null; // images[]

if (!$title || !$description || !$images) {
    echo json_encode(['status' => 'error', 'message' => 'جميع الحقول مطلوبة']);
    exit;
}

$title = mysqli_real_escape_string($conn, $title);
$description = mysqli_real_escape_string($conn, $description);

// أضف المشروع أولاً
$sql = "INSERT INTO projects (title, description) VALUES ('$title', '$description')";
if (mysqli_query($conn, $sql)) {
    $project_id = mysqli_insert_id($conn);
    $uploaded = 0;
    // رفع كل صورة وتخزينها في جدول project_images
    foreach ($images['tmp_name'] as $idx => $tmpName) {
        if ($tmpName) {
            $ext = pathinfo($images['name'][$idx], PATHINFO_EXTENSION);
            $imgName = uniqid() . '.' . $ext;
            $imgPath = '../uploads/projects/' . $imgName;
            if (move_uploaded_file($tmpName, $imgPath)) {
                $imgUrl = 'http://localhost/buildcompany/backend/uploads/projects/' . $imgName;
                $conn->query("INSERT INTO project_images (project_id, image_url) VALUES ($project_id, '$imgUrl')");
                $uploaded++;
            }
        }
    }
    if ($uploaded > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'لم يتم رفع أي صورة']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'حدث خطأ أثناء إضافة المشروع']);
}
?>
