const extract = require("./extract");
const check = require("./check");

module.exports = async function (input, fields = [], options = {}) {
  let checks = [];
  for (let s of extract(input, fields)) {
    checks.push(await check(s, options));
  }

  const all = await Promise.all(checks);
  return all.filter((a) => a.errors.length);
};
