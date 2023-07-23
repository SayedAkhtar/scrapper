const { API, REFRESH_INTERVAL } = require('../config.js');
const { createClient } = require('redis');
const { logger } = require('../logger.js');

async function getUsers(processing_status = 'none') {
    try {
        const response = await fetch(API + 'api/tracking?processing_status=' + processing_status)
        const users = await response.json()
        console.log(users, processing_status);
        return users
    } catch (e) {
        throw e;
    }
}

async function insertUsersIntoRedis(status = 'none') {
    try {
        const client = createClient(6379, '127.0.0.1');
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        setInterval(async () => {
            const users = await getUsers(status);
            users.forEach(async user => {
                await client.set("USER:" + user.user_name, user.processing_status);
            });
            console.log("Users inserted into redis");
        }, REFRESH_INTERVAL * 1000);
    } catch (err) {
        logger.error(err.toString());
    }

}

async function insertUsersIntoRedisOnce() {
    try {
        const client = createClient(6379, '127.0.0.1');
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        const users = await getUsers("processed");
        users.forEach(async user => {
            await client.set("USER:" + user.user_name, user.processing_status);
        });
        console.log("Users inserted into redis");
    } catch (err) {
        logger.error(err.toString());
    }

}

function runAtSpecificTimeOfDay(hour, minutes, func) {
    const twentyFourHours = 86400000;
    const now = new Date();
    let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    if (eta_ms < 0) {
        eta_ms += twentyFourHours;
    }
    setTimeout(function () {
        //run once
        func();
        setInterval(func, twentyFourHours);
    }, eta_ms);
}


()=> runAtSpecificTimeOfDay(10, 0, () => { insertUsersIntoRedisOnce(); });

// if (require.main === module) {
//     const args = process.argv.slice(2);
//     if (args.length == 1) {
//         if(args[0] == "daily"){
//             insertUsersIntoRedisOnce();
//         }
//         else{
//             insertUsersIntoRedis();
//         }
//     } else {
//       console.error(
//         "Please provide a username  \nUsage: node service/insert_into_redis.js (daily or minutes)"
//       );
//     }
//   }

insertUsersIntoRedis();
// insertUsersIntoRedisOnce();