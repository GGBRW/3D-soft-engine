var abs = Math.abs, 
    round = Math.round, 
    floor = Math.floor, 
    ceil = Math.ceil, 
    min = Math.min, 
    max = Math.max, 
    sqrt = Math.sqrt, 
    random = function(min,max) {
        return Math.random() * (max - min) + min;
    },
    pow = Math.pow, 
    sin = Math.sin, 
    cos = Math.cos, 
    tan = Math.tan, 
    atan2 = Math.atan2, 
    pi = Math.PI;

function ptg(a,b) {
    return sqrt(pow(a,2) + pow(b,2));
}

function transform(x,y,z) {
    var rx = x - player.x, ry = y - player.y, rz = z - player.z - eyeHeight;
    
    var tx = rx * player.angle_h_cos - ry * player.angle_h_sin;
    var ty = rx * player.angle_h_sin + ry * player.angle_h_cos;
    var tz = rz * player.angle_v_cos - ty * player.angle_v_sin;
    var ty = rz * player.angle_v_sin + ty * player.angle_v_cos;
    
    return {
        x: tx,
        y: ty,
        z: tz
    }
}

function to_3d(x,y,z) {
    ++nodes;
    var t = transform(x,y,z);
    return {
        x: WIDTH / 2 - (HEIGHT / (FOV / 45)) * (t.x / t.y),
        y: HEIGHT / 2 - (HEIGHT / (FOV / 45)) * (t.z / t.y)
    }
}

function getDistance(x,y,z) {
    var t = transform(x,y,z);
    var h_distance = sqrt(pow(t.x,2) + pow(t.y,2));
    return sqrt(pow(h_distance,2) + pow(t.z,2));
}