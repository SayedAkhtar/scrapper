const puppeteer = require("puppeteer");

async function getHTML() {
    const query_hash = "";
    const url = 'https://www.instagram.com/reel/CwK1lkysZ2a/';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
    );
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`${url}`, {
        waitUntil: "networkidle2",
    });

    page.setDefaultNavigationTimeout(0);
    page.setRequestInterception(true);
    page.on("request", async (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        var url = interceptedRequest.url();
        // console.log(typeof url);
        if (url.indexOf("user/") > 0) {
            let headers = interceptedRequest.headers();
            await fs.writeFile("./reels_headers.json", JSON.stringify(headers, null, 2));
        }
        interceptedRequest.continue();
    });
}

async function getViaApi(shortCode) {
    const query_hash = "b3055c01b4b222b8a47dc12b090e4e64";
    try{
        var res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=%7B%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22has_threaded_comments%22%3Atrue%2C%22parent_comment_count%22%3A24%2C%22shortcode%22%3A%22${shortCode}%22%7D`, {
            "body": null,
            "method": "GET"
        });
        const json = await res.json();
        console.log(json.data.shortcode_media);
    }catch(e){
        console.log(e);
    }
    
}

// getHTML();
getViaApi('CrhyJpEALEr');