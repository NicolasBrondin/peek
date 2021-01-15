const ScreenshotManager = require('./ScreenshotManager.js');

const readline = require("readline-promise").default;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("close", function() {
    process.exit(0);
});

(async () => {
  let peek = new ScreenshotManager();
  await peek.init();
  console.log("Peek is a tool to generate screenshot of a website using custom options !");
  let domainName = await rl.questionAsync("Domain name ? (no trailing slashes)");
  let urls = [];
  let url = "";
  do {
    url = await rl.questionAsync("Which path do you want to save as screenshot (currently "+urls.length+"), leave empty to go next step");
    if(url){
        urls.push(url);
    }
  } while(urls.length === 0 || url)
  let width = await rl.questionAsync("Screen width (in px) ?");
  let height = await rl.questionAsync("Screen height (in px) ?");
  await peek.generate(domainName, urls, parseInt(width), parseInt(height), false);
  await peek.close();
  rl.close();
  process.exit(0);
})();
