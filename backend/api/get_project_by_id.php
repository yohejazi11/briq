<?php
header("Content-Type: application/json");
require_once("../config.php"); // عدّل المسار إذا لزم

if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing project id"
    ]);
    exit;
}

$id = intval($_GET['id']);



$stmt = $conn->prepare("SELECT id, title, description, image FROM projects WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "status" => "success",
        "project" => $row
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Project not found"
    ]);
}

$stmt->close();
$conn->close();
