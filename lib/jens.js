var debug = 0;

var stein = new Array(500);

var dimx;
var dimy;
var cxStart;
var cyStart;
var game;
var halmabrett;
var brettWidth = 700;
var steinDmr = 14;


function translate(term) {
    var terms = {
        'green' : 'grün',
        'blue' : 'blau',
        'red' : 'rot'
    }
    if (terms[term]) {
        return terms[term];
    }
    return term;

}

function initcss (dimx ) {
    document.getElementById("canvas_container").setAttribute("canvas_container_", "dbrow_" + dimx);
//    document.getElementById("dbrow").setAttribute("class", "dbrow_" + dimx);
//    document.getElementById("brow").setAttribute("class", "brow_" + dimx);
//    document.getElementById("wslm_status").setAttribute("class", "wslm_status_" + dimx);
//    document.getElementById("status").setAttribute("class", "status_" + dimx);
//    document.getElementById("message").setAttribute("class", "message_" + dimx);
//    document.getElementById("ip").setAttribute("class", "ip_" + dimx);
//    document.getElementById("input").setAttribute("class", "input_" + dimx);
//    document.getElementById("game").setAttribute("class", "game_" + dimx);
//    document.getElementById("selectspiel").setAttribute("class", "selectspiel_" + dimx);
//    document.getElementById("selectsize").setAttribute("class", "selectsize_" + dimx);
//    document.getElementById("debug").setAttribute("class", "debug_" + dimx);
}

$( document ).ready(function() {
    initcss(dimx);
});

var messageDiv = document.getElementById('message');
var statusDiv = document.getElementById("status");

var socket_lm = io.connect();
// var socket_lm = io.connect('http://127.0.0.1:8080/');
//var socket_lm = io.connect(http://grunertj.aquarius.uberspace.de:7666/');

try {
    socket_lm.on('connect', function () {
        document.getElementById("wslm_status").style.backgroundColor = "#40ff40";
        document.getElementById("wslm_status").textContent = " Websocket connected";
    });
    socket_lm.on('message', function (msg) {
        if (debug == 1) DBG.write(msg);
        j = msg.split('#');
        if (debug == 1) DBG.write(j[0]);
        switch ( j[0] ) {
            case 'd':
                statusDiv.textContent = "down" + ' ' + j[1] + ' ' + j[2] + ' ' + j[3] + "\n";
                stein[j[1]].toFront();
                stein[j[1]].attr({'stroke-width': 4});
                var bbox = stein[j[1]].getBBox();
                stein[j[1]].translate(j[2]-bbox.x,j[3]-bbox.y);
                break;
            case 'm':
                statusDiv.textContent = "move" + ' ' + j[1] + ' ' + j[2] + ' ' + j[3] + "\n";
                var bbox = stein[j[1]].getBBox();
                stein[j[1]].translate(j[2]-bbox.x,j[3]-bbox.y);
                break;
            case 'u':
                statusDiv.textContent = "up" + ' ' + j[1] + ' ' + j[2] + ' ' + j[3] + "\n";
                stein[j[1]].attr({'stroke-width': 1});
                var bbox = stein[j[1]].getBBox();
                stein[j[1]].translate(j[2]-bbox.x,j[3]-bbox.y);
                break;
            case 'c':
                messageDiv.innerHTML += '<br/>' + j[1];
                messageDiv.scrollTop = messageDiv.scrollHeight;
                if ( (j[1] == "halma" || j[1] == "muehle") && (j[2] == 900 || j[2] == 600 || j[2] == 500) ) {
                    game = j[1];
                    dimx = j[2];
                    dimy = dimx;
                    window.location.replace(window.location.href.split("?")[0] + "?game=" + game + "&size=" + dimx);
                }
                break;
            default:
                statusDiv.textContent = "undefined" + ' ' + msg + "\n";
                break;
        }
    });
    socket_lm.on('disconnect', function () {
        document.getElementById("wslm_status").style.backgroundColor = "#ff4040";
        document.getElementById("wslm_status").textContent = " Websocket connection CLOSED";
    });
} catch(exception) {
    alert('<p>Error' + exception);
}



function validateField ( fieldname ) {
    socket_lm.send('c' + "#" + fieldname.value);
    messageDiv.innerHTML += '<br/>' + fieldname.value
    messageDiv.scrollTop = messageDiv.scrollHeight;
    /*
     if ( fieldname.value == "halma" ) {
     window.location.replace(window.location.href.split("?")[0] + "?game=halma&size=900");
     } else if ( fieldname.value == "muehle" ) {
     window.location.replace(window.location.href.split("?")[0] + "?game=muehle&size=900");
     }
     */
    document.getElementById('input').value=''
}

function currentspiel() {
    var spielname = myGameList.options[myGameList.selectedIndex].text;
    if ( spielname == "Halma" ) {
        game = "halma";
    } else if ( spielname == "Muehle" ) {
        game = "muehle";
    }
    socket_lm.send('c' + "#" + game + "#" + dimx);
    window.location.replace(window.location.href.split("?")[0] + "?game=" + game + "&size=" + dimx);
}

function currentsize() {
    var sizename = mySizeList.options[mySizeList.selectedIndex].text;
    if ( sizename == "900" ) {
        dimx = 900;
    } else if ( sizename == "600" ) {
        dimx = 600;
    } else if ( sizename == "500" ) {
        dimx = 500;
    }
    socket_lm.send('c' + "#" + game + "#" + dimx);
    window.location.replace(window.location.href.split("?")[0] + "?game=" + game + "&size=" + dimx);
}

// http://japhr.blogspot.com/2010/07/always-use-getbbox-for-raphael.html

var move = function (dx, dy, x, y) {
 //   console.debug('move');
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
   // console.debug(this.id, halmabrett.getById(this.id), this.ox + dx, this.oy + dy);
    broadcast({action: 'move', id: this.id, left: this.ox + dx, top : this.oy + dy });
//    if ( x > 5 && x < dimx && y > 5 && y < dimy ) {
//        // this.glowing.remove()
//        var trans_x = x-this.ox;
//        var trans_y = y-this.oy;
//        this.translate(trans_x,trans_y);
//        this.ox = x;
//        this.oy = y;
//        // this.glowing = this.glow()
//        var bbox = this.getBBox();
//       // socket_lm.send('m' + "#" + this.id + "#" + Math.ceil(bbox.x) + '#' + Math.ceil(bbox.y));
//       // if (debug == 1) DBG.write(this.id + "#" + dx + '#' + dy + "#" + x + '#' + y + '#' + Math.ceil(bbox.x) + '#' + Math.ceil(bbox.y));
//    }
}

function hexagon (x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
    var area = 'M' + ' ' + x0 + ' ' + y0 + ' '
        + 'L' + ' ' + x1 + ' ' + y1 + ' '
        + 'L' + ' ' + x2 + ' ' + y2 + ' '
        + 'L' + ' ' + x3 + ' ' + y3 + ' '
        + 'L' + ' ' + x4 + ' ' + y4 + ' '
        + 'L' + ' ' + x5 + ' ' + y5 + ' '
        + 'z' ;
    return area;
}

function linie (x0, y0, x1, y1) {
    var area = 'M' + ' ' + x0 + ' ' + y0 + ' ' + 'L' + ' ' + x1 + ' ' + y1 ;
    return area;
}

function getQuerystring(key, default_) {
    if (default_==null) default_="";
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if(qs == null)
        return default_;
    else
        return qs[1];
}

function get_dimx (dimx, default_) {
    if ( dimx == 900 || dimx == 600 || dimx == 500 ) {
        return dimx;
    } else {
        return default_;
    }
}

var myGameList=document.getElementById("selectspiel");
var mySizeList=document.getElementById("selectsize");

// http://127.0.0.1:7681/?game=halma&size=600

game = getQuerystring('game',"muehle");
dimx = get_dimx(getQuerystring('size',900),900);
dimy = dimx;



//if ( game == "halma" ) {
//    myGameList.selectedIndex = 0;
//    window.onload = halmabrett();
//} else {
//    myGameList.selectedIndex = 1;
//    window.onload = muehlebrett();
//}
//
//if ( dimx == 900 ) {
//    mySizeList.selectedIndex = 0;
//} else if ( dimx == 600 ) {
//    mySizeList.selectedIndex = 1;
//} else if ( dimx == 500 ) {
//    mySizeList.selectedIndex = 2;
//}

// http://javascript-today.blogspot.com/2008/07/how-about-quick-debug-output-window.html
var DBG = {
    write : function(txt) {
        if (!window.dbgwnd) {
            window.dbgwnd = window.open("","debug","status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=1,width=600,height=250");
            // window.dbgwnd.document.write('<html><head></head><body style="background-color:black"><div id="main" style="color:green;font-size:12px;font-family:Courier New;"></div></body></html>');
            window.dbgwnd.document.write('<html><head></head><body><div id="main"></div></body></html>');
        }
        var x = window.dbgwnd.document.getElementById("main");
        this.line=(this.line==null)?1:this.line+=1;
        txt=this.line+': '+txt;
        if (x.innerHTML == ""){
            x.innerHTML = txt;
        }
        else {
            // x.innerHTML = txt + "<br/>" + x.innerHTML;
            x.innerHTML = x.innerHTML + txt + "<br/>";
            // window.dbgwnd.document.body.scrollTop =  1000 * window.dbgwnd.innerHeight; // Good
            window.dbgwnd.document.body.scrollTop =  window.dbgwnd.document.body.scrollHeight;
        }
    }
}

function open_debugger() {
    // var myWindow=window.open('','','width=200,height=100')
    // myWindow.document.write("<p>This is 'myWindow'</p>")
    debug = 1;
    DBG.write("This is console output!!" + "<br/>");
    //myWindow.focus()
    return myWindow;
}

function initHalma(dim) {
    brettWidth = dim;
   halmabrett =  halmabrett(brettWidth, brettWidth);
}