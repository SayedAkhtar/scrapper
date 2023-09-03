const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
const { createClient } = require('redis');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, API } = require('../config');
const { logger, scrapperLogger } = require('../logger');
const scrapingbee = require('scrapingbee');
const { exit } = require('process');
const { sleep } = require('../helpers/Utils');
const { throws } = require('assert');

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
    const filename = username + '/' + type + '/' + postname + '.' + EXT;
    // Upload the image to S3
    const uploadParams = {
      Bucket: 'scrapperfiles',
      Key: filename, // Change the filename and extension as needed
      Body: imageBuffer,
      ACL: 'public-read', // Set the appropriate ACL for your use case
      ContentType: contentType, // Change the content type based on the image type
    };

    const s3UploadResponse = await s3.upload(uploadParams).promise();
    // scrapperLogger.info('Image uploaded to S3:' + s3UploadResponse.Location);
    return Promise.resolve(s3UploadResponse.Location);
  } catch (error) {
    throw error;
  }
  return Promise.resolve(false);
}

async function getUsernames() {
  // const response = await axios.get(API+'api/tracking?processing_status=processed');
  // const users = await response.data;
  let username;
  const users = ['sushmitha_sheshagiri'];
  users.forEach(async user => {
    try {
      username = user;
      // if(username == "dishapatani"){
      //   return;
      // }
      // username = "theanassander11"
      const reels = await axios.get(API + 'api/reel?user_name=' + username);
      const compObj = [];
      for (const reel of reels.data) {
        // if(reel.s3_storage_url.length > 0){
        //   return;
        // }
        const update = [];
        const reelId = reel.reel_id;
        const s3_url = await downloadImageAndUploadToS3(username, reelId, 'reel', reel.reel_url);
        if (s3_url) {
          update.push({ "url": s3_url, "type": "reel" });
        }
        for (const obj of reel.storage_url) {
          let s3_url2 = await downloadImageAndUploadToS3(username, reelId, obj.type, obj.url);
          if (s3_url2) {
            update.push({ "url": s3_url2, "type": "reel" });
          }
        }
        const newReel = {};
        newReel.reel_id = reel.reel_id
        newReel.s3_storage_url = update;
        await postReelsDataToMongo([newReel], username);
        await sleep(2);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.statusText);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  });

}

async function fromRedis() {
  try {
    const client = createClient(6379, '127.0.0.1');
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    const keys = await client.KEYS("download_*");
    for (const reel of keys) {
      const data = await client.get(reel);
      const reelsData = JSON.parse(data);
      const update = [];
      const reelId = reelsData.type == 'reel' ? reelsData.postname: reelsData.post_id;
      try{
        console.log(reelsData);
        if(reelsData.hasOwnProperty('url')){
          const s3_url = await downloadImageAndUploadToS3(reelsData.username, reelId, reelsData.type, reelsData.url);
          if (s3_url) {
            update.push({ "url": s3_url, "type": reelsData.type });
          }
          if(reelsData.hasOwnProperty('thumbnail')){
            const thumbnail = await downloadImageAndUploadToS3(reelsData.username, reelId, "thumbnail", reelsData.thumbnail);
            update.push({ "url": thumbnail, "type": "thumbnail" });
          }
          console.log(s3_url, update);
          const newReel = {};
          newReel.reel_id = reelId
          newReel.s3_storage_url = update;
          await postReelsDataToMongo([newReel], reelsData.username);
          await sleep(1);
        }
      }catch(e){
        throw e;
      }
      await client.del(reel);
    }
  } catch (e) {
    console.log(e);
  }
}

async function postReelsDataToMongo(req, username = "") {
  const options = {
    method: "POST",
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let res = await fetch(API + "api/reel", options);
    if (res.status == 200 || res.status == 200) {
      let data = await res.json();
      console.log("================= Success ====================")
      console.log(username);
      return true;
    } else {
      console.log(res);
    }
  } catch (e) {
    console.log("================= Data Post Error ====================")
    console.log(e);
  }
  return false;
}

fromRedis();
setInterval(async () => {
  fromRedis();
}, 100 * 1000);


async function deleteAllObjects(bucketName) {
  for(let i =0; i< 20; i++){
    try {
      const listParams = { Bucket: bucketName };
      const objects = await s3.listObjectsV2(listParams).promise();
  
      if (objects.Contents.length === 0) {
        console.log('No objects found in the bucket.');
        return;
      }
  
      const deleteParams = {
        Bucket: bucketName,
        Delete: { Objects: objects.Contents.map(obj => ({ Key: obj.Key })) },
      };
  
      const deletedObjects = await s3.deleteObjects(deleteParams).promise();
      console.log('Deleted objects:', deletedObjects.Deleted.length);
      await sleep(2);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  

}


// downloadImageAndUploadToS3('dasd','dasdas','dasdas','dasdas');
module.exports = downloadImageAndUploadToS3
