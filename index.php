<!DOCTYPE html>
<html>
<head>
    <script type="application/javascript">
        var signalServerUrl = 'http://lab.aptoma.no:8080';
    </script>
    <meta charset="UTF-8" />
    <title>Halma</title>
    <!-- Assumes global locations for socket.io.js and easyrtc.js -->
    <script src="lib/jquery-ui-1.10.4.custom/js/jquery-1.10.2.js"></script>
    <script src="lib/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="lib/jquery-ui-1.10.4.custom/js/jquery-ui-touch-punch.js"></script>
    <script>
        document.write('<script src="' + signalServerUrl + '/socket.io/socket.io.js"><\/script>');
        document.write('<script src="' + signalServerUrl + '/easyrtc/easyrtc.js"><\/script>');
    </script>
    <script src="lib/raphael.js"></script>
    <script src="lib/jens.js"></script>
    <script src="lib/halmabrett.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style_900x900.css">
    <link rel="stylesheet" type="text/css" href="css/style_600x600.css">
    <link rel="stylesheet" type="text/css" href="css/style_500x500.css">
    <style>

        body {
            font-family: Verdana, Arial, helvetica, sans-serif;
            font-size: 1.3em;
            margin: 0;
            padding: 0;
        }

        #spiel-container, #dash-container {
            float: left;
        }

        #spiel-container {
            margin: 10px 0 0 10px;
        }

        #chat-container {
            margin-left: 20px;
        }

        #conversation {
            height: 250px;
            overflow-x: hidden;
            overflow-y: scroll;
            width: 450px;
            padding: 6px;
            background-color: #fff8dc;
            font-size: .75em;
            border: solid #CCC 1px;
            border-bottom: none;
        }

        #conversation span {
            margin: 0 3px 0 0 ;
            color: #1b76ac;
            font-size: .7em;
        }

        #chat-input {
            border: solid #CCC 1px;
            border-top-color:  #DDD;
            background-color: rgba(255, 248, 220, 0.63);
            width: 450px;
            padding: 6px;
            font-size: .9em;

        }

        #connectionArea {
            font-size: .8em;
            margin-bottom: 20px;
            margin-left: 20px;
            margin-top: 20px;
            padding: 20px;
            background-color: rgba(43, 129, 175, 0.1);
        }

        #participant {
           margin-left: 20px;
            margin-bottom: 20px;
            width: 450px;
         font-size: .9em;
            line-height: 38px;
        }

        #participant input {
            padding: 5px 6px;
            vertical-align: top;
            font-size: 1em;
        }
    </style>

</head>
<body onload="connect(signalServerUrl)">


<div id="spiel-container">
    <div class="canvas_container" id="canvas_container"></div>
</div>
<div id="dash-container">

     <div id="connectionArea">
            <div id="iam">Obtaining ID...</div>
            <div id="otherClients"></div>
     </div>
    <div id="participant">
        Dein Name: <input type="text" id="myname" />
    </div>
    <div id="chat-container">
        <div id="receiveMessageArea">
            <div id="conversation"></div>
            <input type="text" id="chat-input" />
    <!--        <button onclick="addChatMessage($('#chat-input').val())">Nachricht senden</button>-->
        </div>

    </div>
</div>


</body>
</html>