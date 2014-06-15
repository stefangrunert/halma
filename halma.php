<?php
function getStunUrl() {
 return 'http://192.168.2.103:8080';
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>EasyRTC Demo: Instant Messaging</title>
    <!-- Assumes global locations for socket.io.js and easyrtc.js -->
    <script src="lib/jquery-ui-1.10.4.custom/js/jquery-1.10.2.js"></script>
    <script src="<?=getStunUrl()?>/socket.io/socket.io.js"></script>
    <script src="<?=getStunUrl()?>/easyrtc/easyrtc.js"></script>
    <script src="lib/raphael.js"></script>
    <script src="lib/jens.js"></script>
    <script src="lib/halmabrett.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style_900x900.css">
    <link rel="stylesheet" type="text/css" href="css/style_600x600.css">
    <link rel="stylesheet" type="text/css" href="css/style_500x500.css">
    <style>
    </style>
</head>
<body>

<div class="canvas_container" id="canvas_container"></div>



</body>
</html>