let eyeSketch = function (p) {

let video;
let poseNet;
let poses = [];
let leftEye;
let rightEye;
let captureWidth = 640;
let captureHeight = 480;
    let options = {
  video: {
     
      facingMode: {
       exact: "user"
     }
  }
};



p.setup = function () {
    let eyeCanvas = p.createCanvas(500, 150);
    video = p.createCapture(options);
    video.size(captureWidth,captureHeight);
    poseNet = ml5.poseNet(video, p.modelReady);
    poseNet.on("pose", function(results) {
        poses = results;
      });
    video.hide();
    rightEye = p.createVector(p.width/2,p.height/2);
    leftEye = p.createVector(p.width/2,p.height/2);
  }

  p.modelReady = function () {
    p.select("#status").html("PoseNet model Loaded.");
  }
 
p.draw = function () {
    p.clear();
    if (poses.length > 0) {
        let pose = poses[0].pose;
        rightEye.y = pose["rightEye"].y;
        rightEye.x = captureWidth - pose["rightEye"].x;
        leftEye.y = pose["leftEye"].y;
        leftEye.x = captureWidth - pose["leftEye"].x;
    }
    let eyeDiameter = p.height;
    p.eyeDraw (2*p.width/8,p.height/2,rightEye.x,rightEye.y,eyeDiameter);
    p.eyeDraw (6*p.width/8,p.height/2,leftEye.x,leftEye.y,eyeDiameter);
    
    
  }
  
   
  p.eyeDraw = function (xpos,ypos,eyeX,eyeY, radius) {
    //draws an eye based on the xpos, ypos and radius of the biggest ellipse
    p.fill(255);
    p.strokeWeight(1.5);
    p.ellipse (xpos,ypos, radius,radius);
    p.fill('black');
    //maps mousex and mousey so black ellipse will stay within the eyeball
    let blackEllipseX = p.map(eyeX,0, captureWidth, xpos-(radius/8), xpos+(radius/8), true);
    let blackEllipseY = p.map(eyeY,0,captureHeight, ypos-(radius/8),ypos+(radius/8), true);
    p.ellipse (blackEllipseX,blackEllipseY,5*radius/8,5*radius/8);
    p.fill('white');
    //maps mousex and mousey for white ellipse so it'll stay within eyeball
    let whiteEllipseX = p.map(eyeX, 0, captureWidth, xpos-(radius/2-radius/5), xpos+(radius/2-radius/5), true);
    let whiteEllipseY = p.map(eyeY,0,captureHeight, ypos-(radius/2-radius/5),ypos+(radius/2-radius/5), true);
    p.ellipse (whiteEllipseX,whiteEllipseY,radius/8,radius/8);
    
  }
}
new p5(eyeSketch, 'eyeCanvasJS');
