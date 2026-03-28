module.exports = function (eleventyConfig) {
  const fs = require("fs");
  const path = require("path");
  const crypto = require("crypto");
  const markdownIt = require("markdown-it");
  const md = markdownIt({ html: true, breaks: true, linkify: true });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addCollection("blog_es", (collection) => {
    return collection
      .getFilteredByTag("blog")
      .filter((item) => item.data.lang === "es")
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("blog_en", (collection) => {
    return collection
      .getFilteredByTag("blog")
      .filter((item) => item.data.lang === "en")
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addFilter("dateEs", (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  });
  eleventyConfig.addFilter("dateEn", (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  });

  eleventyConfig.addFilter("assetUrl", (url) => {
    try {
      const inputPath = path.join(__dirname, "src", url.replace(/^\//, ""));
      const content = fs.readFileSync(inputPath);
      const hash = crypto.createHash("md5").update(content).digest("hex").slice(0, 8);
      return `${url}?v=${hash}`;
    } catch (err) {
      return url;
    }
  });
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
