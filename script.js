//
//Copyright (c) 2014, Priologic Software Inc.
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//POSSIBILITY OF SUCH DAMAGE.
//
var selfEasyrtcid = "";
var participants;
var roomOwner;
var isOwner = false;


function executeAction(who, msgType, options) {
   // console.debug('exec action', who, msgType, options);
    if (msgType == 'message') {
        if (options.action == 'chat') {
          //  console.debug('executeAction', options);
            var sender = options.who ? options.who : who;
            var d = new Date();
            var time = '', h = d.getHours(), i = d.getMinutes(), s = d.getSeconds();
            h < 10 ? time += '0' : '';
            time += h + ':';
            i < 10 ? time += '0' : '';
            time += i + ':';
            s < 10 ? time += '0' : '';
            time += s;

            $('#conversation').append('<div class="message"><span class="' + sender + '">' + sender + ' ' + time + '</span> "' + options.message + '"</div>');
            $("#conversation").animate({ scrollTop: $('#conversation')[0].scrollHeight}, 1000);
            return;
        }
        if (!halmabrett || ! halmabrett.getById) {
            return;
        }
        var circle = halmabrett.getById(options.id);
        if (circle) {
            var compFactor = scaleFactor / options.scaleFactor;
            if (options.action == 'move') {
                circle.attr({'cx' : options.left * compFactor, 'cy' : options.top * compFactor} );
            } else if (options.action == 'start') {
                circle.animate({r:  Math.round(options.steinDmr*compFactor), opacity:.5}, 500, ">");
            } else if (options.action == 'stop') {
             //   console.debug('steinDmr', options.steinDmr, compFactor);
                var anim = Raphael.animation({r: Math.round(options.steinDmr*compFactor), opacity:1}, 2e3).repeat(5);
                circle.animate(anim, 100, ">");
            }
        }
    } else if (msgType == 'brettSync') {
        brettSyncExecute(who, options);
      //  circle.attr({'cx' : options.left * compFactor, 'cy' : options.top * compFactor} );
//        $('#canvas_container .brick').each( function(){
//            var brick = $(this);
//            // console.debug('brick', brick);
//        });
    }
}

function brettSyncExecute(who, options) {
    //console.debug('brettSync execute', who, options);
    if (!halmabrett || ! halmabrett.getById) {
        return;
    }
    var compFactor = scaleFactor / options.scaleFactor;
   for (var raphaelId in options.positions) {
       var pos = options.positions[raphaelId];
        var circle = halmabrett.getById(raphaelId);
      // console.debug('sync circle', pos, compFactor );
       circle.attr({'cx' : pos.cx * compFactor, 'cy' : pos.cy * compFactor} );

   }

}

function connect(stunServerUrl) {
    easyrtc.setSocketUrl(stunServerUrl);
    easyrtc.setPeerListener(executeAction);
    easyrtc.setRoomOccupantListener(roomListener);
    easyrtc.connect("easyrtc.chtest", loginSuccess, loginFailure);

}

function syncBrett(options) {
    //console.debug('syncBrett order initiated');
    for(var easyrtcid in participants) {
         syncPositions(easyrtcid, options);
    }
}
function broadcast(options) {
    for(var easyrtcid in participants) {
         sendPosition(easyrtcid, options);
    }
}

function roomListener (roomName, occupants, me) {
    //console.debug('rroomlistener - others', occupants) ;
    //console.debug('rroomlistener - me', me) ;
    participants = occupants;
    //console.debug('connect', roomName, occupants);
    var otherClientDiv = document.getElementById("otherClients");
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }

     var _roomOwner = me;
     var _meIsOwner = true;
     for(var easyrtcid in occupants) {
        var participantDiv = $('<div class="participant"></div>');
        participantDiv.html('<span>online: ' + easyrtc.idToName(easyrtcid) + '</span>');
        $(otherClientDiv).append(participantDiv);
        if (occupants[easyrtcid].roomJoinTime < me.roomJoinTime) {
            _roomOwner = occupants[easyrtcid];
            _meIsOwner = false;
        }

    }
    roomOwner = _roomOwner;
    isOwner = _meIsOwner;

    //console.debug('roomOwner is' , roomOwner, isOwner);
    if( !otherClientDiv.hasChildNodes() ) {
        otherClientDiv.innerHTML = "<em>Nobody else logged in to talk to...</em>";
    }
    if (isOwner) {
        halmabrettSync();
    }
}


function syncPositions(otherEasyrtcid, options) {
    easyrtc.sendDataWS(otherEasyrtcid, "brettSync",  options);
}

function sendPosition(otherEasyrtcid, options) {
    easyrtc.sendDataWS(otherEasyrtcid, "message",  options);
}


//function loginSuccess(easyrtcid) {
//    selfEasyrtcid = easyrt
//    if(text.replace(/\s/g, "").length === 0) { // Don"t send just whitespace
//        return;
//    }
//    easyrtc.sendDataWS(otherEasyrtcid, "message",  text);
//    executeAction("Me", "message", text);
//    //document.getElementById("sendMessageText").value = "";
//}

function loginSuccess(easyrtcid, roomOwner) {
    selfEasyrtcid = easyrtcid;
    //console.debug('connect me ', arguments);
    document.getElementById("iam").innerHTML = "I am " + easyrtcid;
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}

function addChatMessage(message, who) {
    var options = { action:'chat', 'message' : message , who : who};
    broadcast(options);
    $('#chat-input').val('');
    executeAction( who ? who : 'ich', "message", options);
}

function initChat() {
    $('#chat-input').keyup(function(e) {
        if (e.keyCode == 13) {
            var name = $('#myname').val();
            addChatMessage($('#chat-input').val(), name.trim() != '' ? name : null);
        }
      //  console.debug(e.keyCode);
    })
}


$(document ).ready(function() {
    var viewPortW = $( document ).width();
    var viewPortH = $( document ).height();
    var dim = viewPortW > viewPortH ?  viewPortH * .9 : viewPortW * .9;
    initHalma(dim);
    initChat();
});