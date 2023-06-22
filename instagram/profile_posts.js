const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const Utils = require("../helpers/Utils");
const { logger, scrapperLogger } = require("../logger");
const { get } = require("http");
const { API } = require("../config");

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
  let retryCount = 0;
  do {
    try {
      let posts = [];
      var res = await fetch(fetchUrl, {
        headers: header,
        referrer: `https://www.instagram.com/${username}/`,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
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
        if ("preview_comments" in element) {
          let comments = element.preview_comments;
          comments.forEach((e) => {
            commentsData.push(e.text);
          });
        }

        let data = {
          user_name: username,
          post_id: element.pk,
          hashtag: "#travelpost",
          caption: element.caption ? element.caption.text : "",
          post_url: element.code,
          storage_url: storageUrl,
          num_comments: commentCount,
          num_likes: likeCount,
          is_sponsored: element.is_paid_partnership,
          comments: commentsData,
        };
        posts.push(data);
      });
      body.more_available
        ? (fetchUrl = `https://www.instagram.com/api/v1/feed/user/${username}/username/?count=12&max_id=${body.next_max_id}`)
        : (moreAvailable = false);
      count += body.items.length;
      scrapperLogger.info(
        `${count} Profile posts for ${username} fetched successfully`
      );
      console.log(count);
      await Utils.sleep(100);
      await postDataToMongo(posts);
    } catch (e) {
      logger.error(e.toString());
      console.log(e);
      retryCount++;
      await Utils.sleep(100);
      if (retryCount > 2) {
        moreAvailable = false;
      }
    }
  } while (moreAvailable);

  if (count < 0) {
    return Promise.resolve(false);
  }
  await updateStatus(username);
  return Promise.resolve(true);
}

// Usage: Pass the username of the profile you want to scrape
// getProfilePosts("cristiano");
// getProfilePostsFromApi("cristiano");

async function postDataToMongo(req) {
  const options = {
    method: "POST",
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let res = await fetch(API + "api/post", options);
    let data = await res.json();
    return true;
  } catch (e) {
    logger.error(e.toString());
    console.log(e);
  }
  return false;
}

async function updateStatus(username) {
  const options2 = {
    method: "POST",
    body: JSON.stringify({
      user_name: username,
      processing_status: "completed",
    }),
    headers: { "Content-Type": "application/json" },
  };

  try {
    let res2 = await fetch(API + "api/tracking/", options2);
  } catch (e) {
    logger.error(e.toString());
    console.log(e);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length == 1) {
    // getProfilePosts(args[0]);
    getProfilePostsFromApi(args[0]);
  } else {
    console.error(
      "Please provide a username  \nUsage: node instagram/profile_stats.js <username>"
    );
  }
}

module.exports = getProfilePostsFromApi;
