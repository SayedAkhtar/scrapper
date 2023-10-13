const fs = require("fs").promises;
const { API } = require("../config");
const { logger, scrapperLogger } = require("../logger");

async function insertUsersToMongo(req) {
    let user = [
        {
            user_name: req.username,
            name: req.username,
            posts: req.postsCount,
            followers: req.followersCount,
            following: req.followingCount,
            // creation_date: date.toJSON().toString(),
            is_private: req.is_private,
            is_verified: req.is_verified,
            is_business: req.is_business,
        },
    ];
    const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
    };
    try {
        let res = await fetch(API + "api/user", options);
        let data = await res.json();
        scrapperLogger.info(
            `Profile stats for ${req.username} posted successfully`
        );
        return true;
    } catch (e) {
        console.log(e.toString());
        console.log("Log from insertUsersToMongo :"+e);
        logger.error(e.toString());
    }
    return false;
}

async function insertPostsToMongo(req) {
    const options = {
        method: "POST",
        body: JSON.stringify(req),
        headers: { "Content-Type": "application/json" },
    };
    try {
        let res = await fetch(API + "api/post", options);
        let data = await res.json();
        logger.info(`${req.user_name} post inserted`)
        if (res.status == 200) {
            console.log(req[0].user_name+" Posts Posted");
            return true;
        } else {
            logger.info(`${data.toString()}`)
        }

    } catch (e) {
        logger.error(e.toString());
        console.log("Log from insertPostsToMongo :"+e);
    }
    return false;
}


async function insertReelsToMongo(req, username = "") {
    const options = {
        method: "POST",
        body: JSON.stringify(req),
        headers: { "Content-Type": "application/json" },
    };
    try {
        let res = await fetch(API + "api/reel", options);
        let data = await res.json();

        if (res.status == 201 || res.status == 200) {
            console.log(req[0].user_name+" Posts Posted");
            return true;
        } else {
            logger.info(`${data.message}`);
        }
    } catch (e) {
        logger.error(e.toString());
        console.log("Log from insertReelsToMongo :"+e);
    }
    return false;
}

async function updateStatus(username) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        user_name: username,
        processing_status: "processed",
    });
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const res = await fetch(API + "api/tracking", requestOptions);
        const body = await res.json();
        console.log(body);
        scrapperLogger.info(`Status for ${username} updated successfully`);
        return true;
    } catch (e) {
        logger.error(e.toString());
        console.log(e);
    }
    return false;
}

exports.insertUsersToMongo = insertUsersToMongo;
exports.insertPostsToMongo = insertPostsToMongo;
exports.insertReelsToMongo = insertReelsToMongo;
exports.updateStatus = updateStatus;
