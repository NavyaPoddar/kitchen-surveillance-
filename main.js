cocossd = "";
kitchenvideo = "";
modelstatus = "";
results = [];

function preload() {
    kitchenvideo = createVideo("kitchen.mp4");
    kitchenvideo.hide();
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
}

function startapp() {
    cocossd = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("modelstatus_tag").innerHTML = "Status: Detecting Objects";
}

function modelloaded() {
    console.log("model has loaded");
    modelstatus = true;
    kitchenvideo.loop();
    kitchenvideo.speed(1);
    kitchenvideo.volume(0.2);
}

function draw() {
    image(kitchenvideo, 0, 0, 600, 450);
    if (modelstatus != "") {
        cocossd.detect(kitchenvideo, getresults);
        for (loopvalue = 0; loopvalue < results.length; loopvalue = loopvalue + 1) {
            object_name = results[loopvalue].label;
            object_x = results[loopvalue].x;
            object_y = results[loopvalue].y;
            object_width = results[loopvalue].width;
            object_height = results[loopvalue].height;
            fill("black");
            stroke("black");
            text(object_name, object_x + 15, object_y + 15);
            noFill();
            stroke("black");
            rect(object_x, object_y, object_width, object_height);
        }
    }
}

function getresults(error, arrayresults) {
    if (error) {
        console.error(error);
    } else {
        console.log(arrayresults);
        results = arrayresults;
    }
}