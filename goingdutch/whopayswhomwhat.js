"use strict";

const formatter = new Intl.NumberFormat({style: 'currency'});

let dataBase = document.getElementById("myform");

for (let i = 0; i < 2; i++) {
    
    let record = document.createElement("div");
    record.className = "record";
    record.id = "record" + i;
    dataBase.appendChild(record);
    
    let input = document.createElement("input");
    input.type = "text";
    input.id = "namePerson" + i;
    input.placeholder = "Enter name";
    input.className = "field";
    input.required = true;
    record.appendChild(input);
    
    input = "";
    
    input = document.createElement("input");
    input.type = "number";
    input.className = "field";
    input.id = "costPerson" + i;
    input.placeholder = "Enter total cost";
    input.min = 0;
    input.max = 999000000000;
    input.step = "0.01";
    input.required = true;
    record.appendChild(input);
    
    input = "";
    record = "";
};

document.getElementById("namePerson0").focus();

let nrOfRecords = 2;
let input;
let record;

function addPerson() {
    record = "";
    record = document.createElement("div");
    record.className = "record";
    record.id = "record" + nrOfRecords;
    dataBase.appendChild(record);
    
    input = "";
    input = document.createElement("input");
    input.type = "text";
    input.id = "namePerson" + nrOfRecords;
    input.placeholder = "Enter name";
    input.className = "field";
    input.required = true;
    record.appendChild(input);
    input.focus();
    
    input = "";
    input = document.createElement("input");
    input.type = "number";
    input.id = "costPerson" + nrOfRecords;
    input.className = "field";
    input.placeholder = "Enter total cost";
    input.min = 0;
    input.max = 999000000000;
    input.step = "0.01";
    input.required = true;
    record.appendChild(input);
    
    nrOfRecords += 1;
};

function removeLastPerson() {
    if (nrOfRecords == 2) {
        alert("A minimum of two persons is required.");
    } else {
        record = "";
        record = document.getElementById("record" + (nrOfRecords-1));
        record.remove();
        nrOfRecords += -1;
    }
}

function calculate() {
    let name = [];
    let cost = [];
    let deltas = [];
    let whoPaysWhom = [];
    let error = false;
    document.getElementById("copyButtonResult").innerHTML = "";
    for (let i = 0; i < nrOfRecords; i++) {
        name.push(document.getElementById("namePerson" + i).value);
        cost.push(Number(document.getElementById("costPerson" + i).value));
        if (!document.getElementById("costPerson" + i).validity.valid) {
            document.getElementById("costPerson" + i).style.backgroundColor = "#ff8c82";
            error = true;
        } else if (document.getElementById("costPerson" + i).validity.valid){
            document.getElementById("costPerson" + i).style.backgroundColor = null;
        }
        if (!document.getElementById("namePerson" + i).validity.valid) {
            document.getElementById("namePerson" + i).style.backgroundColor = "#ff8c82";
            error = true;
        } else if (document.getElementById("namePerson" + i).validity.valid) {
            document.getElementById("namePerson" + i).style.backgroundColor = null;
        }
    }
    if (!error) {
        let totalCost = cost.reduce(function(a,b) {return a+b;}, 0);
        for (let i = 0; i < cost.length; i++) {
            deltas.push((cost[i] - totalCost / cost.length) /cost.length);
        }
        for (let i = 0; i < (cost.length - 1); i++) {
            for (let j = i + 1; j < cost.length; j++) {
                let results = deltas[j] - deltas[i];
                if (results < 0) {
                    results *= -1;
                    whoPaysWhom.push(name[j] + " pays " + name[i] + " an amount of \u20ac" + numberWithCommas(results));
                } else if (results > 0) {
                    whoPaysWhom.push(name[i] + " pays " + name[j] + " an amount of \u20ac" + numberWithCommas(results));
                }
            }
        }
        if (document.getElementById("result")) {
            document.getElementById("result").remove();
        }
        let parentDiv = document.getElementById("output");
        parentDiv.innerHTML = "";
        let textBlock = document.createElement("textarea");
        textBlock.id = "result";
        if (whoPaysWhom.length) {
            whoPaysWhom.sort();
            whoPaysWhom.forEach(function(e) {textBlock.value += e + "\n\n";});
        } else {
            textBlock.value = "No one pays anything to anyone. You must have known this, smarty-pants.";
        }
        parentDiv.appendChild(textBlock);
        textBlock.style.height = textBlock.scrollHeight + "px";
        document.getElementById("copyButton").style.visibility = "visible";
        location.href = "#copyButton";
    } else {
        document.getElementById("output").innerHTML = "Please enter a valid name and/or amount. No amounts greater than 999 billion are allowed due to floating-point limitations.";
    }
};

function copyText() {
    let textBlock = document.getElementById("result").select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.getElementById("copyButtonResult").innerHTML = "Copied";
    location.href = "#copyButton";
}

function numberWithCommas(x) {
    x = x.toFixed(2);
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}