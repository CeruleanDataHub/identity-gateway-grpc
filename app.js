/* eslint-disable strict */
'use strict';

const grpc = require('grpc');
//const mqtt = require('azure-iot-device-mqtt').Mqtt;
//const ModuleClient = require('azure-iot-device').ModuleClient;
//const DeviceClient = require('azure-iot-device').Client;
//const Message = require('azure-iot-device').Message;
const proto = require('@ceruleandatahub/proto');

function createGRPCServer() {
  console.log('Starting gRCP Server');
  const server = new grpc.Server();
  server.addService(proto.CurrentLoopProto.CurrentLoop.service, {
    sendTelemetry: sendTelemetry
  });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

createGRPCServer();

/*let moduleClient;
ModuleClient.fromEnvironment(mqtt, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    client.onMethod(DEVICE_REGISTRATION_METHOD_NAME, (request, response) => {
      console.log(`${DEVICE_REGISTRATION_METHOD_NAME} method called`, request);
      handleDeviceRegistrationMessage(request.payload);
      response.send(200, '', function (err) {
        if (err) {
          console.log(
            `Error sending response to ${DEVICE_REGISTRATION_METHOD_NAME} method`,
            err
          );
        } else {
          console.log(
            `Response to ${DEVICE_REGISTRATION_METHOD_NAME} method sent successfully`
          );
        }
      });
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
});*/

function sendTelemetry(call, callback) {
  console.log(call.request);

  /*const msg = new Message(JSON.stringify(call.request));

  msg.properties.add('type', 'telemetry');
  msg.properties.add(
    'level',
    messageLevelHandler.resolveLevel(
      telemetryData,
      alreadyDiscoveredDevice.deviceTwin
    )
  );
  console.log('Send msg', JSON.stringify(msg));
  moduleClient.sendEvent(msg, printResultFor('send'));*/
  callback(null, {hash: call.request.hash});
}
