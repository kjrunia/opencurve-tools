let r1 = 0;
let r2 = 0;

let m1 = 10;
let m2 = 10;

let a1 = 0;
let a2 = 0;

let a3 = 0;
let a4 = 0;

let a1_v = 0;
let a2_v = 0;
let a3_v = 0;
let a4_v = 0;

let a1_a = 0;
let a2_a = 0;
let a3_a = 0;
let a4_a = 0;

let g = 0;

let widthView = 0;

let px2 = -1;
let py2 = -1;
let buffer1 = 0;

let px4 = -1;
let py4 = -1;

if (window.innerWidth < 479) {
    widthView = window.innerWidth - window.innerWidth * 0.1;
    g = 0.4;
} else {
    widthView = 800;
    g = 0.8;
}

let switch_to = "Nederlands";

function setup() {
  let canvas = createCanvas(widthView, widthView);
  canvas.parent("canvas");
  pixelDensity(1);
  a1 = 1.6;
  a2 = 0.8;
  a3 = 1.600000000001;
  a4 = 0.800000000001;
  r1 = width / 2 * 0.5;
  r2 = width / 2 * 0.5;
  buffer1 = createGraphics(width, height);
  buffer1.background(240);
  buffer1.translate(width / 2, width / 2);
  
  noLoop();
}

function draw() {
  background(240);
  imageMode(CORNER);
  image(buffer1, 0, 0, width, height);
  
  translate(width / 2, width / 2);
  
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  a2_a = (num1 * (num2 + num3 + num4)) / den;
  
  num1 = -g * (2 * m1 + m2) * sin(a3);
  num2 = -m2 * g * sin(a3 - 2 * a4);
  num3 = -2 * sin(a3 - a4) * m2;
  num4 = a3_v * a4_v * r2 + a3_v * a3_v * r1 * cos(a3 - a4);
  den = r1 * (2 * m1 + m2 - m2 * cos(2 * a3 - 2 * a4));
  a3_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a3 - a4);
  num2 = (a3_v * a3_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a3);
  num4 = a4_v * a4_v * r2 * m2 * cos(a3 - a4);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a3 - 2 * a4));
  a4_a = (num1 * (num2 + num3 + num4)) / den;
  
  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);
  
  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  let x3 = r1 * sin(a3);
  let y3 = r1 * cos(a3);
  
  let x4 = x3 + r2 * sin(a4);
  let y4 = y3 + r2 * cos(a4)

  strokeWeight(2);
  
  stroke(51,119,255);
  line(0, 0, x3, y3);
  line(x3, y3, x4, y4);
  fill(51,119,255);
  circle(x3, y3, m1);
  circle(x4, y4, m2);
  
  stroke(0);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  fill(0);
  circle(x1, y1, m1);
  circle(x2, y2, m2);
  
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  
  a3_v += a3_a;
  a4_v += a4_a;
  a3 += a3_v;
  a4 += a4_v;
  
  circle(0,0,5);
  
  buffer1.strokeWeight(0.5);
  if (frameCount > 1) {
    buffer1.stroke(150);
    buffer1.line(px2, py2, x2, y2);
    buffer1.stroke(124,185,232);
    buffer1.line(px4, py4, x4, y4);
  }

  px2 = x2;
  py2 = y2;
  px4 = x4;
  py4 = y4;
}

function start() {
    loop();
}

function pause() {
    noLoop();
}

function reset_system() {
    a1 = 1.6;
    a2 = 0.8;
    a3 = 1.600000000001;
    a4 = 0.800000000001;
    a1_v = 0;
    a2_v = 0;
    a3_v = 0;
    a4_v = 0;
    a1_a = 0;
    a2_a = 0;
    a3_a = 0;
    a4_a = 0;
    r1 = width / 2 * 0.5;
    r2 = width / 2 * 0.5;
    buffer1.reset();
    buffer1.background(240);
    buffer1.translate(width / 2, width / 2);
    if (window.innerWidth < 479) {
        px2 = 124;
        py2 = 48;
        px4 = 124;
        py4 = 48;
    } else {
        px2 = 343;
        py2 = 134;
        px4 = 343;
        py4 = 134;
    }
    redraw(1);
    noLoop();
}

function switch_language() {
    if (switch_to == "English") {
        document.getElementById("title").innerHTML = "<h1>Chaos Theory: predicting the motion of a double pendulum system</h1>";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Lees in het Nederlands 🇳🇱</a>";
        document.getElementById("explainer").innerHTML = "<p>The study of non-linear dynamical systems, such as human societies, fluid flow, heartbeat irregularities, predictive robotics, epidemiology, biology, weather systems, and climate systems, focuses on apparently(!) random states of disorder. This branch of mathematics is more commonly known as chaos theory.</p><p>However, unlike the everyday use of the words <i>chaos</i> and <i>disorder</i> does the mathematical definition <i>not</i> entail randomness; chaotic systems are <i>not</i> unpredictable the way quantum systems are fundamentally unpredictable. Unlike in quantum mechanics, with chaotic systems the underlying mechanism is still entirely deterministic. Contrary to popular belief, the systems mentioned above are all entirely classical in nature, i.e. obeying deterministic laws of nature.</p><p>And so, while proven to be computationally difficult to varying degrees in the 1880s, chaos theory has since yielded remarkable tools to analyse and simulate seemingly-random disorder, in no small part owing to the steep rise of computational science, especially surging since the 1960s.</p><h2>Double pendulum</h2><p>One of the simplest non-linear dynamical systems is the double pendulum. In this simulation you will not see just one but <i>two</i> systems: i.e. <i>two</i> swinging double pendulums.</p><p>The black double pendulum starts at slightly different initial values (i.e. starting angles) than does the blue double pendulum. These differences are purposely invisible to the naked eye. This is why you only see the black set of pendulums down below: the blue set of pendulums is there, but it's hidden behind it. The blue pendulums are starting at only a very slightly different place, simply unnoticeable to our eyes. Have a look at the initial values below.</p><p><b>Starting angles black and <span class='bluetext'>blue</span> double pendulum</b></p><p>Upper pendulum:</><p><span class='exactvalues'>1.600000000000 rad<br /><span class='bluetext'>1.600000000001 rad</span><br />or<br />91.67324722093&deg;<br /><span class='bluetext'>91.67324722099&deg;</span></span></p><p>Lower pendulum:</p><p><span class='exactvalues'>0.800000000000 rad<br /><span class='bluetext'>0.800000000001 rad</span><br />or<br />45.83662361047&deg;<br /><span class='bluetext'>45.83662361052&deg;</span></p><p>Even with this tiny difference of 0.000000000001 radians, you will see two <i>very</i> different simulation outcomes, i.e. predictions, of the states of the black versus the blue system. Non-linear dynamical systems don't need much to behave in a dramatically different way. Compared to the size of the system, the smallest nudge is capable of derailing the whole thing. Give it at least thirty seconds and you'll see what we mean. After a couple of minutes, both systems seem to have converged to a stable (periodic) state.</p><p>Note that no energy is added to the system. Both pendulums start with a fixed amount of (potential) energy and that's it. No energy is dissipated. No energy is created. The law of conservation of energy applies.</p><p>This simulation was written in the programming language JavaScript. All of the real-time calculations are taking place through the central processing unit of your mobile device, tablet or computer until your battery dies out if necessary :). Imagine what enormous chaotic systems one might be able to predict on a few interlinked supercomputers crunching the numbers for days on end. Enjoy the simulation.</p>";
        switch_to = "Nederlands";
    } else if (switch_to == "Nederlands") {
        document.getElementById("title").innerHTML = "<h1>Chaostheorie: het voorspellen van de bewegingen van een dubbele slinger</h1>";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Read in English 🇬🇧</a>";
        document.getElementById("explainer").innerHTML = "<p>De bestudering van niet-lineaire, dynamische systemen, zoals samenlevingen, vloeistofdynamica, hartslagstoornissen, robotica, epidemiologische en biologische systemen, weer- en klimaatsystemen, concentreert zich rondom schijnbaar(!) willekeurige, ogenschijnlijk(!) toevallige configuraties van wanorderlijkheid of disorde (Engels: 'random states of disorder'). Deze tak van de wiskunde is beter bekend als de chaostheorie.</p><p>Echter in tegenstelling tot het alledaagse begrip van de woorden <i>chaos</i> en <i>wanorde</i> heeft het wiskundige begrip niets te maken met willekeurigheid of toevalligheid. In tegenstelling tot de kwantummechanica is hier het onderliggende mechanisme nog steeds volstrekt deterministisch. In tegenspraak met wat over het algemeen gedacht wordt, zijn de voorbeelden van de systemen zoals hierboven vermeld volstrekt klassieke systemen: ze gehoorzamen de deterministische wetten van de natuur.</p><p>Hoewel is gebleken in de jaren 1880 dat het soms heel moeilijke berekeningen zijn, heeft de chaostheorie sindsdien opmerkelijke, analytische hulpmiddelen opgeleverd waarmee de ogenschijnlijk willekeurige wanorde kan worden bestudeerd en gesimuleerd, niet in het minst dankzij de razendsnelle opkomst van computerwetenschappen sinds de jaren zestig.</p><h2>Dubbele slinger</h2><p>Een van de simpelste niet-lineaire, dynamische systemen is de dubbele slinger. In deze simulatie zie je niet slechts een, maar <i>twee</i> dubbele slingers.</p><p>De zwarte dubbele slinger begint met heel subtiel verschillende startcondities ten opzichte van de blauwe dubbele slinger. De verschillen zijn met opzet onzichtbaar voor het blote oog. Dit is de reden waarom je hieronder alleen de zwarte dubbele slinger ziet: de blauwe set is zeker aanwezig, maar is verstopt achter de zwarte. Aangezien de blauwe dubbele slinger onder een andere hoek begint, zou hij technisch gezien zichtbaar moeten zijn. Echter omdat het verschil miniem is, zie je het niet. Kijk maar eens naar de startcondities hieronder.</p><p><b>Starthoeken zwarte en <span class='bluetext'>blauwe</span> dubbele slinger</b></p><p>Bovenste slinger:</><p><span class='exactvalues'>1.600000000000 rad<br /><span class='bluetext'>1.600000000001 rad</span><br />of<br />91.67324722093&deg;<br /><span class='bluetext'>91.67324722099&deg;</span></span></p><p>Onderste slinger:</p><p><span class='exactvalues'>0.800000000000 rad<br /><span class='bluetext'>0.800000000001 rad</span><br />of<br />45.83662361047&deg;<br /><span class='bluetext'>45.83662361052&deg;</span></p><p><p>Zelfs met dit minieme verschil van 0.000000000001 radialen zul je <i>zeer</i> verschillende simulatieresultaten, oftewel voorspellingen, zien van de toestanden van de twee systemen, zwart versus blauw. Niet-lineaire, dynamische systemen hebben niet veel nodig om dramatische gedragsveranderingen teweeg te brengen. Vergeleken met de omvang van het systeem is het kleinste zetje al genoeg om het geheel te doen ontsporen. Geef het minstens dertig seconden en je zult zien wat we bedoelen. Na een paar minuten zullen de twee systemen weer geconvergeerd zijn naar een stabiele (periodieke) toestand.</p><p>Er wordt in deze simulatie geen extra energie toegevoegd. De slingers beginnen met een gegeven hoeveelheid (potentiële) energie en dat is het. Er lekt geen energie. Er wordt geen energie gecreëerd. De wet van behoud van energie is hier van toepassing.</p><p>Deze simulatie is geschreven in de programmeertaal JavaScript. Alle real-time berekeningen vinden plaats in de centrale computerchip van je mobiel, tablet of computer, tot de accu leeg is, als het moet. :) Stel je voor welke enorme chaotische systemen je zou kunnen voorspellen met enkele met elkaar verbonden supercomputers gedurende ettelijke dagen achter elkaar. Enjoy.</p>";
        switch_to = "English";
    }
}