<?php
require_once '../helpers/auth.php';

$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(["error" => "توكن مفقود أو غير صالح"]);
    exit;
}

$token = trim(str_replace('Bearer', '', $authHeader));
$userId = getUserIdFromToken($token);

if (!$userId) {
    http_response_code(401);
    echo json_encode(["error" => "المستخدم غير موجود أو التوكن غير صالح"]);
    exit;
}
