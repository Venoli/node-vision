var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
require('dotenv').config({ debug: true })

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = [];
  // Your code starts here //

  // AWS Configerations
  AWS.config.update({region:process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    })
  
  const client = new AWS.Rekognition();
  var imageData = Buffer.from(req.files.file.data, 'base64');
  
    const params = {
      Image: {
            Bytes: imageData
          }
    }
    
    client.detectLabels(params, function(err, awsResponse) {
     if (err) {
      console.log(err, err.stack); // if an error occurred

      error =  "Unable to process the request"
      ErrorHandling(error)

    } else {
     
      console.log('d1',response)

      response = awsResponse.Labels.map((label) => label.Name)
      console.log('d2',response)
      DetectLabel(response)

    } 
    });

    const ErrorHandling = (error) => {
      res.json({
        "error": "Unable to process the request"
      });
    }

  const DetectLabel = (response) => {
  // Your code ends here //
  res.json({
    "labels": response
  });
}

});

module.exports = router;
