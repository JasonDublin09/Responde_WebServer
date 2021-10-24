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

  // Henlooooo
  // So you said kanina right na nahihirapan mag-function call kapag marami?

  //yea 

  //so far ung client.messages na yan kaya lng pa isa isa na request
  //so if madaming contacts ang sesendan it takes a long time to process all of the requests
  //tho it sends naman kaagad ung request sa firebase 
  
  // Hmmmmm I think what you can do is use data as an array and then process it here
  // imma provide a code snippet here
  // wherein data is an array of 'to' data
  
  // return Promise.all(data.map(datum => {
  //   return client.messages 
  // .create({ 
  //    body: 'foo', 
  //    from: '+15155237903',       
  //    to: datum
  //  })
  // })).then(messages => {
  //   for(const message of messages) {
  //     console.log(message.sid);
  //     message.done()
  //   }
  // })

  //so this snippet can get all of the numbers and send all of them to twilio to the phones?
  
});
