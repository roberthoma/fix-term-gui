function toggle(id) {
    let button = document.getElementById(id);
    if (button.style.display == 'block') {
        button.style.display = 'none';
    } else {
        button.style.display = 'block';
    }
}

function startServer() {

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8081/start");
  request.send();

  request.onload = (e) => {
    alert(request.response);
  }

}


function logoutServer() {

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8081/logout");
  request.send();
  document.getElementById("demo").innerHTML = "User is logout";
}


function tradeByMarket(cmd_val) {
  console.log(cmd_val);
  var request = new XMLHttpRequest();
  var cmd_url="http://localhost:8081/command?cmd="+cmd_val+"&fix-symbol=1"
  request.open("GET", cmd_url);
  request.send();

<!--  request.onload = (e) => {-->
<!--    alert(request.response);-->
<!--  }-->
}




function setInstrument(instrument){

  document.getElementById("instrumentSymbol").innerHTML = instrument.symbol;
  document.getElementById("instrumentDesc").innerHTML = instrument.description;


}


// function setTradeParameters(trade_params){

//   document.getElementById("parvalue").innerHTML = trade_params.QUANTITY;

//   for (const [key, value] of Object.entries(trade_params)) {
//      console.log(`${key}: ${value}`);
//   }

// }

function generateTradeParametersTable(params){


  var tablearea = document.getElementById('tablearea'),
      table = document.createElement('table');

  for (var i = 0; i < params.length; i++) {
      var tr = document.createElement('tr');

      tr.appendChild( document.createElement('td') );
      tr.appendChild( document.createElement('td') );
      tr.appendChild( document.createElement('td') );

      tr.cells[0].appendChild( document.createTextNode(params[i].label) )
      tr.cells[1].appendChild( document.createTextNode(params[i].value) );
      tr.cells[2].appendChild( document.createTextNode(params[i].unit) );


      table.appendChild(tr);
  }

  tablearea.appendChild(table);

}


function loadMonitor(instrumentId) {

  fetch('http://localhost:8081/dic-instrument?fix-symbol='+instrumentId)
      .then(result => result.json())
      .then((output) => {setInstrument(output);})
      .catch(err => console.error(err));



  fetch('http://localhost:8081/trade-parameters?fix-symbol='+instrumentId)
      .then(result => result.json())
      .then((output) => {generateTradeParametersTable(output);})
      .catch(err => console.error(err));




}
