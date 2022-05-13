var drag = false;
var dragStartX, dragStartY;

function addEvents(canvasElement) {
    canvasElement.addEventListener("mousedown", function(event) {
        let mouseLoc = getRealMousePosition(event, this);
        dragStart(mouseLoc.x, mouseLoc.y);
    });

    canvasElement.addEventListener("mousemove", function(event) {
        if( drag ) {
            let mouseLoc = getRealMousePosition(event, this);
            dragged(mouseLoc.x, mouseLoc.y);
        }
    });

    canvasElement.addEventListener("mouseup", function(event) {
        drag = false;
    });

    canvasElement.addEventListener("touchstart", function(event) {
        let touchPos = getRealTouchLocation(event, this);
        dragStart(touchPos.x, touchPos.y);

        event.preventDefault();
    });

    canvasElement.addEventListener("touchmove", function(event) {
        if( drag ) {
            let touchPos = getRealTouchLocation(event, this);
            dragged(touchPos.x, touchPos.y);
        }

        event.preventDefault();
    });

    canvasElement.addEventListener("touchend", function(event) {
        drag = false;    
    });
}

function dragStart(mtX, mtY) {
    dragStartX = mtX;
    dragStartY = mtY;

    drag = true;
}

function dragged(mtX, mtY) {
    let xSpeed = (mtX - dragStartX) / 100;
    let ySpeed = (mtY - dragStartY) / 100;

    points.forEach(point3d => {
        point3d.rotateX(xSpeed);
        point3d.rotateY(ySpeed);
    });

    dragStartX = mtX;
    dragStartY = mtY;
}