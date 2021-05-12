#!/usr/bin/env node

const checker = require(".");
const fs = require("fs");
const YAML = require("yamljs");
const chalk = require("chalk");
const program = require("commander");
const buildVersion = require("./package.json").version;

// const alex = require('alex')

function loader(filename) {
  const suffix = filename.split(".").pop().toLowerCase();

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
      "-c, --config [path]",
      "specify a JSON formatted Alex config to pass to every match"
    )
    .option(
      "-f, --fields [fields]",
      "specify a comma separated list of field names to match"
    )
    .arguments("[options] source-file")
    .parse(process.argv);


  if (program.args.length < 1) {
    return program.help();
  }
  const data = loader(program.args[0]);

  const programOpts = program.opts();

  const options = {
    why: programOpts.why,
    quiet: programOpts.quiet,
    text: programOpts.text,
    html: programOpts.html,
    diff: programOpts.diff,
    config: {},
  };

  let jsonPath = "";
  if (programOpts.jsonPath) {
    jsonPath = programOpts.jsonPath;
  } else {
    jsonPath = programOpts.fields.split(",");
  }

  if (programOpts.config) {
    options.config = JSON.parse(fs.readFileSync(programOpts.config));
  }

  const results = await checker(data, jsonPath, options);
  if (results.length === 0) {
    process.exit(0);
  }

  for (let result of results) {
    for (let error of result.errors) {
      const before = result.plain.substring(0, error.location.start.offset);
      const word = result.plain.substring(
        error.location.start.offset,
        error.location.end.offset
      );
      const after = result.plain.substring(error.location.end.offset);

      console.log(`
${chalk.yellow(result.path)}
${chalk.green(error.message)}
${chalk.grey(`${error.source}, ${error.ruleId}`)}

${before}${chalk.red(word)}${after}
      `);
    }
  }

  console.log(chalk.yellow(`${results.length} errors`));

  process.exit(1);
})();
