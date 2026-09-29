"use strict";

let switch_to = "Nederlands";
let result_array = [];
let widthView;
let font_size;

if (window.innerWidth < 479) {
    widthView = window.innerWidth - window.innerWidth * 0.1;
    font_size = 8;
} else {
    widthView = 800;
    font_size = 14;
}

function collatz() {
    let inputObj = document.getElementById("collatz_input");
    if (!inputObj.validity.valid || inputObj.value == "") {
    let collatz_output;
        let min = katex.renderToString("1");
        let max = katex.renderToString("9 \\times 10^{37}");
        document.getElementById("collatz_output").innerHTML = "Please enter a valid number between " + min + " and " + max + ".";
    } else {
        let n = inputObj.value;
        result_array = [n];
        let steps = 0;
        while (n != 1) {
            n  = collatz_func(n);
            result_array.push(n);
            steps += 1;
        }
        let result = result_array.toString();
        result = result.replace(/,/g, " → ");
        if (switch_to == "Nederlands") {
            collatz_output =  "It took " + String(steps) + " steps to get to 1. Here's the chain of numbers: <br /><br />" + result;
        } else {
            collatz_output =  "Het kostte " + String(steps) + " stappen om 1 te bereiken. Hier is de getallenreeks: <br /><br />" + result;
        }
        document.getElementById("collatz_output").innerHTML = collatz_output;
        document.getElementById("collatz_chart_container").innerHTML = "<div id='collatz_chart'></div>";
        
        let x_axis = [];
        for (let i = 0; i < result_array.length; i++) {
            x_axis.push(i);
        }
        
        let trace = {
            x: x_axis,
            y: result_array,
            type: 'scatter'
        };
        
        let data = [trace];
        let layout;
        if (Math.max.apply(Math, result_array) >= 1e4) {
            layout = {
                title: {
                    text: 'Collatz number progression (semi-log)'
                },
                yaxis: {
                    type: 'log',
                    autorange: true,
                    title: 'Collatz number value (log)'
                },
                xaxis: {
                    title: 'Step #'
                },
                width: widthView,
                height: widthView,
                font: {
                    size: font_size
                }
            };
        } else {
            layout = {
                title: {
                    text: 'Collatz number progression'
                },
                yaxis: {
                    autorange: true,
                    title: 'Collatz number value'
                },
                xaxis: {
                    title: 'Step #'
                },
                width: widthView,
                height: widthView,
                font: {
                    size: font_size
                }
            }
        };
                
        Plotly.newPlot('collatz_chart', data, layout, {displayModeBar: false, staticPlot: true});
    }
    return false;
}

function collatz_func(n) {
    if (n % 2 == 0) {
        return n / 2;
    } else {
        return 3 * n + 1;
    }
}

function switch_language() {
    if (switch_to == "English") {
        document.getElementById("title").innerHTML = "The Collatz Conjecture";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Lees in het Nederlands 🇳🇱</a>";
        document.getElementById("explainer").innerHTML = "<p>The Collatz Conjecture is an unsolved problem in mathematics. This JavaScript applet is an accompaniment to our post <a href='https://opencurve.info/the-collatz-conjecture/'>The Collatz Conjecture</a>, where you can read more about the Conjecture. This applet calculates the consecutive number values starting from a whole number you entered here. It also plots these steps down below.</p><p>Enter a positive, whole number:</p>";
        document.getElementById("collatz_input").placeholder = "Enter a positive integer";
        switch_to = "Nederlands";
    } else if (switch_to == "Nederlands") {
        document.getElementById("title").innerHTML = "Het Vermoeden van Collatz";
        document.getElementById("switch_to").innerHTML = "<a onclick='switch_language();'>Read in English 🇬🇧</a>";
        document.getElementById("explainer").innerHTML = "<p>Het Vermoeden van Collatz is een onopgelost probleem in de wiskunde. Dit JavaScript applet hoort bij het artikel <a href='https://opencurve.info/het-vermoeden-van-collatz/'>Het Vermoeden van Collatz</a>, waarin je meer kunt lezen over het Vermoeden. Dit applet berekent de aaneenschakeling van getallen, startend met het gehele getal dat je hier invoert. Het genereert tevens een diagram van de stappen.</p><p>Voer een positief, geheel getal in:</p>";
            document.getElementById("collatz_input").placeholder = "Voer een positief, geheel getal in";
        switch_to = "English";
    }
}