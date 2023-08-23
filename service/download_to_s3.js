const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../config');
const { logger, scrapperLogger } = require('../logger');
const scrapingbee = require('scrapingbee');
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
    scrapperLogger.info('Image uploaded to S3: '+ s3UploadResponse.Location);
    return Promise.resolve(s3UploadResponse.Location);
  } catch (error) {
    logger.info('Error:', error);
  }
}

// async function get(url){                          //api key provided in trace group by pinaki 
//    client = new scrapingbee.ScrapingBeeClient('TQ9CDAZSORUPU1NMZXZEM11VY7K3NC3HJPBNYP2V4CZZXUY9SWEULNDHOZ77XGWO9FA9A12XWFVWUBZJ');
//   var response = await client.get({
//     url : url,
//     params:{

//     },
//   })
// }
// my_request = get(instagramImageUrl); 

// my_request.then(function(response){
//   console.log("status code: ", response.status)
//   var decode= new TextDecoder();
//   var text = decoder.decode(response.data);
//   var JsonData = JSON.parse(text);
//   console.log("Response content ", JsonData);
// }).catch((e) => console.log("A problem occurs : "+e));



module.exports = downloadImageAndUploadToS3

// downloadImageAndUploadToS3('virat.kholi','yiuhkda', 'reel', "https://scontent-del1-2.cdninstagram.com/v/t66.30100-16/10000000_984159619390966_4345148973288734002_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjEwODAuY2xpcHMuaGlnaCIsInFlX2dyb3VwcyI6IltcImlnX3dlYl9kZWxpdmVyeV92dHNfb3RmXCJdIn0&_nc_ht=scontent-del1-2.cdninstagram.com&_nc_cat=110&_nc_ohc=Zxunc3AxGjAAX-8GC8X&edm=ACHbZRIBAAAA&vs=836515061457017_3744474069&_nc_vs=HBksFQAYJEdJQ1dtQUQySFlTRUZuOERBREk5QnpuNEVVMDhicFIxQUFBRhUAAsgBABUAGCRHUFZKLUFMa0xMUGRSa2dDQUpEWDRhVWtIWXBOYnBSMUFBQUYVAgLIAQAoABgAGwAVAAAmkoaxzLyr10AVAigCQzMsF0BPxDlYEGJOGBJkYXNoX2hpZ2hfMTA4MHBfdjERAHX%2BBwA%3D&ccb=7-5&oh=00_AfAoveU1dTqrXglG8W2uiVvxitTGcy1K63JqC3kPLdpcsw&oe=64D6B3A4&_nc_sid=c024bc");