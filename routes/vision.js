var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
require('dotenv').config({ debug: true })

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = [];
  // Your code starts here //

  // AWS Configurations
  AWS.config.update({
    region:process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    })

  // Calling Rekognition API
  const client = new AWS.Rekognition();
  var imageData = Buffer.from(req.files.file.data, 'base64');
  
    const params = {
      Image: {
            Bytes: imageData
          }
    }
    
    client.detectLabels(params, function(err, awsResponse) {
     if (err) {
      console.log(err, err.headers); // if an error occurred

      HandleErrors(err)

    } else {
     
      console.log('d1',response)

      response = awsResponse.Labels.map((label) => label.Name)
      console.log('d2',response)
      GettLabels(response)

    } 
    });

    const HandleErrors = (err) => {
       res.status(500).json({ "error":"Unable to process the request" });
    }

  const GettLabels = (response) => {
  // Your code ends here //
  res.json({
    "labels": response
  });
}

});

module.exports = router;
