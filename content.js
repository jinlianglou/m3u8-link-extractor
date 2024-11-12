(function() {
  // 查找页面中所有的 .m3u8 链接
  const extractM3U8Links = () => {
    const links = [];
    const elements = document.querySelectorAll("a, video, source");

    elements.forEach((element) => {
      const href = element.href || element.src;
      if (href && href.endsWith(".m3u8")) {
        links.push(href);
      }
    });

    return links;
  };

  const m3u8Links = extractM3U8Links();

  // 如果找到链接，发送到 background.js 进行保存
  if (m3u8Links.length > 0) {
    m3u8Links.forEach((link) => {
      chrome.runtime.sendMessage({ type: "save_m3u8_link", link });
    });
  }
})();
