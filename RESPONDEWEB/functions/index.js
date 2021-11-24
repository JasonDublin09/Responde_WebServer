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

  const arr = data.emcon;
  // arr.forEach(element => {
//     return client.messages
//     .create({
//       body: "A Report has been sent to the Fire Station from " + data.name + " at this location " + data.home, 
//       to: "+63"+element,
//       from:'+15155237903',
//     })
//     .then(message=>console.log(message.sid)).done()
    
//   });
// });

  // return client.messages 
  // .create({ 
  //    body: "A Report has been sent to the Fire Station from " + data.name + " at this location " + data.home, 
  //    from: '+15155237903',       
  //    to: "+63"+data.emcon[0]
  //  }) 
  // .then(message => console.log(message.sid)) 
  // .done();

  return Promise.all(arr.map(values=> {
    return client.messages
    .create({
      body: "A Report has been sent to the Fire Station from " + data.name + " at this location " + data.home,
      from: '+15155237903',
      to: values
    }).then(message=>console.log(message.sid))
  }))
});
// });
  
  
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

exports.confirmText= functions.https.onCall(async(data,context) => {
  return client.messages
  .create({
    body: "The fire station acknowledged the sent report , we are peparing the fire trucks and we will be on our way, keep safe.",
    from: '+15155237903',
    to:data
  }).then(message=>console.log(message.sid))
})

exports.fireText = functions.https.onCall(async(data,context) =>{
  const arr = ("+639166881491", "+639954528389", "+639457269207", "+639983740321")

  return Promise.all(arr.map(values=> {
    return client.messages
    .create({
      body: "Help. A fire has occured at this location" + data.home + ". We request assistance.",
      from: '+15155237903',
      to: values
    }).then(message=>console.log(message.sid))
  }))
});