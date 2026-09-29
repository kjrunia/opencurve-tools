"use strict";

function calc() {
    
    let inputObj = document.getElementById("d");
    
    if (!inputObj.validity.valid) {
        document.getElementById("output").innerHTML = "Please enter a number between 0 and 9000000.";
    } else {
                
        let d = Number(inputObj.value);                        
        let s = 2*d;
        
        let latex = "S = \\dfrac{d}{\\sin(\\pi/6)} = 2d";
        latex = katex.renderToString(latex, {displayMode: false, strict: false});

        let message = `The length of the slant is ${s} mm. This is due to ${latex}. As you can see, length does not matter, it's all about the width.`;
                                
        document.getElementById("output").innerHTML = message;
    };
    
    return false;
                        
};
