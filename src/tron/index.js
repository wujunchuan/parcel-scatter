/*
 * @Author: John Trump
 * @Date: 2020-09-05 13:15:22
 * @LastEditors: John Trump
 * @LastEditTime: 2020-09-07 15:20:15
 */

import TronWeb from "tronweb";
const { HttpProvider } = TronWeb.providers;

console.log(TronWeb);

document
  .getElementById("trigger-arbitrary")
  .addEventListener("click", async () => {
    var tronweb = window.tronWeb;
    const str = "傻逼孙宇晨";
    const hex = tronweb.toHex(str);
    const signed = await tronweb.trx.sign(hex);
    console.log(signed);
  });

/** 调用合约 */
document
  .getElementById("trigger-contract")
  .addEventListener("click", async () => {
    const trc20ContractAddress = "TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK"; //contract address
    try {
      let contract = await tronWeb.contract().at(trc20ContractAddress);
      let transferRes = await contract
        .transfer("TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP", 10)
        .send({ feeLimit: 1000000 });
      console.log(transferRes);
      //Use call to execute a pure or view smart contract method.
      // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
      let result = await contract.name().call();
      console.log("result: ", result);
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  });

/** 获取地址 */
document.getElementById("gettronweb").addEventListener("click", () => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    document.getElementById(
      "gettronweb-result"
    ).textContent = `BASE58: ${window.tronWeb.defaultAddress.base58}\n HEX: ${window.tronWeb.defaultAddress.hex}`;
  }
});

/** 转账请求 */
document.getElementById("transfer").addEventListener("click", () => {
  var obj = setInterval(async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      clearInterval(obj);
      var tronweb = window.tronWeb;
      /* 转账 */
      var tx = await tronweb.transactionBuilder.sendTrx(
        "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP",
        10,
        "TXkbFKruLen8YYaWUWgs4AS34L2wZCw83E"
      );
      /* 签名 */
      var signedTx = await tronweb.trx.sign(tx);
      console.log(signedTx);
      var broastTx = await tronweb.trx.sendRawTransaction(signedTx);
      console.log(broastTx);
    }
  }, 10);
});
