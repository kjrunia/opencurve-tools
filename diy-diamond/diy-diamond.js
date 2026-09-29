"use strict";

function calc() {
    
    let d_input = document.getElementById("d");
    let l_input = document.getElementById("l");
    let h_input = document.getElementById("h");
    
    if (!d_input.validity.valid || !l_input.validity.valid || !h_input.validity.valid) {
        document.getElementById("output").innerHTML = "Please enter a number between 0 and 9000000.";
    } else {
                
        let d = Number(d_input.value);
        let l = Number(l_input.value);
        let h = Number(h_input.value);

        let S1 = Math.round(2*l*d / h);
        // let S2 = Math.round(2*l*d*Math.tan(Math.asin(h/(2*l))) / h);
        let S2 = Math.round(2*l*d/(Math.sqrt(4*Math.pow(l, 2)-Math.pow(h, 2))));
        
        let latex_S1 = katex.renderToString("S_1", {displayMode: false, strict: false});
        let latex_S2 = katex.renderToString("S_2", {displayMode: false, strict: false});

        let latex_due2_S1 = "S_1 = \\dfrac{2ld}{h}";
        latex_due2_S1 = katex.renderToString(latex_due2_S1, {displayMode: false, strict: false});
        
        // let latex_due2_S2 = "S_2 = \\dfrac{2ld\\tan\\left(\\sin^{-1}\\left(\\frac{h}{2l}\\right)\\right)}{h}";
        let latex_due2_S2 = "S_2 = \\dfrac{2ld}{\\sqrt{4l^2-h^2}}";
        latex_due2_S2 = katex.renderToString(latex_due2_S2, {displayMode: false, strict: false});

        let message = `The length of slant ${latex_S1} is ${S1} mm (rounded). This is due to ${latex_due2_S1}. <br /><br /> The length of slant ${latex_S2} is ${S2} mm (rounded). This is due to ${latex_due2_S2}. <br /><br />IMPORTANT: remember to make two pairs of slats. Pair 1 has ${latex_S1} on the left side and ${latex_S2} on the right side. Pair 2 has this reversed!`;
                                
        document.getElementById("output").innerHTML = message;
    };
    
    return false;
                        
};
