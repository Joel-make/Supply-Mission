var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState = 0;
var PLAY =0;
var END=1;
var backgroundIMG
function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png");
	backgroundIMG=loadImage("background.jpg");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(150, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(150, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

    ground1Sprite=createSprite(width/2, height-20, width,10);
	ground1Sprite.shapeColor=color(255)

	groundSprite=createSprite(width/2, height-5, width,10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(150 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundIMG);
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if(gameState=== 0)
{
  keyPressed();  
}
if(packageSprite.y>619)
{
  helicopterSprite.velocityX=0;
  gameState=1;
}
if(packageSprite.x<300 && packageSprite.y>619)
{
 fill("red");
 textSize(50);
 textFont("Algerian");
 text("MISSION FAILED",width/3-50 ,height/2);
 gameState=1;
}
else
 if(packageSprite.x > 290 && packageSprite.y >619 && packageSprite.x < 500 && packageSprite.y >619)
{
	fill("lightgreen");
	textSize(50);
	textFont("Algerian");
	text("MISSION PASSED",width/3-50 ,height/2);
	gameState=1;
}
console.log(packageSprite.x);
if(packageSprite.x>500 && packageSprite.y>619)
{
 fill("red");
 textSize(50);
 textFont("Algerian");
 text("MISSION FAILED",width/3-50 ,height/2);
 gameState=1;
}

  drawSprites();
  
  
 
}
function keyPressed ()
{
  if(keyCode ===  LEFT_ARROW)
  {
    helicopterSprite.velocityX=-2;
	Matter.Body.translate(packageBody,{x:-2,y:0})
  }
  if(keyCode ===  RIGHT_ARROW)
  {
    helicopterSprite.velocityX=2;
	Matter.Body.translate(packageBody,{x:+2,y:0})
  }
  if(keyCode ===  DOWN_ARROW)
  {
    Matter.Body.setStatic(packageBody,false);
  }
}