let hexaSketch = function(p) {
let distHexa = 20; //every side of the hexagon
let halfDist = 0.5 * distHexa; //half of each side
let captureWidth = 640;
let captureHeight = 480;

p.setup = function () {
  let hexaCanvas = p.createCanvas(100, 200);
  p.background(255);
  p.noStroke();
}



p.draw = function () {
    p.background(0,1); // alpha mainly for animation
 for (let x = -halfDist; x < p.width + distHexa; x += distHexa) {
    for (let y = -distHexa; y < p.height + halfDist; y += halfDist) {
      //moving on the x axis a whole side each time and on the y half a       //side to draw the hexagons from the write position
      //offsets at beginning and end of canvas for seemless look
      //There are two incidents in which a hexagon should not be drawn
      //one in which it is drawn from the loop's location
      //and one in which it is drawn with an offset from x axis
      if (p.abs(((y / halfDist) % 4)) == 0) {
        hexaDraw (x,y);
      }  else if (p.abs((y / halfDist % 4)) == 2) {
        hexaDraw(x - halfDist, y);
      } 
    }
  }
}

this.hexaDraw = function (xpos,ypos) {
  let randomOffset = p.noise (xpos+p.random(-1,1),ypos+p.random(-2,2)); //for interactive animation
  p.fill (p.lerp(0,255,randomOffset),30,22,12);
  p.beginShape();
  //according to calculation of hexagon's vertices
  p.vertex(xpos,ypos); //x1,y1
  p.vertex (xpos + halfDist, ypos + halfDist); // x2,y2
  p.vertex (xpos+halfDist, ypos+distHexa) // x3,y3
  p.vertex (xpos, ypos + 1.5*distHexa) //x4,y4 
  p.vertex (xpos-halfDist,ypos+distHexa); //x5,y5
  p.vertex (xpos-halfDist, ypos + halfDist); //x6,y6
  p.endShape(p.CLOSE);
  
}
}
new p5(hexaSketch,'hexaCanvasJS');