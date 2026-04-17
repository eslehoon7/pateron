const https = require('https');
const ids = ['VSWTdSWp', 'gwH5nwKp', 'qtxYztGJ'];
ids.forEach(id => {
  https.get('https://postimg.cc/' + id, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const match = data.match(/property="og:image"\s+content="([^"]+)"/);
      console.log(id, match ? match[1] : 'not found');
    });
  });
});
