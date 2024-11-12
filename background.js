let m3u8Links = [];

// 监听所有的网络请求
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // 检查请求的 URL 是否以 .m3u8 结尾
    if (details.url &&  /\.m3u8/.test(details.url)) {
      m3u8Links.push(details.url);
      console.log("Found m3u8 link: ", details.url);
    }
  },
  { urls: ["<all_urls>"] } // 监听所有 URL 的请求
);

// 获取 m3u8 链接的 API
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get_m3u8_links") {
    sendResponse({ links: m3u8Links });
  }
});
