var mario , marioImg;
var ground ,groundImg, invisibleGround;
var cloudImg;
var enemyImg;
var enemy;
var coinsImg;
var marioDeadImg;
var coinCount = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var gameOver, restart;
var gameOverImg,restartImg;

var life = 3
var score = 0


function preload(){
   marioImg = loadAnimation("mario1.png","mario2.png");
  marioDeadImg = loadAnimation("mario_dead.png")
  
   groundImg = loadImage("ground.png");
  
  cloudImg = loadImage("cloud.png");
  
  enemyImg = loadImage("enemy1.png","enemy2.png");
  
  pipeImg = loadImage("pipes.png");
  
  coinsImg = loadImage("coin.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
  

  
}

function setup (){
  createCanvas(1200,400);
  mario = createSprite(50,335,10,10);
  mario.addAnimation("mario",marioImg) 
  mario.addAnimation("marioDead",marioDeadImg);
  mario.scale = 0.25
  
  ground = createSprite(600,390,1200,10);
  ground.addImage(groundImg);
  ground.velocityX = -5
  
  invisibleGround = createSprite(600,375,1200,10);
  
  invisibleGround.visible = false

  pipesGroup = new Group();
  
   cloudGroup = new Group();
  
   enemyGroup = new Group();
  
  coinsGroup = new Group();
  
  restart = createSprite(1100,40,10,10);
  gameOver = createSprite(620,150,10,10);
  
  restart.addImage(restartImg);
  gameOver.addImage(gameOverImg);
  
  restart.scale = 0.25
  gameOver.scale = 0.25
  
  restart.visible = false
  gameOver.visible = false
  
  


  
}
function draw () {
  
  background("cyan");
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60)
  
  
  
  if (keyDown("space")&&mario.isTouching(ground)){
      mario.velocityY = -20
    
      }
  mario.velocityY = mario.velocityY + 1
  mario.collide(invisibleGround);
  
  if (ground.x<0){
    ground.x = 600 ;
  }
  spawnClouds();
  
  
 spawnEnemy();
  
  spawnPipes();
  
  spawnCoins();
  
  
  
  /*if(enemyGroup.isTouching(mario)){
    life = life - 1
    gameState = PLAY
    
  }
    
    if(life<= 0){
      gameState = END
    }*/
    for(var i = 0;i<enemyGroup.length;i++){
        if(enemyGroup.isTouching(mario)){
          life = life -1
          enemyGroup.get(i).destroy();
        }
        }
    if(life <= 0){
      gameState = END;
    }
    
    for(var i = 0;i<pipesGroup.length;i++){
        if(pipesGroup.isTouching(mario)){
          mario.y = 250
        }
        }
    
    for(var i = 0;i<coinsGroup.length;i++){
      if(coinsGroup.isTouching(mario)){
    coinCount = coinCount +1
    coinsGroup.get(i).destroy();
  }
    }
  
  }
  else if(gameState === END){
    ground.velocityX = 0
  mario.velocityY = 0
    mario.changeAnimation("marioDead",marioDeadImg);
  cloudGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    pipesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    cloudGroup.setLifetimeEach(-1);
    pipesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    gameOver.visible = true
    restart.visible = true
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    enemyGroup.destroyEach();
    
  }
  
  drawSprites();
  fill("black")
  textSize(20);
  textFont("Comic Sans MS");
  
  if(life>=0){
    text("LIFE: "+life,20,50);
  }
  
  
  
  text("COIN COUNT: "+coinCount,20,80);
  
  text("SCORE: "+ score, 20,100);
  
}
function spawnClouds (){
  if (frameCount % 60 ===0){
    var cloud = createSprite(1200,50,10,10);
    cloud.y = Math.round(random(50,150))
    cloud.addImage(cloudImg);
    cloud.scale = 1.4 ;
    cloud.velocityX = -5
    
    cloud.lifetime = 280 ;
    
    cloud.depth = mario.depth ;
    mario.depth = mario.depth + 1 ;
    
    cloudGroup.add(cloud);
    
  }
  
}
function spawnEnemy(){
    if (frameCount % 60 ===0){
      var enemy = createSprite(50,335,10,10);
      enemy.x = Math.round(random(100,1000))
      enemy.addImage(enemyImg);
      enemy.velocityX = -5
      enemy.scale = 0.1
      enemy.lifetime = 280
      
       enemyGroup.add(enemy);
      
    }
    
  }
function spawnPipes(){
  if (frameCount % 60 === 0){
    var pipes = createSprite(1200,320,10,10);
      //pipes.x = Math.round(random(100,1000))
      pipes.addImage(pipeImg);
      pipes.velocityX = -5
      pipes.scale = 0.5
      pipes.lifetime = 280
      pipes.depth = mario.depth
      mario.depth = mario.depth +1
    
     pipesGroup.add(pipes);
    
  }
  
}


function spawnCoins(){
  if (frameCount % 100 === 0){
    var coins = createSprite(1200,200,10,10);
    coins.y = Math.round(random(100,240))
    coins.addImage(coinsImg);
    coins.velocityX = -5
    coins.lifetime = 500
    coinsGroup.add(coins);
    
  }
}


function reset(){
  gameState = PLAY
  
  gameOver.visible = false
  restart.visible = false
  
  pipesGroup.destroyEach();
  coinsGroup.destroyEach();
  enemyGroup.destroyEach();
  cloudGroup.destroyEach();
  
  mario.changeAnimation("mario",marioImg)
  
  life = 3
  coinCount = 0
  score = 0
  
  
}

