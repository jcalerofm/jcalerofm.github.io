<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $honeypot = trim($_POST["xtraform"]);

    if (!empty($honeypot)) {
        echo "<p class='error'>Se detectó actividad de bot.</p>";
        exit;
    }

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<p class='error'>Por favor completa todos los campos correctamente y vuelve a intentarlo.</p>";
        exit;
    }

    $recipient = "jorge.calero@gmail.com";
    $subject = "Nuevo mensaje de contacto de $name";
    $email_content = "Nombre: $name\nEmail: $email\nMensaje:\n$message\n";
    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "<p class='success'>Gracias, $name. Tu mensaje ha sido enviado.</p>";
    } else {
        echo "<p class='error'>Lo sentimos, hubo un error al enviar tu mensaje.</p>";
    }

    $confirm_subject = "Gracias por contactarme";
    $confirm_content = "Hola $name,\n\nGracias por tu mensaje. He recibido tu solicitud:\n\n$message\n\nTe contactaré lo antes posible.\n\nSaludos,\nJorge Calero";
    $confirm_headers = "From: Atención <jorge.calero@gmail.com>";

    mail($email, $confirm_subject, $confirm_content, $confirm_headers);
}
?>
