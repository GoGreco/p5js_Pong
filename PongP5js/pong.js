//variables
  //ball size variables
    let xBall = 300;
    let yBall = 200;
    let dBall = 22;
    let rBall = dBall/2;
    //ball speed variables  
      let xSpeed = 5;
      let ySpeed = 5;
  //bars  
    let barHeight = 110;
    let barWidth = 10;
    //bar1 variables
      let xBar1 = 15;
      let yBar1 = 145;
    //bar2 variables
      let xBar2 = 575;
      let yBar2 = 145;
      let bar2Speed;
      let assist = 0;
  //points variables
    let player1Points = 0;
    let player2Points = 0;
    let yPoints = 50;
    let xPoints1 = 151;
    let xPoints2 = 451;
  //decorations
      //middle rect
      let rectX = 298
      let rectY = 105;
      let rectWidth = 5;
      let rectHeight = 300;
      //sounds
      let barHit;
      let edgeHit;
      let points;
// canvas
  function setup() {
    createCanvas(601, 401);
}
//stuff
  function draw() {
    background(0);
    //ball 
      showBall();
      ballMovement();
    //colision
      borderControl();
      ballBar1Collision();
      ballBar2Collision();
    //bars in general
      showBar(xBar1, yBar1);
      showBar(xBar2, yBar2);
      bar1Movement();
      bar2Movement();
    //points
      showPoints(player1Points,xPoints1,yPoints);
      showPoints(player2Points,xPoints2, yPoints);
      score()
    //decoration
      middeRect();
      pong();
  }
//funtions
  //ball stuff
    //ball
      function showBall(){
      circle(xBall, yBall, dBall);
    }
    //ball movement
      function ballMovement(){
        xBall+= xSpeed;
        yBall += ySpeed;
      }
      function borderControl(){
        if(yBall + rBall > height||yBall - rBall<0){
            ySpeed *=-1;
            edgeHit.play();
        }
      }
      function ballBar1Collision(){
        if (xBall-rBall < xBar1+barWidth&&
            yBall+rBall > yBar1&&
            yBall-rBall < yBar1+barHeight){
          xSpeed *= -1; 
          barHit.play();
        }
      }
      function ballBar2Collision(){
        if (xBall+rBall > xBar2-barWidth&&
            yBall+rBall > yBar2&&
            yBall-rBall < yBar2+barHeight){
          xSpeed *= -1; 
          barHit.play();
        }
      }
  //bar stuff
    //bar 
      function showBar(x, y){
        rect (x, y, barWidth, barHeight);
        }
      //bars Movement
        function bar1Movement(){
          if (keyIsDown (87)){
            yBar1 += -4;
          }
          if (keyIsDown (83)){
            yBar1 += 3;
          }
        }
        function bar2Movement(){
          bar2Speed = yBall - yBar2 - barHeight/2 - 98;
          yBar2 += bar2Speed + assist;
          assistance();
        }
  //point stuff
    function assistance(){
      if(player1Points>=player2Points){
        assist += 5;
        if(assist >= 39){
          assist = 40;
        }
      }else{
        assist-=5;
        if(assist<=-29){
          assist = -30;
        }
      }
    }
    function showPoints(x,y,z){
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text(x,y,z);
    }
    function score(){
      if (xBall-rBall<15){
        player2Points += 1;
        xBall = 300;
        yBall = 200;
        points.play();
      }
      if (xBall+rBall>586){
        player1Points += 1;
        xBall = 300;
        yBall = 200;
        points.play();
      }
    }
  //decorations
    function middeRect(){
      noStroke()
      rect(rectX,rectY, rectWidth, rectHeight)
    }
    function pong(){
      fill (255);
      textSize(65);
      textAlign(CENTER);
      text("PONG", 300, 95);
    }
    function preload(){
      points = loadSound('libraries/sounds/point.wav');
      barHit = loadSound('libraries/sounds/barhit.wav');
      edgeHit = loadSound('libraries/sounds/boardhit.wav');
    }
   