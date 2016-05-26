function botstMetType(type) {
    var i = buffer.length - 1;
    while(buffer[i].distance < 1) {
        if(abs(player.x - buffer[i].object.lx) < buffer[i].object.sx + .3
        && abs(player.y - buffer[i].object.ly) < buffer[i].object.sy + .3
        && buffer[i].object.type.toLowerCase() == type.toLowerCase()) {
            return true;
        }
        --i;
    }
    return false;
}

function Punt(x,y,z,color) {
    this.type = "Punt",
    this.lx = x, this.ly = y, this.lz = z,
    this.color = color,
    this.draw = drawPunt;
}

function Vlak(lx,ly,lz,sx,sy,sz,color,fill) {
    this.type = "Vlak",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.fill = typeof fill == 'undefined' ? false : fill,
    this.draw = drawVlak;
} 

function Kubus(lx,ly,lz,sx,sy,sz,color,fill) {
    this.type = "Kubus",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.fill = typeof fill == 'undefined' ? false : fill,
    this.draw = drawKubus;
} 

function Piramide(lx,ly,lz,sx,sy,sz,color,fill) {
    this.type = "Piramide",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.fill = typeof fill == 'undefined' ? false : fill,
    this.draw = drawPiramide;
}

function Kegel(lx,ly,lz,sx,sy,sz,color) {
    this.type = "Kegel",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.draw = drawKegel;
}

function Cilinder(lx,ly,lz,sx,sy,sz,color) {
    this.type = "Cilinder",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.draw = drawCilinder;
}

function Bol(lx,ly,lz,sx,sy,sz,color) {
    this.type = "Bol",
    this.lx = lx, this.ly = ly, this.lz = lz,
    this.sx = sx, this.sy = sy, this.sz = sz,
    this.color = color,
    this.draw = drawBol;
}

function drawPunt() {
    var t3d = to_3d(this.lx,this.ly,this.lz);
    ctx.beginPath();
    ctx.arc(t3d.x,t3d.y,20 * (1 / transform(this.lx,this.ly,this.lz).y),0,pi * 2);
    ctx.shadowColor = this.color.toRGB();
    ctx.fillStyle = this.color.toRGB();
    ctx.fill();
}

function drawVlak() {
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz).y);
    if(this.fill) {
        ctx.fillStyle = this.color.toRGB();
        ctx.fill();
    } else {
        ctx.strokeStyle = this.color.toRGB();
        ctx.stroke();   
    }
    
}

function drawKubus() {
    ctx.fillStyle = ctx.strokeStyle = this.color.toRGB();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx- this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    
    if(this.fill) {
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz + this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz + this.sz).y);
        ctx.fill();
    }
}

function drawPiramide() {
    ctx.fillStyle = ctx.strokeStyle = this.color.toRGB();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
    ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
    if(this.fill) ctx.fill();
    else ctx.stroke();
    
    if(!this.fill) {
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly + this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx + this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx + this.sx,this.ly +-this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).x,to_3d(this.lx - this.sx,this.ly - this.sy,this.lz - this.sz).y);
        ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
        ctx.stroke();
    }
}

function drawKegel() {
    var b = [];
    for(var r = 0; r < pi * 2; r += pi / 20)
        b.push(to_3d(sin(r) + this.lx,cos(r) + this.ly,this.lz - this.sz));

    ctx.beginPath();
    ctx.moveTo(b[0].x,b[0].y);
    for(var i = 1; i < b.length; ++i) ctx.lineTo(b[i].x,b[i].y);
    ctx.lineTo(b[0].x,b[0].y);
    ctx.strokeStyle = this.color.toRGB();
    ctx.stroke();

    for(var i = 0; i < b.length; ++i) {
        ctx.beginPath();
        ctx.moveTo(b[i].x,b[i].y);
        ctx.lineTo(to_3d(this.lx,this.ly,this.lz + this.sz).x,to_3d(this.lx,this.ly,this.lz + this.sz).y);
        ctx.stroke();
    }
}

function drawCilinder() {
    b = [];
    for(var r = 0; r < pi * 2; r += pi / 20)
        b.push(to_3d(sin(r) + this.lx,cos(r) + this.ly,this.lz - this.sz));

    t = [];
    for(var r = 0; r < pi * 2; r += pi / 20)
        t.push(to_3d(sin(r) + this.lx,cos(r) + this.ly,this.lz + this.sz));

    ctx.beginPath();
    ctx.moveTo(b[0].x,b[0].y);
    for(var i = 1; i < b.length; ++i) ctx.lineTo(b[i].x,b[i].y);
    ctx.lineTo(b[0].x,b[0].y);
    ctx.strokeStyle = this.color.toRGB();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(t[0].x,t[0].y);
    for(var i = 1; i < t.length; ++i) ctx.lineTo(t[i].x,t[i].y);
    ctx.lineTo(t[0].x,t[0].y);
    ctx.stroke();

    for(var i = 0; i < t.length; ++i) {
        ctx.beginPath();
        ctx.moveTo(b[i].x,b[i].y);
        ctx.lineTo(t[i].x,t[i].y);
        ctx.stroke();
    }
}

function drawBol() {
    for(var laag = -1; laag < 1; laag += 2 / 17) {
        c = [];
        for(var r = 0; r < pi * 2; r += pi / 20) {
            var s = sqrt(pow(1,2) - pow(laag,2));
            c.push(to_3d(sin(r) * s + this.lx,cos(r) * s + this.ly,this.lz + laag));
        }

        ctx.beginPath();
        ctx.moveTo(c[0].x,c[0].y);
        for(var i = 1; i < c.length; ++i) ctx.lineTo(c[i].x,c[i].y);
        ctx.lineTo(c[0].x,c[0].y);
        ctx.strokeStyle = this.color.toRGB();
        ctx.stroke();
    }

    for(var laag = -1; laag < 1; laag += 2 / 17) {
        c = [];
        for(var r = 0; r < pi * 2; r += pi / 20) {
            var s = sqrt(pow(1,2) - pow(laag,2));
            c.push(to_3d(sin(r) * s + this.lx,laag + this.ly,cos(r) * s + this.lz));
        }

        ctx.beginPath();
        ctx.moveTo(c[0].x,c[0].y);
        for(var i = 1; i < c.length; ++i) ctx.lineTo(c[i].x,c[i].y);
        ctx.lineTo(c[0].x,c[0].y);
        ctx.stroke();
    }

    for(var laag = -1; laag < 1; laag += 2 / 17) {
        c = [];
        for(var r = 0; r < pi * 2; r += pi / 20) {
            var s = sqrt(pow(1,2) - pow(laag,2));
            c.push(to_3d(laag + this.lx,cos(r) * s + this.ly,sin(r) * s + this.lz));
        }

        ctx.beginPath();
        ctx.moveTo(c[0].x,c[0].y);
        for(var i = 1; i < c.length; ++i) ctx.lineTo(c[i].x,c[i].y);
        ctx.lineTo(c[0].x,c[0].y);
        ctx.stroke();
    }
}