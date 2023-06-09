const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const Utils = require("../helpers/Utils");

async function getProfilePosts(username) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });
  // Go to Instagram
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);

  await new Promise((r) => setTimeout(r, 2000));

  await page.setRequestInterception(true);
  headers = {};

  // page.on('request', async (interceptedRequest) => {
  //   if (interceptedRequest.isInterceptResolutionHandled()) return;
  //   var url = interceptedRequest.url();
  //   if(url == `https://www.instagram.com/api/v1/feed/user/${username}/username/?count=12`){
  //     headers = interceptedRequest.headers()
  //   }
  //   await fs.writeFile('./headers.json', JSON.stringify(headers, null, 2));
  //   interceptedRequest.continue();
  // });
  // Go to the user's profile
  await page.goto(`https://www.instagram.com/${username}`, {
    waitUntil: "networkidle2",
  });
  let error = "";

  await page.exposeFunction("hover", async (target) => {
    await page.hover(page.$(target));
  });

  const data = await page.evaluate(() => {
    let dataMap = [];
    console.log("dasdasd");
    const body = document.querySelector(
      "main div:last-child article > div:first-child div"
    ).children;
    let postLink,
      postThumbnail = "";

    // for (var i = 0; i < body.length; i++) {
    //   let nodeList = body[i].children;
    //   for (var j = 0; j < nodeList.length; j++) {
    //     console.log("---- Hovering on main element ----");
    //     window.hover(nodeList[i]);
    //     Utils.sleep();
    //     console.log("---- Hovering on child element ----");
    //     window.hover(nodeList[j].children[0]);
    //     Utils.sleep();
    //     dataMap.push({
    //       postLink: nodeList[j].children[0].href,
    //       postThumbnail:
    //         nodeList[j].children[0].children[0].children[0].children[0].src,
    //     });
    //   }
    // }

    return dataMap;
  });

  console.log(data);
  console.log(error);
  // await fs.writeFile(`./instagram/data/${username}.json`, JSON.stringify(data, null, 2));

  await browser.close();
}

async function getProfilePostsFromApi(username) {
  const headerString = await fs.readFile("./headers.json");
  const header = JSON.parse(headerString);
  const headerObj = Object.entries(header).map(
    ([name, value]) => `${name}=${value}`
  );
  const data = headerObj.join("; ");
  
  let fetchUrl = `https://www.instagram.com/api/v1/feed/user/${username}/username/?count=12`;
  let moreAvailable = true;
  let count = 0;
  do{
    let posts = [];
    var res = await fetch(
      fetchUrl,
      {
        headers: header,
        referrer: `https://www.instagram.com/${username}/`,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    var body = await res.json();
    console.log(body);
    body.items.forEach((element) => {
      let likeCount = element.like_count;
      let timeStamp = element.taken_at;
      let commentCount = element.comment_count;
      let storageUrl = [];
      let commentsData = [];
      if ("carousel_media" in element) {
        let images = element.carousel_media;
        images.forEach((e) => {
          storageUrl.push(e.image_versions2.candidates[0].url);
        });
      }
      if ("image_versions2" in element) {
        storageUrl.push(element.image_versions2.candidates[0].url);
      }
      if("preview_comments" in element){
        let comments = element.preview_comments;
        comments.forEach((e) => {
          commentsData.push(e.text);
        });
      }
  
      let data = {
        user_name: username,
        post_id: element.pk,
        hashtag: "#travelpost",
        caption: element.caption.text ?? "",
        post_url: element.code,
        storage_url: storageUrl,
        num_comments: commentCount,
        num_likes: likeCount,
        is_sponsored: element.is_paid_partnership,
        comments: commentsData,
      };
      posts.push(data);
    });
    count += body.items.length;
    console.warn(`Fetched ${count} posts`);
    body.more_available ? fetchUrl = `https://www.instagram.com/api/v1/feed/user/${username}/username/?count=12&max_id=${body.next_max_id}` : moreAvailable = false;
    Utils.sleep(10);
    // await postDataToMongo(posts);
    console.log(posts);
  }while(moreAvailable)
  

  console.log(posts);
}

// Usage: Pass the username of the profile you want to scrape
// getProfilePosts("cristiano");
getProfilePostsFromApi("cristiano");

async function postDataToMongo(req){
    const options = {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' },
    }
    try{
      let res = await fetch(API+'api/post', options);
      let data = await res.json();
      console.log(data);
    }catch(e){
      console.log(e);
    }
}
