/*
 * onboardTest
 * @Author: John Trump
 * @Date: 2020-08-02 14:00:59
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-03 10:46:12
 * @FilePath: /Users/wujunchuan/Project/personal-source/parcel-scatter/src/onboard/index.js
 */

import Onboard from "bnc-onboard";
import Web3 from "web3";

if (process.env.NODE_ENV !== "production") {
  import("eruda").then((module) => {
    module.init();
  });
}

// set a variable to store instantiated web3
let web3;

// head to blocknative.com to create a key
const BLOCKNATIVE_KEY = "0ee04669-f253-4a9d-9523-f74565365001";

// the network id that your dapp runs on
const NETWORK_ID = 1;

// initialize onboard
const onboard = Onboard({
  dappId: BLOCKNATIVE_KEY,
  networkId: NETWORK_ID,
  walletSelect: {
    wallets: [{ walletName: "meetone" }, { walletName: "metamask" }],
  },

  subscriptions: {
    wallet: (wallet) => {
      // instantiate web3 when the user has selected a wallet
      web3 = new Web3(wallet.provider);
      console.log(`${wallet.name} connected!`);
    },
  },
});

document.getElementById("wallet-select").addEventListener("click", async () => {
  // Prompt user to select a wallet
  const isSelected = await onboard.walletSelect();
  if (isSelected) {
    const currentState = onboard.getState();
    console.log(currentState);
    const { address } = currentState;
    /* Get the balance from wallet */
    web3.eth.getBalance(address, (err, balance) => {
      let result = web3.utils.fromWei(balance, "ether") + " ETH";
      document.getElementById("getBalanceResult").innerHTML = result;
    });
  }
});

document.getElementById("wallet-check").addEventListener("click", async () => {
  // Run wallet checks to make sure that user is ready to transact
  const res = await onboard.walletCheck();
  console.log(res);
});

window.onboard = onboard;
