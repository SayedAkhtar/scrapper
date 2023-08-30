// request Axios
const axios = require('axios');
const config = require('../../config');
const { logger, scrapperLogger } = require("../../logger");

async function getAllPosts() {
    axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': config.SCRAPINGBEE_KEY,
            'url': 'https://www.instagram.com/graphql/query/?doc_id=17991233890457762&variables={"id":"173560420","first":3000}',
            'json_response': 'true',
        }
    }).then(function (response) {
        // handle success
        console.log(response);
    })
}

async function getPosts(userId, totalPostCount) {
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

        let posts = [];
        let reels = [];
        const pageCount = Math.ceil(totalPostCount / 50);
        let variables = `{"id": "${userId}","first": "50"}`;
        let params = {
            doc_id: 17991233890457762,
            variables: variables,
        };
        // for (const i = 0; i < pageCount; i++) {
            const queryParams = Object.keys(params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');
            // console.log(queryParams);

            let res = await axios.get(`https://www.instagram.com/graphql/query/?${queryParams}`);

            const data = res.data.data.user.edge_owner_to_timeline_media;
            const nextCursor = data.page_info.end_cursor;
            params.after = nextCursor;
            // console.log(data);
            const edges = data.edges;
            for(let j=0; j< edges.length; j++){
                const node = edges[j].node;
                if(node.__typename == "GraphVideo"){

                }else{
                    let data = {
                        user_name: node.owner.username,
                        post_id: node.id,
                        hashtag: "",
                        caption: node.edge_media_to_caption.edges[0] ? node.edge_media_to_caption.edges[0].node.text : "",
                        post_url: "https://www.instagram.com/p/"+node.shortcode,
                        storage_url: storageUrl,
                        num_comments: node.edge_media_to_comment.count,
                        num_likes: node.edge_media_preview_like.count,
                        is_sponsored: node.is_paid_partnership,
                        comments: [],
                        post_date: node.taken_at_timestamp,
                        s3_storage_url: s3_storage_url
                    };
                }
                
            }
        // }

    } catch (e) {
        console.log(e);
        logger.error(e.toString());
    }

}

getPosts('4849818429', 920);

