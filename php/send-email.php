<?php
require_once(__DIR__ . '/../vendor/autoload.php');
$config = require_once(__DIR__ . '/config.php');

use Brevo\Client\Configuration;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Model\SendSmtpEmail;

// Error reporting configuration
error_reporting(E_ALL & ~E_DEPRECATED);
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Fetch API key from config
    $brevoApiKey = $config['brevo_api_key'] ?? null;

    if (!$brevoApiKey) {
        echo json_encode(['status' => 'error', 'message' => 'API key is missing']);
        exit;
    }
    
    // Configure API key for Brevo
    $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $brevoApiKey);
    
    $apiInstance = new TransactionalEmailsApi(
        new \GuzzleHttp\Client(),
        $config
    );
    
    $sendSmtpEmail = new SendSmtpEmail([
        'subject' => "New Contact Form Submission: $subject",
        'sender' => ['name' => 'NinethEye Website', 'email' => 'contact@ninetheye.com'], // Changed sender
        'replyTo' => ['email' => $email, 'name' => $name], // Added reply-to
        'to' => [['email' => 'contact@ninetheye.com']],
        'htmlContent' => "<html><body><h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong></p>
            <p>$message</p></body></html>"
    ]);
    
    try {
        $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Message could not be sent']);
    }
}
?>