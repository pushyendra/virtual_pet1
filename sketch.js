var dog,happydog,database,foodS, foodStock,dogImage;
function preload()
{
	//load images here
  dogImage = loadImage("dogImg.png")
  happydog = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  foodStock.set(20)

  dog = createSprite(250,250,10,10)
  dog.addImage(dogImage)
  dog.scale = 0.3
}


function draw() {  
background(46,139,87)
if(foodS!== undefined){
  textSize(20);
  fill(255);
  text("Note: press UP ARROW TO feed drogo milk",50,50)
  text("food remaining:",foodS,150,150)


if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydog)
}
// if(keyWentUp(UP_ARROW)){
// dog.addImage(dogImage)
// }

 if(foodS === 0){
 foodS = 20;
 }
 
}
drawSprites();
}


function writeStock(score){
 if(score<=0){
   score = 0;
 }else{
   score = score+1;
 }
  database.ref('/').update({
    Food:score
  }
  )
}

function readStock(data){
  foodS=data.val();
}
