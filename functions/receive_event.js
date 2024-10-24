const functions = require('firebase-functions');

exports.receiveEvent = functions.https.onRequest((req, res) => {
    console.log('Received data:', req.body);
    res.status(200).send('Data received');
});