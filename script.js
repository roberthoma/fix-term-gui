var fix_term_url = "http://localhost:8081"

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

// var fix_symbol_id = GetURLParameter(fix_term_url+"/monitor?fix_symbol_id=1");
var fix_symbol_id = "1" 

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
  request.open("GET", fix_term_url+"/start");
  request.send();

  request.onload = (e) => {
    alert(request.response);
  }

}


function logoutServer() {

  var request = new XMLHttpRequest();
  request.open("GET", fix_term_url+"/logout");
  request.send();
  document.getElementById("demo").innerHTML = "User is logout";
}


function globalAutoTradingSwitch(){

  
}




async function tradeByMarket(cmd_val) {

  document.getElementById("actionInfo").innerHTML = "Action :"+cmd_val;
  document.getElementById("actionErr").innerHTML = "";

  var cmd_url=fix_term_url+"/command?cmd="+cmd_val+"&fix_symbol_id="+fix_symbol_id

  fetch(cmd_url)
          .then(result => result.text())
          .then((output) => {  document.getElementById("actionErr").innerHTML = output;})
          .catch(err => document.getElementById("actionErr").innerHTML=err);


}


async function chageParam(cmd_val,param_symbol){

  document.getElementById("actionInfo").innerHTML = "Action :"+cmd_val;
  document.getElementById("actionErr").innerHTML = "";

  var cmd_url=fix_term_url+"/command?cmd="+cmd_val+"&fix_symbol_id="+fix_symbol_id+"&param_symbol="+param_symbol;

  fetch(cmd_url)
          .then(result => result.text())
          .then((output) => {  document.getElementById("actionErr").innerHTML = output;})
          .catch(err => document.getElementById("actionErr").innerHTML=err);

  refreshTradeParameters();
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

    fetch(fix_term_url+'/fix-term-logs')
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


function generateParametersTable(params,tab_param_id){


  var tablearea = document.getElementById(tab_param_id ),
      table = document.createElement('table');

  for (var i = 0; i < params.length; i++) {
      var tr = document.createElement('tr');

      tr.appendChild( document.createElement('td') );
      var tr_id = document.createElement('td'); 
      tr_id.setAttribute("id",params[i].symbol);
      tr.appendChild( tr_id);
      tr.appendChild( document.createElement('td') );

      tr.cells[0].appendChild( document.createTextNode(params[i].label) )
      tr.cells[1].appendChild( document.createTextNode(params[i].value) );
      tr.cells[2].appendChild( document.createTextNode(params[i].unit) );


      table.appendChild(tr);
  }

  tablearea.appendChild(table);

}



function generateMonitorDataTable(params,tab_name){


  var tablearea = document.getElementById(tab_name),
      table = document.createElement('table');

  for (var i = 0; i < params.length; i++) {
      var tr = document.createElement('tr');

      tr.appendChild( document.createElement('td') );
      
      var tr_id = document.createElement('td'); 
      tr_id.setAttribute("id",params[i].symbol);
      tr.appendChild( tr_id);
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



function setValueFromList(params){
  for (var i = 0; i < params.length; i++) {
     var elementId = document.getElementById(params[i].symbol);
     if(elementId !== null ) 
     {
      document.getElementById(params[i].symbol).innerHTML = params[i].value;
     }   
  }  
}



async function refreshMarketDataTable(params){
  setValueFromList(params);

  fetch(fix_term_url+'/market-data-values?fix_symbol_id='+fix_symbol_id)
      .then(result => result.json())
      .then((output) => {refreshMarketDataTable(output);})
      .catch(err => console.error(err));


}

function refMarketDataTable(){
  refreshMarketDataTable("");
}


async function refreshTradeParameters(){


  fetch(fix_term_url+'/trade-parameters-values?fix_symbol_id='+fix_symbol_id)
      .then(result => result.json())
      .then((output) => {setValueFromList(output);})
      .catch(err => console.error(err));


}


async function setTradeParameters(){

  fetch(fix_term_url+'/trade-parameters-dic?fix_symbol_id='+fix_symbol_id)
        .then(result => result.json())
        .then((output) => {generateParametersTable(output,'trade_params_tab');})
        .catch(err => console.error(err));
    
  refreshTradeParameters();

}


async function refreshIndicatorsParameters(){


  fetch(fix_term_url+'/indicators-parameters-values?fix_symbol_id='+fix_symbol_id)
      .then(result => result.json())
      .then((output) => {setValueFromList(output);})
      .catch(err => console.error(err));


}

async function setIndicatorsParameters(){

  fetch(fix_term_url+'/indicators-parameters-dic?fix_symbol_id='+fix_symbol_id)
        .then(result => result.json())
        .then((output) => {generateParametersTable(output,'indcators_parameters_tab');})
        .catch(err => console.error(err));
    
  refreshIndicatorsParameters();

}



function loadMonitor() {

  fetch(fix_term_url+'/dic-instrument?fix_symbol_id='+fix_symbol_id)
      .then(result => result.json())
      .then((output) => {setInstrument(output);})
      .catch(err => console.error(err));


  setTradeParameters();
  
  setIndicatorsParameters();


  fetch(fix_term_url+'/position-data-dic')
      .then(result => result.json())
      .then((output) => {generateMonitorDataTable(output,'position_data_tab');})
      .catch(err => console.error(err));
    
    
  fetch(fix_term_url+'/market-data-dic')
      .then(result => result.json())
      .then((output) => {generateMonitorDataTable(output,'market_data_tab');})
      .catch(err => console.error(err));
  
  
  refMarketDataTable();

}
