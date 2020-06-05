/*
 * @Author: John Trump
 * @Date: 2020-06-03 10:34:22
 * @LastEditors: John Trump
 * @LastEditTime: 2020-06-05 15:47:23
 * @FilePath: /Users/wujunchuan/Project/source/parcel-scatter/src/metamask/meetone.ts
 */

import { assert } from "chai";
import MeetBridge from "meet-bridge";
const tp = require('tp-js-sdk')

import "./index";

const bridge = new MeetBridge();

const accountInfo = {
  publicKey: "",
};

/*
  获取账号信息
 */
const getAccountEle = document.getElementById("getAccount");
getAccountEle.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  /** 获取账号信息返回的格式 */
  interface IResponse {
    /** 状态码, 0为成功  */
    code: number;
    /** 返回的数据 */
    data: {
      /** 公钥地址 */
      account: string;
      /** 公钥地址 */
      publicKey: string;
      /** 当前余额 */
      currencyBalance: string;
    };
  }
  /**
   * 获取账号信息
   */
  const response: IResponse = await bridge.customGenerate({
    routeName: "eth/account_info",
    params: {
      dappName: 'Dapp的名字'
    },
  });

  assert(response.code === 0, "协议状态失败");
  assert(typeof response.data.publicKey === "string", "没获取到公钥");
  assert(response.data.publicKey.length === 42, "公钥不符合格式");
}

/*
  签名交易事务
 */
const signTransactionEle = document.getElementById("signTransaction");
signTransactionEle.addEventListener("click", () => {
  signTransaction();
});

/*
  tp的签名交易事务测试
 */
const signTransactionEle_2 = document.getElementById("signTransaction_2");
signTransactionEle_2.addEventListener("click", () => {
  // @ts-ignore
  tp.signEthTransaction({
    from:"0x49a8246758f8d28e348318183d9498496074ca71",
    to: '0x089aD6f597C6edC32FF928CC8df90874121dfe39',
    gasPrice: 100000000,
    gasLimit: 60000,
    data: '0xaawefwefwefwefwefef',
    value: 100000000 * 60000
  }).then(res => {
    console.log(res);
  })
});

async function signTransaction() {
  interface IResponse {
    /** 状态码, 0为成功  */
    code: number;
    /**
     * 签名后的Hash
     *
     * eg: `0xf8ef8201598504a817c800830298109490cb7b42a9cb3accbe665e7d6cdde4ab346eca1483030d40b88402ef9b6b0000000000000000`
     */
    data: string;
  }

  const response: IResponse = await bridge.customGenerate({
    routeName: "eth/transaction_sign",
    params: {
      from: accountInfo.publicKey,
      /** to: String */
      to: "0x089aD6f597C6edC32FF928CC8df90874121dfe39",
      /** gasPrice: String|Number */
      gasPrice: 100000000,
      /** gasLimit: String|Number */
      gasLimit: 60000,
      /** data: String */
      data: "我只是来测试transaction_sign的Data!",
      /** value: String | Number */
      value: 1000000000,
    },
  });
  assert(response.code === 0, "协议状态失败");
  assert(typeof response.data === "string", "当前应为事务ID");
}

/*
  发送交易事务
 */
const sendTransactionEle = document.getElementById("sendTransaction");
sendTransactionEle.addEventListener("click", () => {
  sendTransaction();
});

async function sendTransaction() {
  interface IResponse {
    /** 状态码, 0为成功  */
    code: number;
    /** 事务ID */
    data: string;
  }

  const response: IResponse = await bridge.customGenerate({
    routeName: "eth/transaction_send",
    params: {
      from: accountInfo.publicKey,
      /** to: String */
      to: "0x089aD6f597C6edC32FF928CC8df90874121dfe39",
      /** gasPrice: String|Number */
      gasPrice: 100000000,
      /** gasLimit: String|Number */
      gasLimit: 60000,
      /** data: String */
      data: "我只是来测试transaction_send的Data!",
      /** value: String | Number */
      value: 1000000000,
    },
  });
  assert(response.code === 0, "协议状态失败");
  assert(typeof response.data === "string", "当前应为事务ID");
}
