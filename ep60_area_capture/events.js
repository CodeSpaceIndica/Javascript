
function addEvents() {
    document.addEventListener("keydown", function(event) {
        isGameOn = true;

        if( event.code == "ArrowUp" ) {
            ballSpeed.x = 0;
            ballSpeed.y = -2;
        }
        else if( event.code == "ArrowRight" ) {
            ballSpeed.x = 2;
            ballSpeed.y = 0;
        }
        else if( event.code == "ArrowDown" ) {
            ballSpeed.x = 0;
            ballSpeed.y = 2;
        }
        else if( event.code == "ArrowLeft" ) {
            ballSpeed.x = -2;
            ballSpeed.y = 0;
        }
    });
}