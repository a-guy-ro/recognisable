let flagSketch = function(p) {
    let yoff = 0;
    let mountainY = [];
    let mountainX = [];
    let trend // true = ascending ;false = decending;
    let localMaxDef = 2; //definition of local max in terms of amount of peaks

p.setup = function () {
    p.frameRate(30);
  let flagCanvas = p.createCanvas(300, 200);
  //flagCanvas.parent('flagCanvasJS');
  p.background(0, 0, 200);
  landscape();
  landscapeDraw();
  peakFinder();
}

p.draw = function draw() {
    p.background(255);
  //getting last vector from the last landscape for smoother animation
  let lastVertex = p.createVector(mountainX[0], mountainY[0]);
  //emptying both arrays before next cycle
  mountainY = [];
  mountainX = [];
  landscape();
  landscapeDraw();
  peakFinder();
  // background(220);
}

this.landscape = function() {
  //based P5.js noise wave only instead pushing x and y to two         
  //different arrays - https://p5js.org/examples/math-noise-wave.html
  let xoff = 0; // Option #1: 2D Noise

  for (let x = 0; x <= p.width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = p.map(p.noise(xoff, yoff), 0, 1,p.height/3, p.height);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    mountainY.push(y);
    mountainX.push(x);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  yoff += 0.01;
  mountainY.push(p.height);
  mountainX.push(p.width);
  mountainY.push(p.height);
  mountainX.push(0);
}


this.peakFinder = function () {
  if (p.height - mountainY[0] >= p.height - mountainY[1]) {
    //height - y in order to get actual peak and not inverted
    //checking whether the landscape decends after first y
    trend = false;
  } else {
    trend = true;
  }
  let currentTredAsc = trend; //a new variable to compare to overall trend
  let trendChange = false; //changes when there's was a change in trend
  let peakDist = p.floor(localMaxDef / 2); //distance from current peak in terms of 
  let localPeak;
  let localMax;
  for (let i = 0; i < mountainY.length; i++) {
    let localPeakArray = [];
    let priorPeakstoRun;
    let nextPeakstoRun
    if (i < peakDist) {
      priorPeakstoRun = i;
    } else {
      priorPeakstoRun = peakDist;
    }
    if (mountainY.length - i < peakDist) {
      nextPeakstoRun = mountainY.length - i;
    } else {
      nextPeakstoRun = peakDist;
    }
    for (let j = i - priorPeakstoRun; j < i + nextPeakstoRun; j++) {
      localPeakArray.push(p.height - mountainY[j]);
    }
    localPeak = p.height - mountainY[i];
    localMax = p.max(localPeakArray);
    if (localPeak === localMax) {
      currentTrendAsc = true;
    } else {
      currentTrendAsc = false;
    }
    if (currentTrendAsc != trend) {
      trendChange = true;
    }
    if (trendChange) {
      if (trend) {
        drawFlag(p.createVector(mountainX[i - 1], mountainY[i - 1]));
      }
    }
    trend = currentTrendAsc;
    trendChange = false;
    localPeakArray.length = 0;
  }
 /* if (localPeak === localMax) {
            drawFlag(createVector(mountainX[mountainX.length-2], mountainY[mountainY.length-2]));

  }*/
}

this.landscapeDraw = function () {
    p.colorMode(p.HSB);
    p.background(32, 187, 200);
    p.noStroke();
    p.fill(10, 200, 57);
    p.beginShape();
    for (let i = 0; i < mountainY.length; i++) {
        p.vertex(mountainX[i], mountainY[i]);
    }
    p.endShape(p.CLOSE);
  
}

function drawFlag(flagVector) {
    p.colorMode(p.RGB);
    // p.stroke(0);
    // p.line(flagVector.x, flagVector.y, flagVector.x, flagVector.y - 10)
    // p.line(flagVector.x+10, flagVector.y, flagVector.x+10, flagVector.y - 10)
    p.fill(255);
    p.rect(flagVector.x, flagVector.y - 12,10, 13);
}
}
new p5 (flagSketch,'flagCanvasJS');