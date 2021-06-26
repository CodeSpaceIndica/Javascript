var ctx;
var width, height;

var imageObject = new Image();
var imageWidth, imageHeight;

var tX, tY;
var sX, sY;

var startDateTime = new Date(2021, 4, 8, 21, 35, 0, 0);
var startEpoch = startDateTime.getTime();
var d = new Date(startEpoch);

var timeLineArr = [];

var backCanvas, bCtx;

var beepArr = [];

var isMute = true;

//ANIMATION FUNCTIONS
function init() {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);

    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height= theCanvas.height;

    tX = -3150;
    tY = -650;
    sX = tX*-1;
    sY = tY*-1;

    ctx.font = "20px Mono";

    imageObject.onload = function() {
        let bp = new Audio("res/sounds/ep30_latlongmap/beep1.mp3");
        beepArr.push(bp);
        bp = new Audio("res/sounds/ep30_latlongmap/beep2.mp3");
        beepArr.push(bp);
        bp = new Audio("res/sounds/ep30_latlongmap/beep3.mp3");
        beepArr.push(bp);
        bp = new Audio("res/sounds/ep30_latlongmap/beep4.mp3");
        beepArr.push(bp);
        bp = new Audio("res/sounds/ep30_latlongmap/beep5.mp3");
        beepArr.push(bp);
        bp = new Audio("res/sounds/ep30_latlongmap/beep6.mp3");
        beepArr.push(bp);

        imageWidth = imageObject.width;
        imageHeight = imageObject.height;

        backCanvas = document.createElement("canvas");
        backCanvas.width = width;
        backCanvas.height = height;
        bCtx = backCanvas.getContext("2d");
        bCtx.translate(tX, tY);
        bCtx.drawImage(imageObject, 0, 0);

        showMap();
    }

    doHTTPGETRequest("res/data/episodes/30_latlongmap/timeline.csv", 
        function(responseStr) {
            createLatLongArray(responseStr);
            imageObject.src = "res/images/episodes/30_latlongmap/WorldMap_IndiaOutline.png";
        },
        function(errorStr) {
            console.log("ERROR GETTING TIMELINE :" + errorStr);
        }
    );

}

function createLatLongArray(timeLineStr) {
    let anArr = timeLineStr.split("\n");
    anArr.forEach(oneEventStr => {
        if( oneEventStr.trim().length > 0 ) {
            let tempArr = oneEventStr.split(",");
            let dateTime = tempArr[0];
            let lat = parseFloat( tempArr[2] );
            let lng = parseFloat( tempArr[3] );
            
            if( typeof timeLineArr[dateTime] === 'undefined' ) {
                timeLineArr[dateTime] = [];
                let latLngPoint = new Point(lat, lng);
                timeLineArr[dateTime].push( latLngPoint );
            }
            else {
                let latLngPoint = new Point(lat, lng);
                timeLineArr[dateTime].push( latLngPoint );
            }
        }
    });
}

function latLongToXY(latitude, longitude) {
    x = (longitude+180)*(imageWidth/360);

    latRad = latitude*Math.PI/180;
    mercN = Math.log( Math.tan( (Math.PI/4)+(latRad/2) ) )
    y = (imageHeight/2)-(imageWidth*mercN/(2*Math.PI))

    return {x, y}
}

function getFormattedDate(epoch) {
    d.setTime(epoch);
    return (d.getDate() < 10 ? "0"+d.getDate() : d.getDate()) + "-" + 
           (d.getMonth()+1 < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1)) + "-" + 
           d.getUTCFullYear() + " " + 
           (d.getHours() < 10 ? "0"+d.getHours() : d.getHours()) + ":" + 
           (d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes());
}

function animatePing(x, y, size) {
    ctx.strokeStyle = "#FFFF00";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Constants.TWO_PI, false);
    ctx.stroke();

    if( size >= 20 ) {
        return;
    }

    requestAnimationFrame( function() {
        animatePing(x, y, size+1 );
    });
}

function showMap() {
    ctx.drawImage(backCanvas, 0, 0);

    let dStr = getFormattedDate(startEpoch);

    ctx.fillStyle = "#444444";
    ctx.beginPath();
    ctx.rect(3, 2, 200, 30);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(dStr, 5, 25);

    bCtx.fillStyle = "#00FF00";
    let points = timeLineArr[dStr];
    if( typeof points !== 'undefined' ) {
        if( !isMute ) {
            let r = parseInt( randomBetween(0, beepArr.length-1) );
            beepArr[r].play();
        }
        points.forEach(aPoint => {
            let xy = latLongToXY( aPoint.x, aPoint.y );
            animatePing(xy.x-sX, xy.y-sY, 1);

            bCtx.beginPath();
            //bCtx.arc(xy.x, xy.y, 1, 0, Constants.TWO_PI, false);
            bCtx.rect(xy.x, xy.y, 2, 2);
            bCtx.fill();
        });
    }

    if( d.getDate() >= 20 && d.getMonth() >= 5 && d.getHours() > 14 ) {
        return;
    }

    startEpoch += 60000;

    setTimeout(showMap, 5);
}

function soundFN() {
    isMute = !isMute;
    if( isMute ) {
        document.getElementById("sndBtn").innerHTML = "&#128266;";
    }
    else {
        document.getElementById("sndBtn").innerHTML = "&#128263;";
    }
}