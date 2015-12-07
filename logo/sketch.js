var gridSize = 37.5;
var hsize = 3;
var wsize = 4;
var w = gridSize*(wsize+2);
var h = gridSize*(hsize+2);
var pas = gridSize/50;

var coordx = [];
var coordy = [];

var c = [4];

var bleu;
var jaune;
var magenta;
var blanc;

function setup() {
  colorMode(RGB, 255, 255, 255);
  var cnv = createCanvas(int(w), int(h));
  cnv.parent("logo");
  background(255, 255, 255);
  strokeWeight(2);
  
  frameRate(60);

	c[0] = color(130, 200, 230);
	c[1] = color(255, 201, 52);
	c[2] = color(255, 0, 60);
	c[3] = color(255, 255, 255);


  for(var k = 0 ; k < wsize ; k++){
    coordx[k] = gridSize*(k+1);
  }
  for(var l = 0 ; l < hsize ; l++){
    coordy[l] = gridSize*(l+1);
  }

  textAlign(LEFT, BASELINE);

  bleu = new Agent(coordx[int(random(coordx.length))], coordy[int(random(coordy.length))], c[0], Math.round(gridSize/10), "bleu");
  jaune = new Agent(coordx[int(random(coordx.length))], coordy[int(random(coordy.length))], c[1], Math.round(gridSize/10), "jaune");
  magenta = new Agent(coordx[int(random(coordx.length))], coordy[int(random(coordy.length))], c[2], Math.round(gridSize/10), "rouge");
  blanc = new Agent(coordx[int(random(coordx.length))], coordy[int(random(coordy.length))], c[3], Math.round(gridSize/10+4), "invisible");

  var divtmp = select("#coordWrapper");
  divtmp.style("left", 0+"px").style("width", w+"px").style("height", h+"px");
}

function draw() {

  blanc.run();
  bleu.run();
  jaune.run();
  magenta.run();
  
}

var Agent = function(x, y, c, r, n) {
	var posx;
  var posy;
  var rad;
  var once = false;
  var choice = 0;
  var prev = 0;
  var tmp;
  var col;
  var self = this;
  var name = n;
  var coordP = createP('').id(name).addClass("coords").parent("coordPWrapper");
  
  //console.log(x+" "+y+" "+r);
  
  posx = x;
  posy = y;
  col = color(c);
  rad = r;
  
  //console.log(posx+" "+posy+" "+rad);
	
  this.init = function() {
    if (!once) {
      this.direction();
      //println("INIT : "+choice);
      once = true;
    }
  }

  this.update = function() {
    if (choice === 0 && prev != 3) { 
      posy += pas;
    } else if (choice == 1  && prev != 4) { 
      posy += pas/2; 
      posx -= pas/2;
    } else if (choice == 2 && prev != 5) { 
      posx -= pas;
    } else if (choice == 3 && prev !== 0) { 
      posy -= pas;
    } else if (choice == 4 && prev != 1) { 
      posy -= pas/2;
      posx += pas/2;
    } else if (choice == 5 && prev != 2) { 
      posx += pas;
    } else {
      prev = choice;
      this.direction(); 
    }
    
    if (posx%gridSize === 0 && posy%gridSize === 0) {
      prev = choice;
      this.direction();
    } 
  }

  this.direction = function() {
    //println("direction");
    tmp = int(random(6));
    
     if(tmp === 0){
       if(posy >= gridSize*(hsize+1)){
           this.direction();
       }
     }
     else if(tmp == 1){
       if(posy >= gridSize*(hsize+1) || posx <= gridSize){
           this.direction();
       }
     }
     else if(tmp == 2){
       if(posx <= gridSize){
           this.direction();
       }
     }
     else if(tmp == 3){
       if(posy <= gridSize){
           this.direction();
       }
     }
     else if(tmp == 4){
       if(posy <= gridSize || posx >= gridSize*(wsize+1)){
           this.direction();
       }
     }
     else if(tmp == 5){
       if(posx >= gridSize*wsize){
           this.direction();
       }
     }
     choice = tmp;
  }

  this.display = function() {
    noStroke();
    //stroke(255);
    fill(col);
    ellipse(posx, posy, rad, rad);
    

    if(frameCount%5 == 0){
      coordP.style("color",col)
      coordP.html("("+Math.round(posx)+", "+Math.round(posy)+ ")");
    }
  }

  this.run = function() {
  	
    this.init();
    this.update();
    this.display();
  }
}