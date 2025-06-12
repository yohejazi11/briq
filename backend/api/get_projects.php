<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");



require_once '../config/db.php';
$query = "SELECT * FROM projects";
$result = $conn->query($query);

$projects = [];

while ($row = $result->fetch_assoc()) {
    // جلب الصور الخاصة بكل مشروع
    $project_id = $row['id'];
    $images_result = $conn->query("SELECT image_url FROM project_images WHERE project_id = $project_id");

    $images = [];
    while ($img = $images_result->fetch_assoc()) {
        $images[] = $img['image_url'];
    }

    $row['images'] = $images;
    $projects[] = $row;
}

echo json_encode(["status" => "success", "data" => $projects]);
?>

