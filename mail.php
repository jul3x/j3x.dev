<?php
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $env = parse_ini_file('../.env');
    $recaptcha_api_key = $env['RECAPTCHA_TOKEN'];

    $name_encoded = mb_convert_encoding($_POST['name'], 'UTF-8', 'auto');
    $name = htmlspecialchars(trim($name_encoded), ENT_QUOTES, 'UTF-8');
    $recaptcha_token = $_POST['g-recaptcha-response'];
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message_encoded = mb_convert_encoding($_POST['message'], 'UTF-8', 'auto');
    $message = htmlspecialchars(trim($message_encoded), ENT_QUOTES, 'UTF-8');

    $recaptcha_url = "https://recaptchaenterprise.googleapis.com/v1/projects/j3x-dev-1727355689334/assessments?key=" . $recaptcha_api_key;
    $postData = json_encode([
        'event' => [
            'token' => $recaptcha_token,
            'expectedAction' => 'USER_ACTION',
            'siteKey' => "6LcBrE8qAAAAAL5xD2EYaK9YTFTqxDh3CeJHUI9b"
        ]
    ]);

    $ch = curl_init($recaptcha_url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'API Error: ' . curl_error($ch);
        curl_close($ch);
        http_response_code(403);
        return;
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            $valid = $data['tokenProperties']['valid'];
            $score = $data['riskAnalysis']['score'];

            if ($valid == 1) {
                echo '';
            } else {
                echo 'Invalid token';
                http_response_code(403);
                return;
            }

            if ($score < 0.3) {
                echo 'You are a bot: ' . $score;
                http_response_code(403);
                return;
            }
        }
        else {
            echo 'reCAPTCHA error';
            http_response_code(403);
            return;
        }
    }

    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {
        $to = "self@j3x.dev";
        $subject = "Message from j3x.dev contact form";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/plain;charset=UTF-8" . "\r\n";
        $headers .= "From: " . $email;

        $email_body = "Name: $name\r\n";
        $email_body .= "Email: $email\r\n";
        $email_body .= "Message: \r\n$message\r\n";

        if (mail($to, $subject, $email_body, $headers)) {
            echo "Message sent successfully!";
            http_response_code(200);
            return;
        } else {
            echo "There was a problem sending the message.";
            http_response_code(400);
            return;
        }
    } else {
        echo "Please fill out all fields correctly.";
        http_response_code(400);
        return;
    }
} else {
    echo "Invalid request.";
    http_response_code(400);
    return;
}
?>
