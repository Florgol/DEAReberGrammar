var inp;
var inpTime;
var inputValue;
var entryHeight = 0;

var currentEdge;
var currentState = 0;

var counterIterations = 0;

var pauseTime = 1500;
var interval;

var buttonK;
var buttonF;



function setup() {

  //Canvas erstellen
  createCanvas(1000, 450);
  background(220);

  //Animationsgeschwindigkeit einstellen
  createP("Geben Sie die Animationsgeschwindigkeit ein (in Sek.):");
  createP("(Beispiel für Eingabe: 4)");
  inpTime = createInput();

  //Zeichenkette eingeben
  createP("Geben Sie eine Reber Grammar Zeichenkette ein (Eingabe mit Enter bestätigen):")
  createP("(Beispiel für Eingabe: BTSXXVVE)")
  inp = createInput();

  //Initial Automaten und Überführungstabelle zeichnen
  drawAnimation(currentState);
  drawTable();

  //Input verarbeiten
  inp.changed(displayInput);
  inpTime.changed(changePauseTime);

  //Korrekte Zeichenkette mit Button generieren
  buttonK = createButton("Korrekte Zeichenkette generieren");
  buttonK.mousePressed(generateCorrectString);

  buttonF = createButton("Falsche Zeichenkette generieren");
  buttonF.mousePressed(generateFalseString);


}

function generateCorrectString() {
  createP(stringGenerator("c"));
}

function generateFalseString() {
  createP(stringGenerator("f"));
}

function changePauseTime() {
  pauseTime = inpTime.value() *1000;
}


//Falls der Benutzer eine Reber Grammar Zeichenkette
//eingibt und Enter drückt, wird diese Funktion
//aufgerufen.
//Hier wird die displayAnimation() Funktion in einem
//Intervall aufgerufen.
//Die Länge des Intervalls kann mit pauseTime eingestellt
//werden.
function displayInput(){

    inputValue = inp.value();

    //draw Animation
    drawAnimation(currentState);

  interval = setInterval(displayAnimation, pauseTime);
}


//Hier werden Einträge der Überführungsfunktion 
//mit drawEntry() ausgefüllt.
//Und der Graph basierend auf der Zustandsveränderung
//ausgegeben.
function displayAnimation(){

  //Derzeitige Kante
  currentEdge = inputValue.charAt(counterIterations);

  //Überführungsfunktion wird ausgefüllt
  drawEntry(entryHeight, currentState, currentEdge, determineNewState(currentState, currentEdge));

  entryHeight = entryHeight +15;
  currentState = determineNewState(currentState, currentEdge);

  //Wenn die Zeichenkette terminiert,
  //geben wir das Ergebnis zurück.
  if (currentState == "False") {
    createP("Die eingegeben Zeichenkette ist nicht korrekt.");

    //Wir beenden den Intervall
    currentState = "0";
    clearInterval(interval);
    
  } else if (currentState == "Correct") {
    createP("Die eingegeben Zeichenkette ist korrekt.");
  } else {
      //Falls die Zeichenkette noch nicht terminiert hat,
      //wird hier der Graph mit aktuellem Zustand
      //ausgegeben. 
      drawAnimation(currentState);
  }

  //Wir müssen uns merken bei welcher Iteration des Intervalls
  //wir uns befinden, damit wir auf die nächste Kante
  //zugreigen können.
  counterIterations++;

  //Falls wir auf alle Kanzen zugegriffen haben
  //Beenden wir den Intervall
  if (counterIterations == inputValue.length) {
    currentState = "0";
    clearInterval(interval);
  }

}

//Wird nicht benutzt
function draw() {

}

function drawAnimation(currentState) {

  //Allgemeine Funktion um Zustand zu zeichnen
  //Umrandet den jetzigen Zustand rot
  function drawState(x, y, zustandName){
    stroke(255,255,255);
    if(zustandName == currentState) {
      strokeWeight(1.75);
      stroke(255,0,0);
    }
    ellipse(x, y, 30, 30);

    strokeWeight(1);
    stroke(255,255,255);
    text(zustandName, x-3, y+3);
  }

  //Startzustand 0
  drawState(40, 150, "0");

  //Kante B von Zustand 0 zu 1
  stroke(0,0,0);
  beginShape();
  vertex(65, 150);
  vertex(100, 150);
  vertex(95, 145);
  vertex(100, 150);
  vertex(95, 155);
  vertex(100, 150);
  endShape();
  text("B", 75, 135);

  //Zustand 1
  drawState(125, 150, "1");

  //Kante T von Zustand 1 nach 2
  stroke(0,0,0);
  beginShape();
  vertex(140, 130);
  vertex(175, 100);
  vertex(170, 100);
  vertex(175, 100);
  vertex(175, 105);
  vertex(175, 100);
  endShape();
  text("T", 150, 110);

  //Zustand 2
  drawState(198, 100, "2");


  //Kante S von Zustand 2 nach Zustand 2
  stroke(0,0,0);
  line(205, 80, 212, 60);
  line(212, 60, 185, 60);
  line(185, 60, 192, 80);
  beginShape();
  vertex(192, 80);
  vertex(185, 75);
  vertex(192, 80);
  vertex(196, 75);
  endShape();
  text("S", 195, 50);

  //Kante X von Zustand 2 nach Zustand 3
  stroke(0,0,0);
  beginShape();
  vertex(220, 100);
  vertex(255, 100);
  vertex(250, 95);
  vertex(255, 100);
  vertex(250, 105);
  vertex(255, 100);
  endShape();
  text("X", 230, 90);

  //Zustand 3
  drawState(275, 100, "3");

  //Kante P von Zustand 1 nach Zustand 4
  stroke(0,0,0);
  beginShape();
  vertex(140,165);
  vertex(175, 195);
  vertex(175, 190);
  vertex(175, 195);
  vertex(170, 195);
  vertex(175, 195);
  endShape();
  text("P", 155, 170);


  // Zustand 4
  drawState(198, 195, "4");

  //Kante T von Zustand 4 nach Zustand 4
  stroke(0,0,0);
  line(205, 215, 212, 235);
  line(212, 235, 185, 235);
  line(185, 235, 192, 215);
  beginShape();
  vertex(192, 215);
  vertex(185, 220);
  vertex(192, 215);
  vertex(196, 220);
  endShape();
  text("T", 195, 250);


  //Kante V von Zustand 4 nach Zustand 5
  stroke(0,0,0);
  beginShape();
  vertex(220, 195);
  vertex(255, 195);
  vertex(250, 190);
  vertex(255, 195);
  vertex(250, 200);
  vertex(255, 195);
  endShape();
  text("V", 230, 188);

  //Zustand 5
  drawState(275, 195, "5");

  //Kante S von Zustand 3 nach Zustand 6
  stroke(0,0,0);
  beginShape();
  vertex(295, 100);
  vertex(330, 130);
  vertex(330, 125);
  vertex(330, 130);
  vertex(325, 130);
  vertex(330, 130);
  endShape();
  text("S", 310, 105);

  //Zustand 6
  drawState(350, 150, "6");

  //Kante V von Zustand 5 nach Zustand 6
  stroke(0,0,0);
  beginShape();
  vertex(295, 195);
  vertex(330, 165);
  vertex(325, 165);
  vertex(330, 165);
  vertex(330, 170);
  vertex(330, 165);
  endShape();
  text("V", 300, 175);

  //Kante E von Zustand 6 nach Ende
  stroke(0,0,0);
  beginShape();
  vertex(370, 150);
  vertex(410, 150);
  vertex(405, 145);
  vertex(410, 150);
  vertex(405, 155);
  vertex(410, 150);
  endShape();
  text("E", 380, 135);

  //Kante X von Zustand 3 nach Zustand 4
  stroke(0,0,0);
  beginShape();
  vertex(260, 120);
  vertex(215, 175);
  vertex(215, 170);
  vertex(215, 175);
  vertex(220, 175);
  vertex(215, 175);
  endShape();
  text("X", 225, 145);

  //Kante P von Zustand 5 nach Zustand 3
  stroke(0,0,0);
  beginShape();
  vertex(275, 175);
  vertex(275, 120);
  vertex(270, 125);
  vertex(275, 120);
  vertex(280, 125);
  vertex(275, 120);
  endShape();
  text("P", 280, 145);

}

function drawTable() {
  stroke(0,0,0);
  line(520, 100, 700, 100);
  line(620, 80, 620, 400);
  stroke(220);
  text("δ Überführungsfunktion", 530, 60);
  stroke(0,0,0);
  text("Q         Σ              Q", 550, 90);
}


//Diese Funktion trägt eine Bewegung von Zustand
//zu Zustand mit der Kante, welche genommen wurde,
//in die Überführungsfunktionstabelle ein.
//Das Attribut entryHeight sollte jedes Mal erhöht
//werden, damit die Eintäge untereinander passieren.
function drawEntry(entryHeight, lastState, edge, currentState) {
  stroke(220);
  text(lastState + "         "
   + edge + "              " 
   + currentState, 550, 120 + entryHeight);
}


//Diese Funktion, nimmt den jetzigen Zustand und
//die Kante, welche ausgewählt werden soll und
//gibt den nächsten Zustand zurück.
//Wenn die Zeichenkette Falsch ist, wird "False"
//zurückgegeben.
//Ist die Zeichenkette korrekt, also terminiert sie,
//wird "Correct" zurückgegeben.
function determineNewState(currentState, edge) {

  //Zustand 0
  if (currentState == "0" && edge == "B"){
    return "1";
  }

  //Zustand 1
  if (currentState == "1" && edge == "T"){
    return "2";
  }
  else if (currentState == "1" && edge == "P"){
    return "4";
  }

  //Zustand 2
  if (currentState == "2" && edge == "S"){
    return "2";
  }
  else if (currentState == "2" && edge == "X"){
    return "3";
  }

  //Zustand 3
  if (currentState == "3" && edge == "S"){
    return "6";
  }
  else if (currentState == "3" && edge == "X"){
    return "4";
  }

  //Zustand 4
  if (currentState == "4" && edge == "T"){
    return "4";
  }
  else if (currentState == "4" && edge == "V"){
    return "5";
  }

  //Zustand 5
  if (currentState == "5" && edge == "P"){
    return "3";
  }
  else if (currentState == "5" && edge == "V"){
    return "6";
  }

  //Zustand 6
  //Im folgenden Fall terminiert der Automat
  if (currentState == "6" && edge == "E"){
    return "Correct";
  }

  //Falls keiner dieser Fälle zutrifft
  //ist die Zeichenkette falsch und
  //es wird "False" zurückgegeben
  return "False";


}

//Diese Funktion generiert einen zufälligen
//korrekten RG String.
function stringGenerator(mode) {

  var state = "0";
  var ed = "B";
  var output = "";

  for (let i = 0; i < 15; i++) {

    if (mode == "c") {
      ed = nextEdge(state);
    } else if (mode == "f") {
      ed = nextEdgeF(state);
    }
 
    console.log(ed);
    state = determineNewState(state, ed);
    output += ed;

    if (ed == "E") {return output;};
  }

  output = "";
  stringGenerator("0");

}


//Diese Funktion nimmt einen Zustand
//und generiert zufällig die nächste Kante.
function nextEdge(state){

  edges = "";

  if (state == "0") {
    return "B";
  } else if (state == "1") {
    edges = "TP";
    return edges.charAt(random(0,2));
  } else if (state == "2") {
    edges = "SX";
    return edges.charAt(random(0,2));
  } else if (state == "3") {
    edges = "SX";
    return edges.charAt(random(0,2));
  } else if (state == "4") {
    edges = "TV";
    return edges.charAt(random(0,2));
  } else if (state == "5") {
    edges = "PV";
    return edges.charAt(random(0,2));
  } else if (state == "6") {
    return "E";
  }
}

//Diese Funktion gibt ab einem bestimmten
//Zeitpunkt immer die falsche Kante
//zurück, weil Zustand 3 und 5 nur die Kante
//E zurückgeben
function nextEdgeF(state){

  edges = "";

  if (state == "0") {
    return "B";
  } else if (state == "1") {
    edges = "TP";
    return edges.charAt(random(0,2));
  } else if (state == "2") {
    edges = "SX";
    return edges.charAt(random(0,2));
  } else if (state == "3") {
    return "E";
  } else if (state == "4") {
    edges = "TV";
    return edges.charAt(random(0,2));
  } else if (state == "5") {
    return "E";
  } else if (state == "6") {
    return "E";
  }
}