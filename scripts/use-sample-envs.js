const fs = require('fs');

const content = fs.readFileSync('src/config/.env.sample');

fs.writeFileSync('src/config/.env', content);
