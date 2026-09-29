"use strict";

function calc() {
    let latex = "";
    let inputObj = document.getElementById("groupSize");
    
    if (!inputObj.validity.valid) {
        document.getElementById("output").innerHTML = "Please enter a valid number between 2 and 84.";
    } else {
        inputObj.setCustomValidity("");
        let groupSize = Number(inputObj.value);
        
        let invertedP = 1;
        for (let i = 0; i < groupSize; i++) {
            invertedP *= (365 - i) / 365;
        };
        if (groupSize == 2) {
            latex = "\\dfrac{365}{365} \\times \\dfrac{364}{365} = "+String(invertedP).substr(0,7)+"\\dots";
        } else if (groupSize == 3) {
            latex = "\\dfrac{365}{365}\\times\\dfrac{364}{365}\\times\\dfrac{363}{365} = "+String(invertedP).substr(0,7)+"\\dots";
        } else if (groupSize == 4) {
            latex = "\\dfrac{365}{365}\\times\\dots\\times\\dfrac{362}{365} = "+String(invertedP).substr(0,7)+"\\dots";
        } else {
            latex = "\\dfrac{365}{365}\\times\\dfrac{364}{365}\\dots\\times\\dfrac{"+(365-groupSize+1)+"}{365} = "+String(invertedP).substr(0,7)+"\\dots";
        }
        latex = katex.renderToString(latex, {displayMode: true, strict: false});
            
        let P = ((1 - invertedP) * 100).toFixed(2);
        let message = "Within a group of "+groupSize+" people, the probability (rounded to two decimals) of at least two people having their birthday in common is "+katex.renderToString(P+"\\%",{displayMode: true})+"We calculated this by computing the probability that <u>no</u> two people share their birthday:<span class='latex'>" + latex + "</span>The probability that at least two people <u>do</u> have their birthday in common is <u>the opposite</u> of that."
        
            
        document.getElementById("output").innerHTML = message;
    }
    
    return false;
                    
};
