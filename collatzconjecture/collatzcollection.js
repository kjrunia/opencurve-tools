"use strict";

//let d3 = Plotly.d3;
//let img_jpg= d3.select('#jpg_export');

let widthView;
let plotSize;
let fontSize;
let data = [];
let series = [];
let switch_to = "Nederlands";

if (window.innerWidth < 479) {
    widthView = window.innerWidth - window.innerWidth * 0.1;
    plotSize = 350;
    fontSize = 8;
} else {
    widthView = 1000;
    plotSize = 700;
    fontSize = 16;
}

function collatz(n) {
    if (n % 2 == 0) {
        return n/2;
    } else {
        return 3 * n + 1;
    }
}

function graphCollatz() {

    let n = Number(document.getElementById("start").value);
    
    if (n >= 4000) {
        if (switch_to == "Nederlands") {
            alert("Your plot is being calculated. Click Close to continue and wait until finished.");
        } else {
            alert("De curves worden berekend. Klik Close/Sluiten om door te gaan en wacht tot het klaar is.");
        }
    }
    
    Plotly.purge(collatz_chart_container);
    
    for (let i = 4; i < n; i++) {
    
        let x = [];
        let y = [];
        let j = i;
        let step = 1;
    
        while (j != 1) {
            x.push(step);
            y.push(collatz(j))
            j = collatz(j);
            step += 1;
        }
        y.reverse();
        series[i-4] = {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            line: {color: 'rgb(43,95,155)', width: 0.5},
            opacity: 0.2,
        }
        
        data.push(series[i-4]);
    }
    
    let layout = {
        title: {
            text: 'Collatz progressions of starting points 4 to ' + n + ' (log)',
            //text: 'Collatz number progression (log)',
            font: {size: fontSize}
        },
        width: plotSize,
        height: plotSize,
        xaxis: {
            title: {
                text: 'reversed step order (log)',
                font: {size: fontSize}
            },
            type: 'log',
            autorange: true
        },
        yaxis: {
            title: {
                text: 'Collatz value (log)',
                font: {size: fontSize}
            },
            type: 'log',
            autorange: true
        },
        showlegend: false
    }
    
    let config = {
        displayModeBar: false,
        staticPlot: true,
    }
    
    Plotly.newPlot(collatz_chart_container, data, layout, config);
        
    return false;
}

function switch_language() {
    if (switch_to == "English") {
        document.getElementById("title").innerHTML = "The Collatz Conjecture";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Lees in het Nederlands 🇳🇱</a>";
        document.getElementById("explainer").innerHTML = "<p>The Collatz Conjecture is an unsolved problem in mathematics. This JavaScript applet is an accompaniment to our post <a href='https://opencurve.info/the-collatz-conjecture/'>The Collatz Conjecture</a>, where you can read more about the Conjecture. This applet calculates a series of Collatz sequences. If you enter, for example, 10000, it will calculate the Collatz values starting at 10000 (until it reaches the value of 1). It will then calculate the Collatz values starting at 9999. And then 9998, and so on. Lastly, it will plot all the sequences at once down below. Mind you, if you click on OK, it might take a while!</p><p>Enter a positive integer (a positive whole number):</p>";
        switch_to = "Nederlands";
    } else if (switch_to == "Nederlands") {
        document.getElementById("title").innerHTML = "Het Vermoeden van Collatz";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Read in English 🇬🇧</a>";
        document.getElementById("explainer").innerHTML = "<p>Het Vermoeden van Collatz is een onopgelost probleem in de wiskunde. Het JavaScript applet hoort bij het artikel <a href='https://opencurve.info/het-vermoeden-van-collatz/'>Het Vermoeden van Collatz</a>, waarin je meer kunt lezen over het Vermoeden. Het applet berekent een reeks van Collatz-sequenties. Als je bijvoorbeeld 10000 invoert zal het alle Collatz-waarden berekenen vanaf 10000 (tot het de waarde 1 bereikt heeft). Het zal daarna automatisch doorgaan met het berekenen van de sequentie beginnend vanaf 9999. En daarna 9998, enzovoorts. Ten slotte zal het alle sequenties in een en dezelfde diagram hieronder plaatsen. Houd er rekening mee dat als je op OK klikt het een tijdje kan duren!</p><p>Voer een positief, geheel getal in:</p>";
        switch_to = "English";
    }
}