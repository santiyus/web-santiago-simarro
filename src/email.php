<?php

$header = "";

$msg = $_POST["mensaje"];

// //enviando mensaje
mail("santigus.12@gmail.com", "WEB - santiagosimarro.com", $msg, $header);
echo "ok"

?>