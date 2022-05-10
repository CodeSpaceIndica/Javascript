var drag = false;
var dragStartX, dragStartY;
var mX, mY;

function addEvents(canvasElement) {
    canvasElement.addEventListener("mousedown", function(event) {
        mouseLoc = getRealMousePosition(event, canvasElement);
        dragStartX = mouseLoc.x;
        dragStartY = mouseLoc.y;
        mX = mouseLoc.x;
        mY = mouseLoc.y;

        drag = true;
    });

    canvasElement.addEventListener("mousemove", function(event) {
        if( drag ) {
            mouseLoc = getRealMousePosition(event, canvasElement);
            mX = mouseLoc.x;
            mY = mouseLoc.y;

            let xSpeed = (mX - dragStartX) / 100;
            let ySpeed = (mY - dragStartY) / 100;

            points.forEach(point3d => {
                point3d.rotateX(xSpeed);
                point3d.rotateY(ySpeed);
            });
            attract();

            dragStartX = mX;
            dragStartY = mY;
        }
    });

    canvasElement.addEventListener("mouseup", function(event) {
        drag = false;
    });
}