var monkey, monkey_img;
var banana, banana_img;
var obstacle, obstace_img;
var back, back_img
var obstacleGroup;
var foodGroup;
var ground;
var score;


function preload() {
  monkey_img = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  back_img = loadImage("Inkedjungle_LI.jpg");

    
}


function setup() {
  createCanvas(400, 400);
 
 back = createSprite(100, 200, 400, 400)
 back.addImage("background", back_img);
 back.scale = 1.8;
 back.x = back.width/2
 back.velocityX = -10;
 
 monkey = createSprite(100, 360, 10, 10);
 monkey.addAnimation("running", monkey_img);
 monkey.scale = 0.15 
 ground = createSprite(200, 370, 400, 10)
 ground.visible = false;
  
 score = 0;
 
  
 foodGroup = new Group();
 obstacleGroup = new Group();
}

function draw() {
  background(220);

  if(back.x<0) {
    
    back.x = back.width/2;
  }
  
  
  if(keyDown("space") && monkey.y>230) {
    monkey.velocityY = -25;
    
  }
  monkey.velocityY = monkey.velocityY +1.5;
  
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  
  if(foodGroup.isTouching(monkey)){
    
    foodGroup.destroyEach();
    score = score+2;
  }
  
  switch(score){
      
    case 10: monkey.scale = 0.2;
      break;
      case 20: monkey.scale = 0.4;
      break;
      case 30: monkey.scale = 0.6;
      break;
      case 40: monkey.scale = 0.8;
      break;
      default: break;
      
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
    
    monkey.scale = 0.15;
    
    score = 0;
    
  }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 300, 50);
}




function spawnFood() {
 if (frameCount%80 === 0) {
   var banana = createSprite(400, random(120, 200), 10, 10);
   banana.addImage("Banana", banana_img);  
   banana.velocityX = -10;
   banana.scale = 0.05;
   banana.lifetime = 40;
   
   foodGroup.add(banana);
  }
   
}

function spawnObstacles() {
 if (frameCount%300 === 0) {
  obstacle = createSprite(400, 331, 10 ,10);
  obstacle.addImage("Stone", obstacle_img);
  obstacle.scale = 0.2;
  obstacle.velocityX = -10;
  obstacle.lifetime = 40;
   obstacle.setCollider("circle", 0, 0, 175);
  obstacleGroup.add(obstacle);
      
  }
   
  
}