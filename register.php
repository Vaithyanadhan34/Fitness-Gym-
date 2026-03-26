<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST["first_name"];
    $last_name  = $_POST["last_name"];
    $email      = $_POST["email"];
    $phone      = $_POST["phone"];
    $birthday   = $_POST["birthday"];
    $gender     = $_POST["gender"];
    $plan       = $_POST["plan"];

    $sql = "INSERT INTO members (first_name, last_name, email, phone, birthday, gender, plan)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $first_name, $last_name, $email, $phone, $birthday, $gender, $plan);

    if ($stmt->execute()) {
        echo "Membership registered successfully.";
        // header("Location: success.php");
        // exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>