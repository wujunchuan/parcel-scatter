/*
 * @Author: John Trump
 * @Date: 2020-06-02 16:24:44
 * @LastEditors: John Trump
 * @LastEditTime: 2020-06-02 18:50:39
 * @FilePath: /src/metamask/index.js
 */
import { assert } from "chai";

if (process.env.NODE_ENV !== "production") {
  import("eruda").then((module) => {
    module.init();
  });
}

if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  assert(ethereum.isMetaMask, "ethereum.isMetaMask 应该为 true");
  assert(
    ethereum.networkVersion === "1",
    "ethereum.networkVersion 应该为1(正式网络)"
  );
} else {
  throw new Error("MetaMask is not installed");
}

const enableEthereumButtonEle = document.getElementById("enableEthereumButton");
enableEthereumButtonEle.addEventListener("click", () => {
  getAccount();
});

/**
 * 登录
 *
 * `ethereum.enable()`
 */
async function getAccount() {
  const accounts = await ethereum.enable();
  assert(Array.isArray(accounts), "应该返回数组[]");
  const account = accounts[0];
  assert(typeof account === "string", "应该返回数组[]");
  assert(account.length === 42, "ETH公钥长度为42");
  const showAccount = document.querySelector(".showAccount");
  showAccount.innerHTML = account;
}

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
      gas: "0x76c0", // 30400
      gasPrice: "0x9184e72a000", // 10000000000000
      value: "0x9184e72a", // 2441406250
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
      gas: "0x76c0", // 30400
      gasPrice: "0x9184e72a000", // 10000000000000
      value: "0x9184e72a", // 2441406250
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
