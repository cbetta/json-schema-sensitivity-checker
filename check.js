const strip = require("remark-plain-text");
const remark = require("remark");

const alex = require("alex");

const check = async (item, options = {}) => {
  return new Promise((resolve, reject) => {
    remark()
      .use(strip)
      .process(item.value, (error, result) => {
        if (error) {
          reject(error);
        }

        let errors = [];
        if (options.text) {
          errors = alex.text(result.contents, options.config).messages;
        } else if (options.html) {
          errors = alex.html(result.contents, options.config).messages;
        } else {
          errors = alex.markdown(result.contents, options.config).messages;
        }
        resolve({ errors, plain: result.contents.trim(), ...item });
      });
  });
};

module.exports = check;
