"use strict";

function calc() {
    
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let inputObj = document.getElementById("dayslater");
    
    if (!inputObj.validity.valid) {
        document.getElementById("output").innerHTML = "Please enter a number between 0 and 9000000.";
    } else {
                
        let currentDay = Number(document.getElementById("currentday").value);
        let daysLater = Number(inputObj.value);
                                
        let modulo = daysLater % 7;
        let newDay = weekDays[(currentDay + modulo) % 7];
        
        let dayOrDays = "";
        
        if (daysLater == "1") {
            dayOrDays = "day";
        } else {
            dayOrDays = "days";
        };
                                
        let message = `If the current day is a ${weekDays[currentDay]}, then after ${daysLater} ${dayOrDays}, it'll be a ${newDay}.`;
                                
        document.getElementById("output").innerHTML = message;
    };
    
    return false;
                        
};
