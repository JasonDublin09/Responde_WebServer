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
      to: "+63"+values
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

  //so this snippet can get all of the numbers and send all of them to twilio to the phones?