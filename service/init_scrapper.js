const { createClient } = require('redis');
const {logger} = require('../logger.js');
const getProfileStats = require('../instagram/profile_stats.js');
const getProfilePostsFromApi = require('../instagram/profile_posts.js');
const { sleep } = require('../helpers/Utils.js');

async function init(){
    let users = [];
    const client = createClient(6379, '127.0.0.1');
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    console.log("Connected to redis");
    let keys = await client.KEYS('*');
    for(let i = 0, len = keys.length; i < len; i++) {
        users.push(keys[i].split(':')[1]);
    }
    // client.keys('USER:johndoe', (err, keys) => {
    //     console.log(keys);
    //     if (err) return console.log(err);
        // for(let i = 0, len = keys.length; i < len; i++) {
        //     users.push(keys[i].split(':')[1]);
        // }
    // })
    users.forEach(async user => {     
        let status = await getProfileStats(user);
        if(status){
            let s = await getProfilePostsFromApi(user);
            await client.del("USER:"+user);
            logger.info(`User ${user} deleted from redis`);
        }
        sleep(30);
    });
}

init();