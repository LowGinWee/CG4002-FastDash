// Create a client instance
client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "G17_123");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

var count = -1;


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("ChiHenIsASexyBoi/1");
  message = new Paho.MQTT.Message("DASHBOARD CONNECTED! DANCE TO START");
  message.destinationName = "ChiHenIsASexyBoi/1";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
	count = count + 1;
  console.log("onMessageArrived:"+message.payloadString);
  document.getElementById("Main").innerHTML = message.payloadString;
  document.getElementById("DanceNum").innerHTML = count;
}
