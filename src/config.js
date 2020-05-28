let dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
console.log(envs);

module.exports = {
    url: process.env.MONGODB_URL,
    JWTKEY: process.env.JWT_KEY,
    port: process.env.PORT
  };
