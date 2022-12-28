var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3
  ghost.debug=false

  doorsGroup=new Group()
  climbersGroup=createGroup()
  blocksGroup=createGroup()
}

function draw() {
  background(200);
  
  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    drawSprites()

    if(keyDown("right")){
      ghost.x+=5
    }
    if(keyDown("left")){
      ghost.x-=5
    }
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY+=0.8
    spawnDoors()
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(blocksGroup.isTouching(ghost)||ghost.y>700){
      gameState="end"
    }
  }
  if(gameState=="end"){
    background("black")
    fill ("white")
    textSize(40)
    text("GAME OVER!!!",170,250)
  } 
}
function spawnDoors(){
  if(frameCount%200==0){
    door=createSprite(200,-100)
    door.velocityY=1
    console.log(frameCount)
    door.addImage(doorImg)
    door.lifetime=800
    doorsGroup.add(door)
    door.x=Math.round(random(100,500))

    climber=createSprite(200,-40)
    climber.velocityY=1
    
    climber.addImage(climberImg)
    climber.lifetime=800
    climbersGroup.add(climber)
    climber.x=door.x

    block=createSprite(200,-35,climber.width-40,2)
    block.velocityY=1
  
    block.lifetime=800
    blocksGroup.add(block)
    block.x=door.x

    ghost.depth=door.depth+1
    
  }
  
}
