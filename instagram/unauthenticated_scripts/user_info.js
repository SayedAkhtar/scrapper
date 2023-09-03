// const axios = require('axios');
// const fs = require('fs').promises;

// async function userInfo(username) {
//     const res = await axios.get('https://app.scrapingbee.com/api/v1', {
//         params: {
//             'api_key': 'TQ9CDAZSORUPU1NMZXZEM11VY7K3NC3HJPBNYP2V4CZZXUY9SWEULNDHOZ77XGWO9FA9A12XWFVWUBZJ',
//             'url': 'https://www.instagram.com/api/v1/users/web_profile_info/?username=_daani.____', 
//             'json_response': 'true', 
//             'stealth_proxy': 'true',
//         } 
//     });

//     let user = response.data.data.user;
//     let profile_id = user.id;
//     let follower_count = user.edge_follow.count;
//     let following_count = user.edge_followed_by.count;
//     let media_count = user.edge_owner_to_timeline_media.count;
//     let full_name = user.full_name;
//     let username = user.username;
//     let is_private = user.is_private;
//     let is_verified = user.is_verified;
//     let is_business = user.is_business_account;

//     console.log(res);

// }

// userInfo('cristiano');

const axios = require('axios');
const fs = require('fs');
const { insertUsersToMongo, updateStatus } = require('../../helpers/mongo_functions');
const { logger } = require('../../logger');
const config = require('../../config');

async function userInfo(uname) {
    try {
        const headers = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.instagram.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'x-asbd-id': 129477,
            'x-csrftoken': 'y2xcxCaKUXfV06V8vDpgAZRK47nZSXgM',
            'x-ig-app-id': 936619743392459
        };
        const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${uname}`;

        let res;
        try {
            // res = await axios.get(url, { headers: headers });
            res = await axios.get('https://app.scrapingbee.com/api/v1', {
                params: {
                    'api_key': config.SCRAPINGBEE_KEY,
                    'url': url,
                    'forward_headers': 'true',
                },
                // headers: headers
            })
        } catch (e) {
            res = await axios.get('https://app.scrapingbee.com/api/v1', {
                params: {
                    'api_key': config.SCRAPINGBEE_KEY,
                    'url': url,
                    'forward_headers': 'true',
                    'stealth_proxy': 'true', 
                },
                // headers: headers
            })
        }
        console.log(res);
        let user = res.data.data.user;

        let request = {
            username: user.username,
            name: user.full_name,
            postsCount: user.edge_owner_to_timeline_media.count,
            followersCount: user.edge_followed_by.count,
            followingCount: user.edge_follow.count,
            is_private: user.is_private,
            is_verified: user.is_verified,
            is_business: user.is_business_account,
            profile_id: user.id,
        };
        await insertUsersToMongo(request);
        await updateStatus(user.username);
        let returnObj = { "user_id": user.id, "posts_count": user.edge_owner_to_timeline_media.count };

        return returnObj;
    } catch (e) {
        console.log("Error from userInfo: " + e.toString());
        // logger.error(e.toString());
        return false;
    }
}

// userInfo('isro_ksivan');

exports.userInfo = userInfo;