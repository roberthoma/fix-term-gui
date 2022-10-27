function toggle(id) {
    let button = document.getElementById(id);
    if (button.style.display == 'block') {
        button.style.display = 'none';
    } else {
        button.style.display = 'block';
    }
}

function startServer() {
  document.getElementById("demo").innerHTML = "ZMiana z funnn.";

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8081/start");
  request.send();

  request.onload = (e) => {
    alert(request.response);
  }

}


function logoutServer() {
  document.getElementById("demo").innerHTML = "ZMiana z funnn.";

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8081/logout");
  request.send();
}


function tradeByMarket(cmd_val) {
  console.log(cmd_val);
  var request = new XMLHttpRequest();
  var cmd_url="http://localhost:8081/command?cmd="+cmd_val+"&instrument=1"
  request.open("GET", cmd_url);
  request.send();

<!--  request.onload = (e) => {-->
<!--    alert(request.response);-->
<!--  }-->
}
