<?php
session_start();

ini_set('display_errors','on');
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
include_once("01_conn.php");

if (!isset($_SESSION["has_counted"])) {
    try {
        $sql = "UPDATE visitor SET visitor = visitor + 1 WHERE vid = 1";
        $result = $connect->exec($sql);
        if ($result === false) {
            echo "fail update. <br>\n";
        }
    } catch(PDOException $e) {
        echo $e->getMessage() . "<br>\n";
    }

    $_SESSION["has_counted"] = true;
}

try {
    $sql2 = "SELECT * FROM visitor WHERE vid = 1";
    $connect->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL);
    $rs2 = $connect->query($sql2);
    $rs2->setFetchMode(PDO::FETCH_BOTH);
    $row2 = $rs2->fetch();
    echo "人氣: " . $row2['visitor'] . "<br>";
} catch(PDOException $e) {
    echo $e->getMessage() . "<br>\n";
}
?>
