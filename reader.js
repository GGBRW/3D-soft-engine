var types = ["PUNT","VLAK","KUBUS","PIRAMIDE","KEGEL","CILINDER","BOL"]

function reader() {
    var obj = document.getElementsByTagName("objects")[0].children;
    console.log(obj);
    for(var i = 0, len = obj.length; i < len; ++i) {
        var type = obj[i].tagName;
        var pos = ("" + obj[i].getAttribute("pos")).match(/(\-?\d+\,){2}\-?\d+/g);
        var size = ("" + obj[i].getAttribute("size")).match(/(\-?\d+\,){2}\-?\d+/g);
        var color = ("" + obj[i].getAttribute("color")).match(/(\-?\d+\,){2}\-?\d+/g);
        if(types.indexOf(type) < 0) {
            throw type + " is not defined";
            continue;
        }
        if(pos == null) {
            throw pos + " is not a valid position";
            continue;
        }
        if(size == null) size = [1,1,1];
        else size = size[0].split(",");
        
        if(color == null) color = [0,0,0];
        else color = color[0].split(",");
        pos = pos[0].split(",");
        
        for(var j = 0; j < 3; ++j) pos[j] = Number(pos[j]);
        for(var j = 0; j < 3; ++j) size[j] = Number(size[j]);
        for(var j = 0; j < 3; ++j) color[j] = Number(color[j]);
        color = new Color(color[0],color[1],color[2]);
        
        var fill = false;
        if(obj[i].getAttribute("fill") == "") fill = true;
        
        if(type == "PUNT") objects.push(new Punt(pos[0],pos[1],pos[2],color));
        else if(type == "VLAK") objects.push(new Vlak(pos[0],pos[1],pos[2],size[0],size[1],size[2],color,fill));
        else if(type == "KUBUS") objects.push(new Kubus(pos[0],pos[1],pos[2],size[0],size[1],size[2],color,fill));
        else if(type == "PIRAMIDE") objects.push(new Piramide(pos[0],pos[1],pos[2],size[0],size[1],size[2],color,fill));
        else if(type == "KEGEL") objects.push(new Kegel(pos[0],pos[1],pos[2],size[0],size[1],size[2],color));
        else if(type == "CILINDER") objects.push(new Cilinder(pos[0],pos[1],pos[2],size[0],size[1],size[2],color));
        else if(type == "BOL") objects.push(new Bol(pos[0],pos[1],pos[2],size[0],size[1],size[2],color));
    }
}