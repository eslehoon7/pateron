const https = require('https');
['VSWTdSWp', 'gwH5nwKp', 'qtxYztGJ'].forEach(id => {
  https.get('https://postimg.cc/' + id, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/i\.postimg\.cc\/[^"]+/);
      console.log(id, match ? match[0] : 'not found');
    });
  });
});
