/*
 * @Author: John Trump
 * @Date: 2020-06-02 16:24:44
 * @LastEditors: John Trump
 * @LastEditTime: 2020-06-03 10:41:36
 * @FilePath: /src/metamask/index.js
 */

if (process.env.NODE_ENV !== "production") {
  import("eruda").then((module) => {
    module.init();
  });
}
