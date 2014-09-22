var url = "http://codepen.io/nigayo/pen/EjbcK.js";
var request = new XMLHttpRequest();
request.open("GET", url, true);
request.send(null);

request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        result = request.responseText;
        result = JSON.parse(result);
        console.log("new title is ", result.title);
    }
}