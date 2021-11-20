
//var

var ground
var trex,trex_running;
var edges;
var ground_img;
var invisible_ground
var cloud;
var clouimg;
var mark = 165;
var input,heading;
var obstacle;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score 
var cloudsGroup,obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Fpreload 

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
}

//Fsetup

function setup(){

    createCanvas(600,200) 
  
    //create a trex sprite
    
    trex = createSprite(50,180,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5
    
    edges = createEdgeSprites();

    //Creating ground
    ground = createSprite(200,180,400,20)
    ground.addImage("ground",ground_img)

    //creating invisible ground
    invisible_ground = createSprite(200,190,400,20)
    invisible_ground.visible = false
    
    //initial score should be zero
    score = 0;

    //Creating groups
    cloudsGroup = new Group();
    obstaclesGroup = new Group();
}

function draw(){
   background(180);
    
        
    if (gameState === PLAY){

    //space button   
    if(keyDown("space") && trex.y>=153){
    trex.velocityY = -9;
          
     }

    //score increament
    score= score+Math.round(frameCount/60);
          
    //trex gravity
    trex.velocityY= trex.velocityY + 0.5;

    //ground movement
    ground.velocityX=-4

    // infinite ground
   
    if (ground.x<0  ){
    ground.x=ground.width/2
    }
     
    spawnClouds()
    spawnObstacles()

    //changing the state 
    if(obstaclesGroup.isTouching(trex)){
    gameState = END;
        


    }

     
    }else if (gameState === END){

    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0)
      

    }
    //collide of trex
    trex.collide(invisible_ground);
    
   
    
   //displaying the score 
   
    text("SCORE ="+score,500,50);
  

    drawSprites()

    }

function spawnClouds(){


  if(frameCount % 60 === 0  ){
    cloud = createSprite(600,100,40,10)
    cloud.velocityX= -3
    cloud.addImage("cloud",cloudimg)
    cloud.scale= 0.5
    cloud.y =Math.round(random(10, 120 ))
    cloud.depth = trex.depth
    trex.depth= trex.depth+1  ;

    cloud.lifetime = 200;
    
    cloudsGroup.add(cloud)
   
  }
    
  
}
function spawnObstacles(){


  if (frameCount % 60 === 0) {
  obstacle = createSprite(600,165,20,20)
  obstacle.velocityX = -5
  obstacle.scale = 0.5  
  obstacle.lifetime= 150;

  //generating random obstacles
  
  var r = Math.round(random(1,6))
  switch(r){

  case 1: obstacle.addImage("obs1",ob1);
  break;
  case 2: obstacle.addImage("obs2",ob2);
  break;
  case 3: obstacle.addImage("obs3",ob3);
  break;
  case 4: obstacle.addImage("obs4",ob4);
  break;
  case 5: obstacle.addImage("obs5",ob5);
  break;
  case 6: obstacle.addImage("obs6",ob6);
  break;
  default:break;
  
}
  //adding obsctacle sprite in the group
  obstaclesGroup.add(obstacle);


}

}