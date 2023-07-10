const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const { logger, scrapperLogger } = require("./logger");
const { get } = require("http");
const { API } = require("./config");


const { spawn } = require("child_process");

const childPostDetails = (username) => {
    const child = spawn("node", ["instagram/profile_posts.js", username]);
  
    child.stdout.on("data", (data) => {
      logger.info(`${username} (Post Scrapper): ${data}`);
      console.log("StdOut : " + data);
    });
  
    child.stderr.on("data", (data) => {
      logger.info(`${username} (Post Scrapper): ${data}`);
      console.log("StdError : " + data);
    });
  
    child.on("exit", (code, signal) => {
      if (code) {
        logger.info(`${username} (Post Scrapper) | Process exited with code : ${code}`);
        console.log("Process exited with code : " + code);
      }
      if (signal) {
        console.log("Process killed with signal : " + signal);
        logger.info(`${username} (Post Scrapper) | Process killed with signal : ${signal}`);
      }
    });
  };

  childPostDetails('saharsh119')