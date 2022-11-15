function inputReturn(item){
    return document.querySelector(item); 
}
// var cardnum = document.querySelector("#card_num");
var cardnum = inputReturn("#card_num");
// var textbox = document.querySelector(".sec1"); 

const inputList = document.querySelectorAll("input"); 

inputList.forEach(madeBlank);
// add event Listner for each of the inputs
function madeBlank(item){
    item.addEventListener("click", function(){
        // var invalidInput = document.querySelector("." + item.id + ".invalid");
        var invalidInput = inputReturn("." + item.id + ".invalid");
        do{
            item.value = "";
        } while (item.value.length !== 0){
            invalidInput.innerHTML = "";
        }
    });
}

// print the input value to the external page 

inputList.forEach(printInput);
function printInput(item){
    var itemText = inputReturn("."+ item.id +".txt");

    item.onkeyup = function(){
        itemText.innerHTML = item.value;
    }
}


inputList.forEach(checkStructure);
// check if each input contains a correct structure : 
function checkStructure(item){
    switch(item.id){
        case "card_num":
            // item in this case = cardnum
            var invalid = inputReturn("." + cardnum.id + ".invalid");
            item.onchange = function(){
                if(item.value.length === 16 && (/^[0-9]+$/.test(item.value.length) === true)){
                    let val = item.value;
                    item.value = val.slice(0,4) + " " + val.slice(4,8) + " " + val.slice(8, 12) + " " + val.slice(12, 16); 
                    item.classList.remove("error");
                    invalid.innerHTML = "";
                } 
                else if(/^[0-9]+$/.test(item.value) === false){
                    invalid.innerHTML = "Wrong format, numbers only";
                    item.value = "";   
                    item.classList.add("error");     
                } 
                else {
                    invalid.innerHTML = "Invalid number of digits"; 
                    item.classList.add("error");
                }
            }

        case "month":
        case "year":
        case "cvcn":
            item.oninput = function(){
                if(/^[0-9]+$/.test(item.value) === false){
                    item.value="";
                }
            };
    }
}


// Action when complete button gets clicked 
// check if every input contains a value and if not, show which input is not empty 

var completeButton = document.querySelector(".confirm");
completeButton.addEventListener("click", checkInput);

const resultList = [];

function checkLength(input){
    if (input.value.length === 0){
        resultList.push(input);
    } 
}

function checkInput(){
    inputList.forEach(checkLength); 

    if (resultList.length === 0) {
        document.querySelector(".confirmed_page").setAttribute("href", "confirmed.html");
        alert("Your information has been submitted!"); 

    } else {
        // remove the href element of the <a></a> tag 
        document.querySelector(".confirmed_page").removeAttribute("href");

        resultList.forEach(function(item){
            var invalidInput = document.querySelector("." + item.id + ".invalid");

            if(item.value.length !== 0){
                item.classList.remove("error");
                resultList.pop();
            } else {
                item.classList.add("error");
                invalidInput.innerHTML = "Please fill out all the inputs.";
            }
        });
        

    }
}



