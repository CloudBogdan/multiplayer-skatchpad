const
    cvs = document.querySelector("canvas"),
    ctx = cvs.getContext("2d");
cvs.width = innerWidth;
cvs.height = innerHeight;

const socket = io.connect();

let
    cursors = [],
    is_pressed = false;
const pixel_size = 4;

socket.on("move", data=> {

    // Is online
    document.querySelector(".online-counter").innerText = `Online: ${ cursors.length }`;

    // Draw
    cursors.map(cursor=> {
        
        if (!cursor) return;
        
        ctx.fillRect(Math.round((cursor.x) / pixel_size) * pixel_size - pixel_size / 2, Math.round((cursor.y) / pixel_size) * pixel_size + 2, pixel_size, pixel_size);

    });


    // Cursors control
    if (!!cursors.find(cursor=> cursor.id === data.id)) { // If cursor exists...
        
        cursors = [...new Set(cursors)];
        cursors = cursors.map(()=> data);
        
    } else { // If cursor doesn't exists...
        cursors.push(data);
    }
    
});

onpointerdown = ()=> {
    is_pressed = true;
}
onpointerup = ()=> {
    is_pressed = false;
}
onpointermove = e=> {

    if (!is_pressed) return;
    
    socket.emit("move", {
        x: e.clientX, y: e.clientY
    });
    
}