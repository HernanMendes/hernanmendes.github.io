module.exports = function (eleventyConfig) {
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
