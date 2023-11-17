import extract from "./extract.mjs";
import check from "./check.mjs";

const checker = async function (input, fields = [], options = {}) {
  let checks = [];
  for (let s of extract(input, fields)) {
    checks.push(await check(s, options));
  }

  const all = await Promise.all(checks);
  return all.filter((a) => a.errors.length);
};

export default checker
