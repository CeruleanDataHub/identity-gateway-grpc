/* eslint-disable strict */
'use strict';

const grpc = require('grpc');
//const mqtt = require('azure-iot-device-mqtt').Mqtt;
//const ModuleClient = require('azure-iot-device').ModuleClient;
// const Message = require('azure-iot-device').Message;
const proto = require('@ceruleandatahub/proto');

//const OUTPUT_EVENT_NAMESPACE = process.env.OUTPUT_EVENT_NAMESPACE;
const GRPC_ADDRESS = process.env.GRPC_ADDRESS;

function createGRPCServer() {
  console.log('Starting gRPC Server');
  const server = new grpc.Server();
  server.addService(proto.CurrentLoopProto.CurrentLoop.service, {
    sendTelemetry: sendTelemetry
  });
  server.bind(GRPC_ADDRESS, grpc.ServerCredentials.createInsecure());
  server.start();
  return server;
}
createGRPCServer();
/**
let moduleClient;
ModuleClient.fromEnvironment(mqtt, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');
        moduleClient = client;
        createGRPCServer();
      }
    });
  }
});
**/
/**
const printResultFor = op => {
  return (err, res) => {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
};
**/
function sendTelemetry(call) {
  call.on('data', message => {
    console.log(message);
    console.log('Received message', JSON.stringify(message));
    call.write({hash: message.hash});
    //const message = new Message(JSON.stringify(call.request));

    //  message['type'] = 'telemetry';
    /*message.properties.add(
    'level',
    messageLevelHandler.resolveLevel(
      telemetryData,
      alreadyDiscoveredDevice.deviceTwin
    )
  );*/
    //moduleClient.sendEvent(message, printResultFor('Sending event to upstream'));
    /**
  moduleClient.sendOutputEvent(
    OUTPUT_EVENT_NAMESPACE,
    message,
    printResultFor(`Sending received message to ${OUTPUT_EVENT_NAMESPACE}`)
  );
  **/
  });
  call.on('end', function () {
    call.end();
  });
}
