module.exports = function (eleventyConfig) {
  const markdownIt = require("markdown-it");
  const md = markdownIt({ html: true, breaks: true, linkify: true });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPairedShortcode("renderTemplate", (content, format) => {
    if (format === "md" || format === "markdown") {
      return md.render(content);
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
