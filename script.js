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


function globalAutoTradingSwitch(){

  
}




async function tradeByMarket(cmd_val) {

  document.getElementById("actionInfo").innerHTML = "Action :"+cmd_val;
  document.getElementById("actionErr").innerHTML = "";

  var cmd_url="http://localhost:8081/command?cmd="+cmd_val+"&fix_symbol=1"

  fetch(cmd_url)
          .then(result => result.text())
          .then((output) => {  document.getElementById("actionErr").innerHTML = output;})
          .catch(err => document.getElementById("actionErr").innerHTML=err);


}


async function chageParam(fix_symbol,cmd_val,param_symbol){

  document.getElementById("actionInfo").innerHTML = "Action :"+cmd_val;
  document.getElementById("actionErr").innerHTML = "";

  var cmd_url="http://localhost:8081/command?cmd="+cmd_val+"&fix_symbol="+fix_symbol+"&param_symbol="+param_symbol;

  fetch(cmd_url)
          .then(result => result.text())
          .then((output) => {  document.getElementById("actionErr").innerHTML = output;})
          .catch(err => document.getElementById("actionErr").innerHTML=err);

}



async function writefixTermLogs(logs) {
   // document.getElementById("fixlog").innerHTML = logs+"<br>";

  var tablearea = document.getElementById('fixlog'),
      table = document.createElement('table');

  var tr = document.createElement('tr');

      tr.appendChild( document.createElement('td') );
      tr.cells[0].appendChild( document.createTextNode(logs) )
      table.appendChild(tr);

  tablearea.appendChild(table);


}



async function fixTermLogs(logs) {
    
    writefixTermLogs(logs);


    // var el = document.getElementById('fixlog');
    // el.appendChild(document.createTextNode(logs.symbol));
    // el.appendChild(document.createElement('br'));  

    fetch('http://localhost:8081/fix-term-logs')
          .then(result => result.text())
          .then((output) => {fixTermLogs(output);})
          .catch(err => {
                          console.error(err);
                        });


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


  var tablearea = document.getElementById('trade_params_tab'),
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


function loadIndex() {

  fixTermLogs("")

}


function loadMonitor(instrumentId) {

  fetch('http://localhost:8081/dic-instrument?fix_symbol='+instrumentId)
      .then(result => result.json())
      .then((output) => {setInstrument(output);})
      .catch(err => console.error(err));



  fetch('http://localhost:8081/trade-parameters?fix_symbol='+instrumentId)
      .then(result => result.json())
      .then((output) => {generateTradeParametersTable(output);})
      .catch(err => console.error(err));


  


}
