# scatter-v2

## Run from parcel

```html
parcel index.html
```

## Setting up

- https://get-scatter.com/docs/setting-up-for-web-apps

安装依赖

`yarn add eosjs`

`yarn add scatterjs-core`

`yarn add scatterjs-plugin-eosjs2`

## Notes

- You might run into babel/webpack issues in some NodeJS frameworks. If you do you can simply run the following command and it will fix them.

  > `yarn add @babel/runtime`

- eosjs 发起事务的流程

  ![image-20191113152715810](https://tva1.sinaimg.cn/large/006y8mN6gy1g8wgjg5ms4j31hs0owwls.jpg)

- meetone 通过拦截 scatter 对象来实现
