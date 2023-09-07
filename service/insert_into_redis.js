const { API, REFRESH_INTERVAL } = require('./../config');
const { createClient } = require('redis');
const { logger } = require('../logger.js');

async function getUsers(processing_status = 'none') {
    try {
        console.log(API + 'api/tracking?processing_status=' + processing_status);
        const response = await fetch(API + 'api/tracking?processing_status=' + processing_status)
        console.log(response);
        const users = await response.json()
        console.log(users);
        return users
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function insertUsersIntoRedis(status = 'none') {
    try {
        console.log("Print");
        const client = createClient(6379, '127.0.0.1');
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        console.log("Print");
        // setInterval(async () => {
            const users = await getUsers(status);
            console.log(users);
            if(users){
                users.forEach(async user => {
                    let bool = await client.exists("USER_NOW:" + user.user_name);
                    if(!bool){
                        await client.set("USER_NOW:" + user.user_name, user.processing_status);
                        console.log("Users inserted into redis");
                    }
                    // await client.set("USER_NOW:" + user.user_name, user.processing_status);
                });
            }
            console.log("No Users");
        // }, 1 * 1000);
    } catch (err) {
        console.log(err);
        logger.error(err.toString());
    }

}

// async function insertUsersIntoRedisOnce() {
//     try {
//         const client = createClient(6379, '127.0.0.1');
//         client.on('error', err => console.log('Redis Client Error', err));
//         await client.connect();
//         const users = await getUsers("processed");
//         users.forEach(async user => {
//             let bool = await client.exists("USER:" + user.user_name);
//             if(!bool){
//                 await client.set("USER:" + user.user_name, user.processing_status);
//             }
            
//         });
//         console.log("Users inserted into redis");
//     } catch (err) {
//         logger.error(err.toString());
//     }
// }

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


runAtSpecificTimeOfDay(10, 0, () => { insertUsersIntoRedisOnce(); });

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

getUsers();
// insertUsersIntoRedis();
// insertUsersIntoRedisOnce();