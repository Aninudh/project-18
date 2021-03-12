var trexrunning,trex_collided
var Ground;
var cloudImage
var gover;
var obsacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var sun;

function preload()
{
  trexrunning=loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided=loadImage("trexcollided.png");
  Ground=loadImage("ground3.png")
  obstacle1=loadImage("obstacle0.png")
  obstacle2=loadImage("obstacle1.png")
  obstacle3=loadImage("obstacle2.png")
  obstacle4=loadImage("obstacle3.png")
  obstacle5=loadImage("obstacle4.png")
  obstacle6=loadImage("obstacle5.png")
  cloudImage=loadImage("clouds.png")
  gover=loadImage("gameover.png")
  sun=loadImage("sun.png")
}



function setup()
{
  createCanvas(windowWidth,windowHeight)
  
  
  invisibleGround = createSprite(width/2,height-100,width,150); 
  invisibleGround.visible=false;
  
  ground=createSprite(width/2,height-100,width,100)
  ground.addAnimation("ground",Ground)
  ground.x=width/2;
  ground.velocityX=-(6 + 3*score/100);
  //ground.debug=true

  
  ptrex=createSprite(100,height-120,20,60);
  ptrex.addAnimation("trex",trexrunning)
  ptrex.addAnimation("trex_collided",trex_collided)
  ptrex.scale=0.2
  //ptrex.debug=true
  ptrex.setCollider('rectangle',40,-50,600,400)
  
  gameover=createSprite(width/2,height/2)
  gameover.addAnimation("gover",gover)
  gameover.scale=0.7
  gameover.visible=false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}



function draw()
{
  background("skyblue");
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50)
  
  ptrex.velocityY=ptrex.velocityY+0.8
  
  if (gameState===PLAY)
    {
       score = score + Math.round(getFrameRate()/60);
       ground.velocityX = -(6 + 3*score/100);
  
       ptrex.collide(invisibleGround);
       if (ground.x < 0)
       {
         ground.x = ground.width/2;
       }
       if(keyDown("SPACE")  && ptrex.isTouching(ground))
       {
          //jumpSound.play( )
          ptrex.velocityY = -20;
          touches=[];
         jumpSound.play();
       }
      
       if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
      
      if (touches.length>0 && ptrex.isTouching(ground))
      {
        ptrex.velocityY = -15;
        touches=[];
        jumpSound.play();
      }
      spawnobstacle1()
      spawnClouds()
      
      if(obstaclesGroup.isTouching(ptrex) )
      {
         gameState=END; 
        dieSound.play();
       }
  }
  
  if (gameState===END)
    {
      gameover.visible=true;
      
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    ptrex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    ptrex.changeAnimation("trex_collided",trex_collided)
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(gameover)) {      
      reset();
      touches = []
      ptrex.changeAnimation("trex",trexrunning);
    }
    }
  
  
  drawSprites();
}


function spawnobstacle1()
{
  if (frameCount%80===0)
  {
    obstaclea=createSprite(width+100,height-220)
    //obstaclea.debug=true
    obstaclea.setCollider('rectangle',40,-50,600,200)
    var rand=Math.round(random(1,6));
    switch(rand)
      {
        case 1: obstaclea.addImage("obstacle1",obstacle1)
          break;
          
          case 2:obstaclea.addImage("obstacle2",obstacle2)
          break;
          
          case 3:obstaclea.addImage("obstacle3",obstacle3)
          break;
          
          case 4:obstaclea.addImage("obstacle4",obstacle4);
          break;
          
          case 5:obstaclea.addImage("obstacle5",obstacle5);
          break;
          
          case 6:obstaclea.addImage("obstacle6",obstacle6);
          break;
      }
    
    
    obstaclea.velocityX=ground.velocityX
    obstaclea.scale=0.08;
    obstaclea.lifetime=300
    obstaclesGroup.add(obstaclea);
  }
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = ptrex.depth;
    ptrex.depth = ptrex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}


function reset()
{
  
      gameState=PLAY;
      gameState=PLAY;
      gameover.visible = false;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      score=0;
      //ptrex.changeAnimation("trexrunning",trexrunning);
    
  
}