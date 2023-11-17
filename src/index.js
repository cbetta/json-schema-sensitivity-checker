import extract from "./extract.js";
import check from "./check.js";

const checker = async function (input, fields = [], options = {}) {
  let checks = [];
  for (let s of extract(input, fields)) {
    checks.push(await check(s, options));
  }

  const all = await Promise.all(checks);
  return all.filter((a) => a.errors.length);
};

export default checker
