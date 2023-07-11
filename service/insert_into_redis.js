const { API, REFRESH_INTERVAL } = require('../config.js');
const { createClient } = require('redis');
const {logger} = require('../logger.js');

async function getUsers(processing_status = 'none') {
    try{
        const response = await fetch(API+'/api/tracking?processing_status='+processing_status)
        const users = await response.json()
        console.log(users);
        return users
    }catch(e){
        throw e;
    }
}

async function insertUsersIntoRedis() { 
    try{
        const client = createClient(6379, '127.0.0.1');
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        setInterval(async () => {
            const users = await getUsers();
            users.forEach(async user => {
                await client.set("USER:"+user.user_name, user.processing_status, {EX: REFRESH_INTERVAL});
            });
            console.log("Users inserted into redis");
        }, REFRESH_INTERVAL * 1000);
    }catch(err){
        logger.error(err.toString());
    }
    
}


insertUsersIntoRedis();