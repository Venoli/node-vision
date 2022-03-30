var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
require('dotenv').config({ debug: true })


router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = [];
  // Your code starts here //

  /***************************************************************
  Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)
  *****************************************************************/

  // AWS Configurations
  AWS.config.update({
    region:process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    })

  // Rekognition API
  const client = new AWS.Rekognition();

  //Read Image Data
  var imageData = Buffer.from(req.files.file.data, 'base64');

  const params = {
      Image: {
            Bytes: imageData
          }
    }
    
  //Calling Rekognition API 
  client.detectLabels(params, function(err, awsResponse) {
     if (err) {
        console.log('Error: ',err);
        HandleErrors(err)

      } else {
        response = awsResponse.Labels.map((label) => label.Name)
        console.log('Response: ',response)
        GettLabels(response)
      } 
    });


  // Error Handling
  const HandleErrors = (err) => {
    /**************************************************
    Code adapted from ExpressJs Documentation example:
    https://expressjs.com/en/api.html#res
    **************************************************/
       res.status(500).json({ "error":"Unable to process the request" });
  }


  //Setting up the json response
  const GettLabels = (response) => {
  // Your code ends here //
  res.json({
    "labels": response
  });
}

});

module.exports = router;
