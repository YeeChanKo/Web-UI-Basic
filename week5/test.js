function ok(input) {
    message = "value is " + typeof (input);
    console.log(message);
}

function dummy(input, i, j) {
    var a = input[i];
    input[i] = input[j];
    input[j] = a;
    return input;
}


function swap(input1, input2) {
    var a = input1;
    input1 = input2;
    input2 = input1;
}

function rever(input){
    for(var i=0; i<input.length/2; i++)
    {
        swap(input, i, input.length-1-i);
    }
    return input;
}

function dummy(input, i, j) {
    var a = input[i];
    input[i] = input[j];
    input[j] = a;
    return input;
}