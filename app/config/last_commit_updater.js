const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/repos/sizief/pomodoro/commits',
  headers: { 'User-Agent': 'pomodoro' }
};

https.get(options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const res = JSON.parse(data)[0]
    fs = require('fs');
    fs.writeFile(`${__dirname}/../.env.local`,
      `REACT_APP_LAST_COMMIT_URL=${res.html_url}\nREACT_APP_LAST_COMMIT_DATE_TIME=${res.commit.author.date}`,
      (err)=>{console.log(err)}
    )
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
