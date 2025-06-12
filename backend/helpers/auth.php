<?php
require_once '../config/db.php';

function getUserIdFromToken($token) {
    global $conn;

    if (!$token) return false;

    $stmt = $conn->prepare("SELECT id FROM users WHERE token = ?");
    if (!$stmt) {
        return false;
    }

    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows === 1) {
        $user = $result->fetch_assoc();
        return $user['id'];
    }

    return false;
}

function authenticate() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Authorization token required"]);
        exit;
    }

    $authHeader = $headers['Authorization'];
    if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid authorization header"]);
        exit;
    }

    $token = $matches[1];
    $userId = getUserIdFromToken($token);

    if (!$userId) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    return $userId; // أو تقدر ترجع بيانات المستخدم لو حبيت
}