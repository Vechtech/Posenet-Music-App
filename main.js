song1 = "";
song2 = "";
score_right = "";
score_left = "";
leftX = "";
leftY = "";
rightX = "";
rightY = "";
song1_status="";
song2_status="";

function preload(){
    song1 = loadSound("Imagine Dragons - Believer.mp3");
    song2 = loadSound("Marshmello ft. Bastille - Happier (Official Music Video).mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotposes);
}

function modelloaded(){
    console.log("model has loaded successfully");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(score_left>0.2){
        circle(leftX,leftY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Marshmello ft. Bastille - Happier";
        }
    }
    if(score_right>0.2){
        circle(rightX,rightY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Imagine Dragons - Believer";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function s(){
    song1.stop();
    song2.stop();
}