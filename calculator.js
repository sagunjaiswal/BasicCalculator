//gives a comma separated value to aid reading
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");

  //toLocalString("en")
  /*the console log returned "123,456.78" which is the US (English) numeric representation of the number as specified by the 'en-US' locale parameter.
the console log returned "1,23,456.789" which is the India (English) numeric representation of the number as specified by the 'en-IN' locale parameter.*/
  return value;
}

//to remove those commas
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
//to get the history value
function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num == "") {
    // if this if statement is not present then the output will be 0 instead of blank
    document.getElementById("output-value").innerText = num;
  } else {
    //this will show result as comma separated value
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      //when clear button will be pressed
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      //when backspace will be pressed there will be a comma and then that will also we removed
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          //if last character is an operator
          history = history.substr(0, history.length - 1); //then remove it
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output; //when an operator is clicked it  is added to the history value
        if (this.id == "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
