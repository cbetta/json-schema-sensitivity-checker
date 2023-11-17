import strip from "remark-plain-text";
import { remark } from "remark";

import { markdown, html, text } from "alex";

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
          errors = text(result.value, options.config).messages;
        } else if (options.html) {
          errors = html(result.value, options.config).messages;
        } else {
          errors = markdown(result.value, options.config).messages;
        }
        resolve({ errors, plain: result.value.trim(), ...item });

      });
  });
};

export default check;
