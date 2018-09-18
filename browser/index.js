{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script> */ }

// Create a client instance


// connect the client
// client.connect({ onSuccess: onConnect });


// called when the client connects
function connect() {

  let conexao = document.getElementById('conexao');
  let host = conexao.host.value;
  let port = conexao.port.value;
  console.log(host);
  console.log(port);

  let broker = "test.mosquitto.org";
  //let port = 8080;
  client = new Paho.MQTT.Client(broker, Number(port), "clientId");
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
}

function subscribe(topic) {
  var qos = Number(2);
  console.log("INFO", "Subscribing to: [Topic: ", topic, ", QoS: ", qos, "]");
  client.subscribe(topic, { qos: Number(qos) });
}

function publish(topic, text) {
  let message = new Paho.MQTT.Message(text);
  message.destinationName = topic;
  message.qos = Number(2);
  message.retained = true;
  client.send(message);
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
}

function unsubscribe() {
  var topic = document.getElementById("subscribeTopicInput").value;
  console.log("INFO", "Unsubscribing: [Topic: ", topic, "]");
  client.unsubscribe(topic, {
    onSuccess: unsubscribeSuccess,
    onFailure: unsubscribeFailure,
    invocationContext: { topic: topic }
  });
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) 
    console.log("onConnectionLost:" + responseObject.errorMessage);
}

function unsubscribeSuccess(context) {
  console.log("INFO", "Unsubscribed. [Topic: ", context.invocationContext.topic, "]");
}

function unsubscribeFailure(context) {
  console.log("ERROR", "Failed to unsubscribe. [Topic: ", context.invocationContext.topic, ", Error: ", context.errorMessage, "]");
}