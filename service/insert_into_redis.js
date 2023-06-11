const { API, REFRESH_INTERVAL } = require('../config.js');
const { createClient } = require('redis');
const {logger} = require('../logger.js');

async function getUsers() {
  const response = await fetch(API+'/api/tracking?processing_status=none')
  const users = await response.json()
  console.log(users)
  return users
}

async function insertUsersIntoRedis() { 
    try{
        const client = createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        setInterval(async () => {
            const users = await getUsers();
            users.forEach(async user => {
                await client.set("USER:"+user.user_name, user.processing_status, {EX: REFRESH_INTERVAL});
            });
        }, REFRESH_INTERVAL);
    }catch(err){
        logger.error(err);
    }
    
}

insertUsersIntoRedis();