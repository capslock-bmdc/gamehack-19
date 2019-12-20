var globalKey = "";

var url_string = window.location.href;
var url = new URL(url_string);
var auto = url.searchParams.get("auto");
console.log(auto);

switch (auto) {
  case "timer":
    globalKey = "t";
    timer(new Date("December 20, 2019 05:30:00").getTime());
    break;
  case "customTimer":
    customTimer();
    break;
  default:
    listen();
}


function countdown() {
  var position = 45;
  var x = setInterval(() => {
    if (position === 0) {
      clearInterval(x);
      return;
    }

    if (globalKey !== "c") {
      clearInterval(x);
      return;
    }
    var positionString = position;
    if (positionString < 10) positionString = "0" + positionString;
    const color = position % 2 === 1 ? "#ed3142" : "#FFFFFF";
    document.getElementById("countdown").style.color = color;
    document.getElementById("countdown").innerHTML = "00:00:" + positionString;
    position--;
  }, 1000);
}

function timer(deadline) {
  var x = setInterval(() => {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (globalKey !== "t") {
      clearInterval(x);
      return;
    }
    if (hours * 60 + minutes <= 30) {
      const color = seconds % 2 === 1 ? "#ed3142" : "#FFFFFF";
      document.getElementById("countdown").style.color = color;
    }
    document.getElementById("countdown").innerHTML =
      hours + ":" + minutes + ":" + seconds;
    if (t < 0) {
      clearInterval(x);
      return;
    }
  }, 1000);
}
