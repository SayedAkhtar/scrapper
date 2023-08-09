const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../config');
const { logger, scrapperLogger } = require('../logger');

// Set up AWS credentials and S3 bucket details
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

// Replace this URL with the actual Instagram image URL you want to download

async function downloadImageAndUploadToS3(username, postname, type, instagramImageUrl) {
  try {
    // Download the image from Instagram
    const response = await axios.get(instagramImageUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    const imageBuffer = Buffer.from(response.data, 'binary');
    const EXT = contentType.split('/')[1];
    const filename = postname+'/'+username+'/'+Date.now().toString()+'-'+postname+'.'+EXT;
    // Upload the image to S3
    const uploadParams = {
      Bucket: 'scrapperfiles',
      Key: filename, // Change the filename and extension as needed
      Body: imageBuffer,
      ACL: 'public-read', // Set the appropriate ACL for your use case
      ContentType: contentType, // Change the content type based on the image type
    };

    const s3UploadResponse = await s3.upload(uploadParams).promise();
    scrapperLogger.info('Image uploaded to S3:', s3UploadResponse.Location);
    return Promise.resolve(s3UploadResponse.Location);
  } catch (error) {
    logger.info('Error:', error);
  }
}

module.exports = downloadImageAndUploadToS3