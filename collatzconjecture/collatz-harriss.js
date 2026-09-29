"use strict";

let widthView;
let startAngle;
let angle;
let step;
let alpha;
let translateX;
let translateY;
let message = document.getElementById("output");
let submitButton = document.getElementById("submit_button");
let switch_to = "Nederlands";

if (window.innerWidth < 479) {
    widthView = window.innerWidth - window.innerWidth * 0.1;
    startAngle = -Math.PI * 0.58;
    angle = 0.08;
    step = 2.5;
    alpha = 1;
    translateX = widthView / 4;
    translateY = widthView - 20;
} else {
    widthView = 1200;
    startAngle = -Math.PI * 0.6;
    angle = 0.08;
    step = 10;
    alpha = 1;
    translateX = widthView / 4;
    translateY = widthView - 50;
}

function setup() {
    let canvas = createCanvas(widthView, widthView);
    canvas.parent('graph');
    noLoop();
}

function draw() {
    // catch the background color hex value and add a #
    let bgc = "#" + document.getElementById("bgcolor").value;
    // set background color in canvas
    background(bgc);
}

function RGBToHSL(r,g,b,a) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
        
    // Calculate hue
    // No difference
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;
    
    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
        
    // Calculate lightness
    l = (cmax + cmin) / 2;
    
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * Math.random() * 90 + 10).toFixed(1);
    
    return "hsla(" + h + "," + s + "%," +l + "%," + a + ")";
}

function Collatz(n) {
    if (n % 2 == 0) {
        return n = n /2;
    } else {
        return (n = 3 * n + 1) / 2;
    }
}

function CollatzHarriss() {
    let inputObj1 = document.getElementById("start");
    let inputObj2 = document.getElementById("stroke_thickness");
    if (!inputObj1.validity.valid || !inputObj2.validity.valid || !inputObj1.value || !inputObj2.value) {
        if (switch_to == "Nederlands") {
            message.innerHTML = "Please enter a whole number between 4 and 20000 for the starting point and enter a line thickness between 0.1 and 20.";
        } else {
            message.innerHTML = "Voer een positief, geheel getal in tussen de 4 and 20000 voor het startpunt en voer een lijndikte in tussen de 0.1 and 20.";
        }
        return false;
    } else {
        let maximum = start.value;
        if (maximum >= 4000) {
            if (switch_to == "Nederlands") {
                alert("Your plot is being calculated. Click Close to continue and wait until finished.");
            } else {
                alert("De curves worden berekend. Klik Close/Sluiten om door te gaan en wacht tot het klaar is.");
            }
        }
        redraw();
        let strokeThickness = stroke_thickness.value;
        let c = document.getElementById("fgcolor").value;
        let r = String(parseInt(c.substring(0,2),16));
        let g = String(parseInt(c.substring(2,4),16));
        let b = String(parseInt(c.substring(4,6),16));
        
        for (let i = 4; i < maximum; i++) {
            let seq = [];
            let n = i;
            let next_value;
            while (n != 1) {
                seq.push(n);
                n = Collatz(n);
            }
            seq.push(1);
            seq.reverse();
            resetMatrix();
            translate(translateX, translateY);
            rotate(startAngle);
            c = color(RGBToHSL(r,g,b,alpha));
            stroke(c);
            strokeWeight(strokeThickness);
            for (let j = 0; j < seq.length; j++) {
                if (j < (seq.length-1)) {
                    next_value = seq[j+1];
                } else {
                    next_value = seq[j];
                }
                if (seq[j] * 2 == next_value) {
                    rotate(angle*2);
                } else {
                    rotate(-angle);
                }
                line(0,0, 0, -step);
                translate(0, -step);
            }
        }
        message.innerHTML = "";
        location.href = "#graph";
        return false;
    }
}

function switch_language() {
    if (switch_to == "English") {
        document.getElementById("title").innerHTML = "The Collatz Conjecture";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Lees in het Nederlands 🇳🇱</a>";
        document.getElementById("explainer").innerHTML = "<p>The Collatz Conjecture is an unsolved problem in mathematics. This JavaScript applet is an accompaniment to our post <a href='https://opencurve.info/the-collatz-conjecture/'>The Collatz Conjecture</a>, where you can read more about the Conjecture. This applet calculates a series of Collatz sequences. If you enter, for example, 10000, it will calculate the Collatz values starting at 10000 (until it reaches the value of 1). It will then calculate the Collatz values starting at 9999. And then 9998, and so on. Lastly, it will plot all the sequences at once down below using <a href='https://opencurve.info/the-collatz-conjecture/#edmundharriss'>Edmund Harriss's visualisation rules</a>. Mind you, if you click OK, it might take a while!</p><p>Enter a positive integer (a positive whole number, max 20000), a line thickness (0.1 to 20), and a color:</p>";
        document.getElementById("start").placeholder = "Integer";
        document.getElementById("stroke_thickness").placeholder = "Line width";
        document.getElementById("fg").innerHTML = "Pick a colour";
        document.getElementById("bg").innerHTML = "Background";
        switch_to = "Nederlands";
    } else if (switch_to == "Nederlands") {
        document.getElementById("title").innerHTML = "Het Vermoeden van Collatz";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Read in English 🇬🇧</a>";
        document.getElementById("explainer").innerHTML = "<p>Het Vermoeden van Collatz is een onopgelost probleem in de wiskunde. Het JavaScript applet hoort bij het artikel <a href='https://opencurve.info/het-vermoeden-van-collatz/'>Het Vermoeden van Collatz</a>, waarin je meer kunt lezen over het Vermoeden. Het applet berekent een reeks van Collatz-sequenties. Als je bijvoorbeeld 10000 invoert zal het alle Collatz-waarden berekenen vanaf 10000 (tot het de waarde 1 bereikt heeft). Het zal daarna automatisch doorgaan met het berekenen van de sequentie beginnend vanaf 9999. En daarna 9998, enzovoorts. Ten slotte zal het alle sequenties in een en dezelfde diagram hieronder plaatsen volgens de <a href='https://opencurve.info/nl/het-vermoeden-van-collatz/#edmundharriss'>visualisatieregels van Edmund Harriss</a>. Houd er rekening mee dat als je op OK klikt het een tijdje kan duren!</p><p>Voer een positief, geheel getal in (maximum 20000), een lijndikte (0.1 t/m 20) en kies een kleur:</p>";
        document.getElementById("start").placeholder = "Geheel getal";
        document.getElementById("stroke_thickness").placeholder = "Lijndikte";
        document.getElementById("fg").innerHTML = "Kies een kleur";
        document.getElementById("bg").innerHTML = "Achtergrond";
        switch_to = "English";
    }
}
