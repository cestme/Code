let handpose;
let video;

let button;
let isCameraOn = true;

let hands = [];

let pinch = 0;
let centerX, centerY;

let ballX = 200;
let ballY = 200;

let eyeHeight = 40;
let decreasing = true;
let changeFrame = 180; // 3秒的帧数（60帧/秒）
let numHairs = 200; // 毛发数量
let circleRadius = 100; // 圆的半径

let carrotImage;
let hand;

let blackballC = 0;
let backgroundC; 
let bgX, bgY, bgZ;
let speedX = speedY = speedZ = 1;
let strokeAlpha = 0;

let bbX,bbY;
let lefteyeballX, righteyeballX, eyeballY;

function preload() {
    // Load the handpose model.
    handpose = ml5.handpose();
    carrotImage = loadImage('carrot.png');
    hand = loadImage('hand.png');
  }




function setup() {
    //createCanvas(640, 480);
    createCanvas(window.innerWidth, window.innerHeight);
    bgX = 0;
    bgY = 0;
    bgZ = 0;

    bbX=width-300;
    bbY=height-300;
    //frameRate(20);
    // Create the webcam video and hide it
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    // start detecting hands from the webcam video
    handpose.detectStart(video, gotHands);

    button = createButton('Toggle Camera');
    button.position(10, 10);
    button.mousePressed(toggleCamera);
  }

  function toggleCamera() {
    if (isCameraOn) {
      video.elt.srcObject = null; // 关闭摄像头
      isCameraOn = false;
    } else {
      video = createCapture(VIDEO);
      video.size(320, 240);
      isCameraOn = true;
    }
  }

function draw() {
    backgroundC = color(bgX,bgY,bgZ);
    background(backgroundC);
    
     translate(width, 0);
     scale(-1, 1);
    //image(video, 0, 0, width, height);
    noStroke();
    fill(0, 255, 255);

    lefteyeballX = bbX+30;
    righteyeballX = bbX - 30;
    eyeballY = bbY-20;


    blackBall(bbX, bbY, eyeHeight);

    widthRate = width/640;
    heightRate = height/480;

    //carrot
    image(carrotImage, ballX, ballY-30);
    carrotImage.resize(100, 100);
  
    // If there is at least one hand
    if (hands.length > 0) {

      // Find the index finger tip and thumb tip
      let finger = hands[0].index_finger_tip;
      let thumb = hands[0].thumb_tip;
  
      // Draw circles at finger positions
       centerX = (finger.x + thumb.x)*widthRate / 2;
       centerY = (finger.y + thumb.y)*heightRate / 2;
      // Calculate the pinch "distance" between finger and thumb
      pinch = dist(finger.x*widthRate, finger.y*heightRate, thumb.x*widthRate, thumb.y*heightRate);    
     //console.log(centerX,centerY);
      

      if (pinch < 30 && ballX - 80 < centerX && centerX < ballX + 80 && ballY - 80 < centerY && centerY < ballY + 80) {
        
        ballX = centerX;
        ballY = centerY;
        
    } 
    image(hand, centerX, centerY);
    hand.resize(80,80);
    }


    //background color
    if (ballX<bbX+200&&ballX>bbX-200&&ballY<bbY+200&&ballY>bbY-200){
      bgX+=3*speedX;
      bgY+=2.5*speedY;
      bgZ+=1*speedZ;
      if(bgX>254 ||bgX<1){
        speedX = -speedX;
      };
      if(bgY>254 ||bgY<1){
        speedY = -speedY;
      };
      if(bgZ>254 ||bgZ<1){
        speedZ = -speedZ;
      };
    
     } else if(centerX<bbX+150&&centerX>bbX-150&&centerY<bbY-50&&centerY>bbY-150){
      bbY= bbY+sin(frameCount * 0.1) * 1;
      blackballC+=1;
      strokeAlpha = 255;
      eyeHeight = 0;
          }
    else{
      bgX-=5;
      bgY-=5;
      bgZ-=5;
      blackballC-=1;
      strokeAlpha = 0;

          //Eyes blink
    if (decreasing && frameCount % changeFrame <= 4) {
      eyeHeight -= 10;
      if (eyeHeight <= 1) {
        decreasing = false;
      }
    }
    
    // 增加eyeHeight
    if (!decreasing ) {
      eyeHeight += 10;
      if (eyeHeight >= 40) {
        decreasing = true;
      }
    }
    }
    bgX = constrain(bgX,0,255);
    bgY = constrain(bgY,0,255);
    bgZ = constrain(bgZ,0,255);
    blackballC = constrain(blackballC, 0, 30);

  }

  function blackBall(blackBallX, blackBallY, eyeHeight) {
  // 绘制圆
  noStroke();
  fill(blackballC);
  ellipse(blackBallX, blackBallY, circleRadius * 2);
  stroke(blackballC);
  
  // 绘制毛发
  for (let i = 0; i < numHairs; i++) {
    let angle = map(i, 0, numHairs, 0, TWO_PI);
    let x = blackBallX + cos(angle) * circleRadius;
    let y = blackBallY + sin(angle) * circleRadius;
    let length = random(5, 15);
    
    let angleOffset = random(-PI/5, PI/5);
    let x2 = x + cos(angle + angleOffset) * length;
    let y2 = y + sin(angle + angleOffset) * length;
    strokeWeight(4);
    line(x, y, x2, y2);
  }
  
  // 绘制眼睛
  fill(255);
  noStroke();
  let eyeY = blackBallY-20;
  let leftEye = ellipse(blackBallX + 40, eyeY, 40, eyeHeight);
  let rightEye = ellipse(blackBallX - 40, eyeY, 40, eyeHeight);
  
  fill(blackballC);
  if(ballX<=bbX-40){
    righteyeballX =  map(ballX, 0, bbX-40, bbX-55, bbX-40);
    lefteyeballX = map(ballX, 0, bbX-40, bbX + 25, bbX + 40);
  }else{
    righteyeballX =  map(ballX, bbX-40, width, bbX-40, bbX-25);
    lefteyeballX = map(ballX, bbX-40, width, bbX + 40, bbX + 55);
  }
if(ballY<=eyeY){
  eyeballY = map(ballY, 0, eyeY, eyeY-15, eyeY);
}else{
  eyeballY = map(ballY, eyeY, height, eyeY, eyeY+15);
}
  
  let leftEyeball = circle(lefteyeballX, eyeballY, 15);
  let rightEyeball = circle(righteyeballX, eyeballY, 15);
  

  //eyes closed
  stroke(0,0,0,strokeAlpha);
  strokeWeight(5);
  noFill();
  // 绘制向上的弧线，参数分别为起点坐标、宽度、高度、起始角度、结束角度、绘制模式（PIE表示绘制实心弧线）
  arc(bbX-40, bbY-20, 40, 30,  PI/10,PI/10*9, OPEN);
  arc(bbX+40, bbY-20, 40, 30,  PI/10,PI/10*9, OPEN);
}

  // Callback function for when handpose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
  }


  //760 470 630 370