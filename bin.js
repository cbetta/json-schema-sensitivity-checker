#!/usr/bin/env node

const checker = require(".");
const fs = require("fs");
const YAML = require("yamljs");
const chalk = require("chalk");
const program = require("commander");
const buildVersion = require("./package.json").version;

// const alex = require('alex')

function loader(filename) {
  const suffix = filename
    .split(".")
    .pop()
    .toLowerCase();

  // If it ends in .yml
  if (["yml", "yaml"].indexOf(suffix) !== -1) {
    return YAML.load(filename);
  }

  // Assume everything else is JSON
  return JSON.parse(fs.readFileSync(filename));
}

(async () => {
  program
    .version(buildVersion)
    .option("-t, --text", "treat input as plain-text (not markdown)")
    .option("-l, --html", "treat input as html (not markdown)")
    .option("-d, --diff", "ignore unchanged lines (affects Travis only)")
    .option("-j, --json-path [path]", "specify a jsonpath expression to match")
    .option(
      "-f, --fields [fields]",
      "specify a comma separated list of field names to match"
    )
    .usage("[options] source-file")
    .parse(process.argv);

  const options = {
    why: program.why,
    quiet: program.quiet,
    text: program.text,
    html: program.html,
    diff: program.diff
  };

  const data = loader(program.args[0]);

  let jsonPath = "";
  if (program.jsonPath) {
    jsonPath = program.jsonPath;
  } else {
    jsonPath = program.fields.split(",");
  }

  const results = await checker(data, jsonPath, options);
  if (results.length === 0) {
    process.exit(0);
  }

  for (let result of results) {
    for (let error of result.errors) {
      console.log(`
${chalk.yellow(result.path)}
${chalk.green(error.message)}
${chalk.grey(`${error.source}, ${error.ruleId}`)}

${result.value.replace(error.actual, chalk.red(error.actual))}
      `);
    }
  }

  console.log(chalk.yellow(`${results.length} errors`));

  process.exit(1);
})();
