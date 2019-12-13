var jp = require("jsonpath");

/**
 * Extracts all titles and descriptions from a specification
 */
const extract = (document, fields = []) => {
  let path;
  if (typeof fields == "string") {
    path = fields;
  } else {
    fields = fields.map(f => `'${f}'`);
    path = `$..[${fields.join(",")}]`;
  }

  const nodes = jp.nodes(document, path);
  return nodes.map(n => {
    n.path = jp.stringify(n.path);
    return n;
  });
};

module.exports = extract;
