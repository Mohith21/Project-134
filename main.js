song = "";
status = "";
objects = [];

function preload() {
    song = loadSound("alarm_audio.mp3");
}

function setup() {
    canvas = createCanvas(500, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 300);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 500, 300);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i <  objects.length; i++) {
            document.getElementById("status").innerHTML = "Status - Objects Detected";
            document.getElementById("nob").innerHTML = "Number Of Objects Detected Are:" + objects.length;
            fill(r, g, b);
            accuracy = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + accuracy + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("nob").innerHTML = "Baby Found";
                song.stop();
            }
            else {
                document.getElementById("nob").innerHTML = "Baby Not Found";
                song.play();
            }
        }
    }
}