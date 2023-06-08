const fs = require('fs');
const  https = require('https');
const path = require('path');
const download = require('download');

async function downloadVideo(stream_url, video_name){
    // https.get(stream_url, (res) => {
    //     console.log(res);
    //     let name = new Date().getTime().toString();
    //     const folderPath = path.resolve('downloads/');
    //     const stream = fs.createWriteStream(name+'.mp4');
    //     res.pipe(stream);
    //     stream.on('finish', () => {
    //         stream.close();
    //     });
    // })
    await download(stream_url, __dirname).then(() =>{ console.log("file downloaded"); });
    return "done";
}

(async function(){
    var t =await downloadVideo('https://www.instagram.com/tv/CjK9OJSJV37/?utm_source=ig_web_copy_link', '');
    console.log(t);
//
})();

// var t =  console.log(__dirname);