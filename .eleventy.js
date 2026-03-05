module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");

  // Head filter — return first n items of array
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return array;
    return array.slice(0, n);
  });

  // Slugify filter
  eleventyConfig.addFilter("slugify", (str) => {
    return str.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  });

  // Date filter for German locale
  eleventyConfig.addFilter("germanDate", (dateObj) => {
    const months = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
    const d = new Date(dateObj);
    return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Collection: all posts sorted by date
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collection: all unique tags (excluding internal tags)
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => {
          if (tag !== "posts") tagSet.add(tag);
        });
      }
    });
    return [...tagSet].sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
