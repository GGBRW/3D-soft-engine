function Color(r,g,b) {
    this.r = r, this.g = g, this.b = b,
    this.toHex = function() { return "#" + ("0" + this.r.toString(16)).slice(-2) + ("0" + this.g.toString(16)).slice(-2) + ("0" + this.b.toString(16)).slice(-2) },
    this.toRGB = function() { return "rgb(" + this.r + "," + this.g + "," + this.b + ")" },
    this.changeBrightness = function(lum) {
        var r = Math.round(Math.min(Math.max(0, this.r + (this.r * lum)), 255)),
        g = Math.round(Math.min(Math.max(0, this.g + (this.g * lum)), 255)),
        b = Math.round(Math.min(Math.max(0, this.b + (this.b * lum)), 255));
        return new Color(r,g,b);
    };
}

function clear(color) {
    typeof color == 'undefined' ? ctx.fillStyle = "white" : ctx.fillStyle = color.toHex();
    ctx.fillRect(0,0,WIDTH,HEIGHT);
}

function line(x1,y1,x2,y2,color) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    if(typeof color != 'undefined') ctx.strokeStyle = color;
    ctx.stroke();
}