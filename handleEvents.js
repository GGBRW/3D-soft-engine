window.onresize = function() {
    canvas.height = HEIGHT = window.innerHeight;
    canvas.width = WIDTH = window.innerWidth;
}
window.onblur = function() { 
    if(!runInBackground) {
        clearInterval(loop);
        ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
window.onfocus = function() { 
    if(!runInBackground) 
        loop = setInterval(updateWindow, round(1000 / FPS_max)); 
}

var paused = false;

var keysdown = {87: false, 65: false, 83: false, 68: false, 16: false, 32: false};
document.addEventListener("keydown",function(e) {
    switch(e.which) {
        case 87:
            if(!keysdown[87]) 
                player.velocity_x += walking_speed * player.angle_h_sin,
                player.velocity_y += walking_speed * player.angle_h_cos;
            if(e.ctrlKey) 
                player.velocity_x += walking_speed * player.angle_h_sin,
                player.velocity_y += walking_speed * player.angle_h_cos;
            keysdown[87] = true;
            break;
        case 65:
            if(!keysdown[65])
                player.velocity_x += walking_speed * player.angle_h_cos,
                player.velocity_y -= walking_speed * player.angle_h_sin;
            keysdown[65] = true;
            break;
        case 83:
            if(!keysdown[83])
                player.velocity_x -= walking_speed * player.angle_h_sin,
                player.velocity_y -= walking_speed * player.angle_h_cos;
            keysdown[83] = true;
            break;
        case 68:
            if(!keysdown[68])
                player.velocity_x -= walking_speed * player.angle_h_cos,
                player.velocity_y += walking_speed * player.angle_h_sin;
            keysdown[68] = true;
            break;
        case 32:
            if(!keysdown[32] && fly) player.velocity_z += 5;
            keysdown[32] = true;
            break;
        case 16:
            if(!keysdown[16] && fly) player.velocity_z -= 5;
            keysdown[16] = true;
            break;
        case 27:
            if(!paused) {
                clearInterval(loop);
                ctx.fillStyle = "rgba(255,255,255,.8)";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                paused = true;
            }
            else 
                loop = setInterval(updateWindow, round(1000 / FPS_max)),
                paused = false;
            break;
    }
});

document.addEventListener("keyup",function(e) {
    switch(e.which) {
        case 87:
            if(keysdown[87])
                player.velocity_x -= walking_speed * player.angle_h_sin,
                player.velocity_y -= walking_speed * player.angle_h_cos;
            keysdown[87] = false;
            break;
        case 65:
            if(keysdown[65])
                player.velocity_x -= walking_speed * player.angle_h_cos,
                player.velocity_y += walking_speed * player.angle_h_sin;
            keysdown[65] = false;
            break;
        case 83:
            if(keysdown[83])
                player.velocity_x += walking_speed * player.angle_h_sin,
                player.velocity_y += walking_speed * player.angle_h_cos;
            keysdown[83] = false;
            break;
        case 68:
            if(keysdown[68])
                player.velocity_x += walking_speed * player.angle_h_cos,
                player.velocity_y -= walking_speed * player.angle_h_sin;
            keysdown[68] = false;
            break;
        case 32:
            if(keysdown[32] && fly) player.velocity_z -= 5;
            keysdown[32] = false;
            break;
        case 16:
            if(keysdown[16] && fly) player.velocity_z += 5;
            keysdown[16] = false;
            break;
        case 73:
            if(info.style.display != "none") info.style.display = "none";
            else info.style.display = "block";
            break;
    }
});

var mouse = {x: 0, y: 0};

function mousemove(e) {
    var dx = e.x - mouse.x, dy = e.y - mouse.y;
    if(keysdown[87])
        player.velocity_x -= walking_speed * player.angle_h_sin,
        player.velocity_y -= walking_speed * player.angle_h_cos;
    if(keysdown[65])
        player.velocity_x -= walking_speed * player.angle_h_cos,
        player.velocity_y += walking_speed * player.angle_h_sin;
    if(keysdown[83])
        player.velocity_x += walking_speed * player.angle_h_sin,
        player.velocity_y += walking_speed * player.angle_h_cos;
    if(keysdown[68])
        player.velocity_x += walking_speed * player.angle_h_cos,
        player.velocity_y -= walking_speed * player.angle_h_sin;
    
    if(dx < 0) {
        player.angle_h = (player.angle_h - dx / 200) % (pi * 2);
        player.angle_h_sin = sin(player.angle_h);
        player.angle_h_cos = cos(player.angle_h);
    } else {        
        player.angle_h = (pi * 2 + player.angle_h - dx / 200) % (pi * 2);
        player.angle_h_sin = sin(player.angle_h);
        player.angle_h_cos = cos(player.angle_h);
    }
    
    if(keysdown[87])
        player.velocity_x += walking_speed * player.angle_h_sin,
        player.velocity_y += walking_speed * player.angle_h_cos;
    if(keysdown[65])
        player.velocity_x += walking_speed * player.angle_h_cos,
        player.velocity_y -= walking_speed * player.angle_h_sin;
    if(keysdown[83])
        player.velocity_x -= walking_speed * player.angle_h_sin,
        player.velocity_y -= walking_speed * player.angle_h_cos;
    if(keysdown[68])
        player.velocity_x -= walking_speed * player.angle_h_cos,
        player.velocity_y += walking_speed * player.angle_h_sin;
    
    if(dy < 0 && player.angle_v < pi / 2) player.angle_v = player.angle_v - dy / 200;
    else if(dy > 0 && player.angle_v > -(pi / 2)) player.angle_v = player.angle_v - dy / 200;
    player.angle_v_sin = sin(player.angle_v);
    player.angle_v_cos = cos(player.angle_v);
    
    mouse.x = e.x, mouse.y = e.y;
}

document.addEventListener("mousedown", function(e) {
    mouse.x = e.x, mouse.y = e.y;
    document.addEventListener("mousemove", mousemove);
});

document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", mousemove);
});