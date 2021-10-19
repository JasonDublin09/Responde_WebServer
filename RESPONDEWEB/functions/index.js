const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const twilio = require('twilio')
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = new twilio(accountSid,authToken);

exports.sendText = functions.https.onCall(async(data,context) =>{
  

  return client.messages 
  .create({ 
     body: 'foo', 
     from: '+15155237903',       
     to: data
   }) 
  .then(message => console.log(message.sid)) 
  .done();
});
