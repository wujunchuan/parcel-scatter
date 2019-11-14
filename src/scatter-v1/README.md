# scatter-v1

## Run from parcel

```html
parcel index.html
```

## Setting up

- https://get-scatter.com/docs/setting-up-for-web-apps

安装依赖

`yarn add eosjs@16.0.9` 此处我们是将 EOSjs 版本单独安装(16.0.9), 避免与`scatter-v2`发生冲突

至于如何同时安装不同版本的 Eosjs, 使用 Alias 来做区分, 可以采用 Yarn 的特性

详细请看 https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias

`yarn add scatterjs-core`

`yarn add scatterjs-plugin-eosjs`

## Notes

- You might run into babel/webpack issues in some NodeJS frameworks. If you do you can simply run the following command and it will fix them.

  > `yarn add @babel/runtime`

- eosjs 发起事务的流程

- meetone 通过拦截 scatter 对象来实现

- 使用 eosjs16 特性可以实现获取合约 ABI 之后, 调用合约方法, 这样做的好处是更加的简洁

详细看讨论: https://github.com/EOSIO/eosjs/issues/452#issuecomment-553767294
