/*
 * @Author: John Trump
 * @Date: 2020-06-03 10:34:18
 * @LastEditors: John Trump
 * @LastEditTime: 2020-07-18 16:02:36
 * @FilePath: /src/metamask/metamask.js
 */
// NOTICE: 调试MEETONE时候加下面这段
/* 注释掉下面代码, 因为现在客户端(Android, iOS未知)支持在调试的时候动态读取远程文件, 所以不需要这句了 */
// import "../../../../source/meet-inject/dist/meetone-webview-inject.iife";

import { assert } from "chai";
const ethUtil = require("ethereumjs-util");
const sigUtil = require("eth-sig-util");
var Eth = require("ethjs");
window.Eth = Eth;
import "./index";

/** TP的注入逻辑有一定的延迟, 所以我们在外层加上了一点延迟 */
setTimeout(() => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    assert(ethereum.isMetaMask, "ethereum.isMetaMask 应该为 true");
    assert(
      ethereum.networkVersion == 1,
      "ethereum.networkVersion 应该为1(正式网络)"
    );
  } else {
    throw new Error("MetaMask is not installed");
  }
}, 2000);

const enableEthereumButtonEle = document.getElementById("enableEthereumButton");
enableEthereumButtonEle.addEventListener("click", () => {
  const { networkVersion, isMetaMask } = window.ethereum;
  assert(networkVersion == 1, "networkVersion should be 1");
  assert(isMetaMask, "isMetaMask should be true");
  getAccount();
});

/**
 * 登录
 *
 * `ethereum.enable()`
 */
async function getAccount() {
  const accounts = await ethereum.enable();
  console.log(accounts); // ['0x49a8246758f8d28e348318183d9498496074ca71]
  assert(Array.isArray(accounts), "应该返回数组[]");
  const account = accounts[0];
  assert(typeof account === "string", "应该返回数组[]");
  assert(account.length === 42, "ETH公钥长度为42");
  const showAccount = document.querySelector(".showAccount");
  showAccount.innerHTML = account;
}

/**
 * 登录
 *
 * `ethereum.sendAsync({ method: "eth_requestAccounts", params: [false] }, callback)`
 */
function getAccountBySendAsync() {
  ethereum.sendAsync(
    { method: "eth_requestAccounts", params: [true] },
    (error, response) => {
      console.log(error); // null
      console.log(response); //{id, jsonrpc, result}
      const accounts = response.result;
      assert(Array.isArray(accounts), "应该返回数组[]");
      const account = accounts[0];
      assert(typeof account === "string", "应该返回数组[]");
      assert(account.length === 42, "ETH公钥长度为42");
      const showAccount = document.querySelector(".showAccount");
      showAccount.innerHTML = account;
    }
  );
}

document
  .getElementById("enableEthereumButton2")
  .addEventListener("click", () => {
    getAccountBySendAsync();
  });

const sendAsyncButtonEle = document.getElementById("sendAsyncButton");
sendAsyncButtonEle.addEventListener("click", () => {
  sendAsync();
});

/**
 * `ethereum.sendAsync(payload, callback)`
 */
async function sendAsync() {
  assert(
    ethereum.selectedAddress ===
      document.getElementsByClassName("showAccount")[0].innerHTML,
    "ethereum.selectedAddress 应该与步骤一获取的一致"
  );

  const params = [
    {
      from: ethereum.selectedAddress,
      to: "0x089aD6f597C6edC32FF928CC8df90874121dfe39",
      gasPrice: "0x6fc23ac00",
      gas: "0x9c40",
      value: "0x1b48eb57e000",
      data:
        "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
    },
  ];

  ethereum.sendAsync(
    {
      method: "eth_sendTransaction",
      params: params,
      from: ethereum.selectedAddress,
    },
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        const result = response.result;
        console.log("result", result);
      }
    }
  );
}

const sendButtonEle = document.getElementById("sendButton");
sendButtonEle.addEventListener("click", () => {
  send();
});

/**
 * `ethereum.send(payload, callback) (To Be Replaced)` 带这样的参数, 同 `ethereum.sendAsync(payload, callback)`
 */
async function send() {
  assert(
    ethereum.selectedAddress ===
      document.getElementsByClassName("showAccount")[0].innerHTML,
    "ethereum.selectedAddress 应该与步骤一获取的一致"
  );
  const params = [
    {
      from: ethereum.selectedAddress,
      to: "0x089aD6f597C6edC32FF928CC8df90874121dfe39",
      gasPrice: "0x6fc23ac00",
      gas: "0x9c40",
      value: "0x1b48eb57e000",
      data:
        "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
    },
  ];
  ethereum.send(
    {
      method: "eth_sendTransaction",
      params: params,
      from: ethereum.selectedAddress,
    },
    (err, response) => {
      if (err) {
      } else {
        const result = response.result;
        console.log("result", result);
      }
    }
  );
}

/**
 * 签名
 */

/**
 * 调用方法:
 * `web3.eth.sign`
 */
const ethSignEle = document.getElementById("ethSignButton");
ethSignEle.addEventListener("click", () => {
  event.preventDefault();
  var msg =
    "0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0";
  var from = web3.eth.accounts[0];
  if (!from) return getAccount();
  web3.eth.sign(from, msg, function(err, result) {
    if (err) return console.error(err);
    console.log("SIGNED:" + result);
    assert(
      result ===
        "0xaa85078d9420b2ac275a71121f17e8cded803fca89af0725460f4bfa525eaa536a89c5f60e44635d2579442dbd56a960dc94717acb4c0c73f6a980de5ba4a2e01c",
      "签名错误, 0x49a8246758f8d28e348318183d9498496074ca71 为签名者"
    );
  });
});

/**
 * 调用路径:
 * personal_sign -> personal_ecRecover
 */
const personalSignEle = document.getElementById("personalSign");
personalSignEle.addEventListener("click", () => {
  event.preventDefault();
  let text = "你好, 世界, 我是JohnTrump";
  personal_sign(text)
    .then((res) => {
      console.log("personal_sign:", res.result);
      return personal_ecRecover(text, res.result);
    })
    .then((res) => {
      console.log("personal_ecRecover:", res.result);
      assert(res.result === web3.eth.accounts[0], "公钥不一致!");
    });
});

/**
 * 调用路径:
 * personal_sign -> manual personal_ecRecover(use sigUtil)
 */
const personalEcRecoverEl = document.getElementById("personalEcRecover");
personalEcRecoverEl.addEventListener("click", () => {
  event.preventDefault();
  let text = "你好, 世界, 我是JohnTrump";
  personal_sign(text).then((res) => {
    console.log("personal_sign:", res.result);
    console.log("-----ethUtil.recoverPersonalSignature-----");
    const recovered = sigUtil.recoverPersonalSignature({
      sig: res.result,
      data: ethUtil.bufferToHex(new Buffer(text, "utf8")),
    });
    console.log("recovered:", recovered);
    assert(recovered === web3.eth.accounts[0], "验证失败, 公钥不一致");
  });
});

/**
 * 签名
 *
 * `method: personal_sign`
 *
 * @param text 明文
 */
async function personal_sign(text) {
  let from = web3.eth.accounts[0];
  let msg = ethUtil.bufferToHex(new Buffer(text, "utf8"));
  if (!from) return getAccount();
  return new Promise((resolve, reject) => {
    console.log("sendAsync(personal_sign)");
    const method = "personal_sign";
    const params = [msg, from];
    web3.currentProvider.sendAsync(
      {
        method,
        params,
        from,
      },
      function(err, result) {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

/**
 * 解签名
 *
 * `method: personal_ecRecover`
 *
 * @param text 明文
 * @param sign 密文
 */
async function personal_ecRecover(text, sign) {
  return new Promise((resolve, reject) => {
    console.log("sendAsync(personal_ecRecover)");
    const method = "personal_ecRecover";
    const params = [text, sign];
    const from = web3.eth.accounts[0];
    web3.currentProvider.sendAsync(
      {
        method,
        params,
        from,
      },
      function(err, result) {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

const ethjsPersonalSignEle = document.getElementById("ethjsPersonalSign");
ethjsPersonalSignEle.addEventListener("click", () => {
  event.preventDefault();
  let text = "你好, 世界, 我是JohnTrump";
  let msg = ethUtil.bufferToHex(new Buffer(text, "utf8"));
  const from = web3.eth.accounts[0];
  if (!from) return getAccount();
  // Now with Eth.js
  let eth = new Eth(web3.currentProvider);
  eth
    .personal_sign(msg, from)
    .then((signed) => {
      console.log("eth.personal_sign result: ", signed);
      // return eth.personal_ecRecover(msg, signed);
      return eth.personal_ecRecover(text, signed);
    })
    .then((recovered) => {
      console.log({ recovered });
      assert(recovered === from, "ethjs签名验证失败");
    });
});

const getBalanceEle = document.getElementById("getBalance");
getBalanceEle.addEventListener("click", () => {
  /* 使用协议获取Balance (only ETH, use `eth_getBalance`) */
  // getBalance();
  /* 使用合约获取Token Balance(use `eth_call`) */
  // 流程: ABI -> get contract -> execute contract(balanceOf)
  getErc20Balance();
});
const erc20 = require('./erc20.json');
/** 通过调用合约方法来查询Token余额 */
async function getErc20Balance() {
  const from = web3.eth.accounts[0];
  // let tokenAddress = "0x2A65D41dbC6E8925bD9253abfAdaFab98eA53E34";
  let tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  // let walletAddress = "0x821e28109872cad442da8d8335be37d317d4f1e7";
  let walletAddress = from;
  // const contract = new web3.eth.contract(erc20, tokenAddress);
  let contract = web3.eth.contract(erc20).at(tokenAddress);
  contract.balanceOf(walletAddress, (error, balance) => {
    console.log(balance);
    document.getElementById("getBalanceResult").innerHTML = balance;
    // Get decimals
    contract.decimals((error, decimals) => {
      // calculate a balance
      balance = balance.div(10**decimals);
      document.getElementById("getBalanceResult").innerHTML = balance;
      console.log(balance.toString());
    });
  });
}

/** 通过调用eth_getBalance来查询余额 */
async function getBalance() {
  const from = web3.eth.accounts[0];
  web3.eth.getBalance(from, (err, balance) => {
    let result = web3.fromWei(balance, "ether") + " ETH"
    document.getElementById("getBalanceResult").innerHTML = result;
  })
}
