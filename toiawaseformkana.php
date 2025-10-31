<?php
session_start();

mb_language("Japanese");
mb_internal_encoding("UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("不正なアクセスです。");
}

if (
    empty($_POST['csrf_token']) ||
    empty($_SESSION['csrf_token']) ||
    $_POST['csrf_token'] !== $_SESSION['csrf_token']
) {
    http_response_code(403);
    exit("CSRFトークンが無効です。");
}
unset($_SESSION['csrf_token']);

function sanitize($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, "UTF-8");
}

$name    = sanitize($_POST["name"] ?? '');
$email   = sanitize($_POST["email"] ?? '');
$message = sanitize($_POST["message"] ?? '');

$errors = [];
if (empty($name))    $errors[] = "名前は必須です。";
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "正しいメールアドレスを入力してください。";
if (empty($message)) $errors[] = "お問い合わせ内容は必須です。";

if (!empty($errors)) {
    foreach ($errors as $error) {
        echo "<p>{$error}</p>";
    }
    exit;
}

// あなたのロリポップ上のメールアドレスに置き換える！
$from_address = "info@ppt-hikoushikif.heavy.jp";

$to = "kon.kanahf.kanri@gmail.com"; 
$subject = "【非公式ファンサイト】お問い合わせ";
$body = <<<EOT
【氏名】
{$name}

【メールアドレス】
{$email}

【お問い合わせ内容】
{$message}
EOT;

// ヘッダにFromとReply-Toを明記
$headers = "From: 非公式サイト <{$from_address}>\r\n";
$headers .= "Reply-To: {$email}\r\n";

// ロリポップの仕様で必須
ini_set("sendmail_from", $from_address);

if (mb_send_mail($to, $subject, $body, $headers)) {
    header("Location: kanafthanks.html");
    exit;
} else {
    echo "<p>送信に失敗しました。ロリポップのメール設定を再確認してください。</p>";
}
?>
