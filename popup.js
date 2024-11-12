document.addEventListener("DOMContentLoaded", function() {
  // 获取 m3u8 链接并显示在弹出窗口
  chrome.runtime.sendMessage({ type: "get_m3u8_links" }, (response) => {
    const listContainer = document.getElementById("m3u8-list");
    const uniqueLinks = new Set(); // 用于存储唯一链接

    response.links.forEach((link) => {
      if (!uniqueLinks.has(link)) { // 检查链接是否已存在
        uniqueLinks.add(link); // 添加到唯一链接集合
        const listItem = document.createElement("li");
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        div1.textContent = link;
        div1.title = link;

        // 添加复制按钮
        const copyButton = document.createElement("button");
        copyButton.textContent = "复制";
        div2.appendChild(copyButton);
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(link).then(() => {
            alert("Copied to clipboard!");
          });
        });

        listItem.appendChild(div1);
        listItem.appendChild(div2);
        listContainer.appendChild(listItem);
      }
    });
  });
});