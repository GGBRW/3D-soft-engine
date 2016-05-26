var canvas, ctx, info;
window.onload = function() {
    canvas = document.createElement("canvas");
    canvas.height = HEIGHT = window.innerHeight;
    canvas.width = WIDTH = window.innerWidth;
    ctx = canvas.getContext("2d");
    
    info = document.createElement("p");
    info.style.background = "rgba(0,0,0,.5)";
    info.style.padding = "5px";
    info.style.fontFamily = "'Roboto Condensed', Arial";
    info.style.position = "absolute";
    info.style.top = "-16px";
    info.style.left = "0";
    info.style.color = "white";
    
    pscore = document.createElement("p");
    pscore.style.background = "rgba(0,0,0,.5)";
    pscore.style.padding = "5px";
    pscore.style.fontFamily = "'Roboto Condensed', Arial";
    pscore.style.position = "absolute";
    pscore.style.top = "-16px";
    pscore.style.right = "0";
    pscore.style.color = "white";
    
    document.body.style.cursor = "url('cursor.png'), pointer";
    document.body.appendChild(canvas);
    document.body.appendChild(info);
    document.body.appendChild(pscore);
    document.body.style.overflow = "hidden",
    document.body.style.margin = 0;
    document.oncontextmenu = function(e){
        return false;
    }
    
    reader();
}

var HEIGHT, WIDTH;
var FPS = 0;
var FPS_max = 60;
var FOV = 90;
var render_distance = 100;
var fly = true;
var eyeHeight = .6;
var kneeHeight = .2;
var walking_speed = 10;
var runInBackground = false;
var gravity = 0;
var showScore = false;
var score = 0;

var x = 1;

var sky_color = new Color(200,200,200);

var player = {
    x: 0,
    y: 0,
    z: 0,
    angle_h: 0,
    angle_h_sin: 0,
    angle_h_cos: 1,
    angle_v: 0,
    angle_v_sin: 0,
    angle_v_cos: 1,
    velocity_x: 0,
    velocity_y: 0,
    velocity_z: -gravity
}

var objects = [];

var loops = 0, lastVelocityUpdate = new Date, lastInfoUpdate = new Date;
function updateWindow() {
    clear(sky_color);
    
    nodes = 0;
    
    buffer = [];
    for(var i = 0, len = objects.length; i < len; ++i) {
        var t = transform(objects[i].lx,objects[i].ly,objects[i].lz);
        var distance = t.y;
        if(distance > x && distance < render_distance) {
            var j = 0;
            while(j < buffer.length && buffer[j].distance > distance) ++j;
            buffer.splice(j,0,{object: objects[i], distance: distance});
        }
    }
    
    for(var i = 0, len = buffer.length; i < len; ++i) {
        buffer[i].object.draw();
    }
    
    ++loops;
    if(new Date - lastInfoUpdate > 500) {
        lastInfoUpdate = new Date;
        
        FPS = loops * 2, loops = 0;
        updateInfo();
        
        if(showScore) {
            pscore.style.display = "block";
            pscore.innerHTML = "score: " + score;
        } else pscore.style.display = "none";
    }
    if(new Date - lastVelocityUpdate > 10) {
        lastVelocityUpdate = new Date;
        
        player.x += player.velocity_x / 100,
        player.y += player.velocity_y / 100;
        player.z += player.velocity_z / 100;
    }
}

function updateInfo() {
    info.innerHTML = "fps: " + FPS + " fps limit: " + FPS_max + "<br>" + 
    "screen res: " + WIDTH + " x " + HEIGHT + ", FOV: " + FOV + "<br>" +  
    " x: " + Math.round(player.x * 10) / 10 + " y: " + Math.round(player.y * 10) / 10 + " z: " + Math.round(player.z * 10) / 10 + "<br>" + 
    "vx: " + Math.round(player.velocity_x * 10) / 10 + " vy: " + Math.round(player.velocity_y * 10) / 10 + " vz: " + Math.round(player.velocity_z * 10) / 10 + "<br>" +  
    "angle hor: " + Math.round(player.angle_h * 10) / 10 + " angle ver: " + Math.round(player.angle_v * 10) / 10 + "<br>" + 
    "objects: " + objects.length + "<br>" +
    "buffer: " + buffer.length + "<br>" + 
    "berekeningen: " + nodes;
}

var loop = setInterval(updateWindow, round(1000 / FPS_max));