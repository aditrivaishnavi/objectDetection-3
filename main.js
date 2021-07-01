song = "";
status = "";
person = [];

function preload() {
    song = loadSound("mom.mp3");
}
function setup() {
    canvas = createCanvas(380, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 300);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function draw() {
    image(video, 0, 0, 380, 300);
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < person.length; i++) {
            document.getElementById("status").innerHTML = "Status : Person Detected";

            fill(r, g, b);
            percent = floor(person[i].confidence * 100);
            text(person[i].label + " " + percent + "%", person[i].x + 15, person[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(person[i].x, person[i].y, person[i].width, person[i].height);

            if(person[i].label == "person") {
                document.getElementById("baby_found_not_found").innerHTML = "Status: Baby detected";
                song.stop();
                console.log("stop");
            }
            else {
                document.getElementById("baby_found_not_found").innerHTML = "Status: Baby not detected";
                song.play();
                console.log("play");
            }
        }
        if(person.length == 0) {
            document.getElementById("baby_found_not_found").innerHTML = "Status: Baby not detected";
            song.play();
            console.log("play");
        }
    }

}
function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        person = results;
    }
}