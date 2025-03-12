# NinethEye AI Solutions Website

## Setup Instructions
1. Clone the repository
2. Copy `php/config.sample.php` to `php/config.php`
3. Add your Brevo API key to `config.php`
4. Install dependencies: `composer install`
5. Start local PHP server: `php -S localhost:8000`

## Contact Form
The contact form uses Brevo (formerly Sendinblue) for email delivery. Make sure to:
- Verify your sender email in Brevo dashboard
- Add valid API key in config.php