// import "../../../../source/meet-inject/dist/meetone-webview-inject.iife";

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs"; // For using eosjs@beta and up
import Eos from "eosjs";
import _network from "../../config/network";
import transfer from "../../config/transfer";

if (process.env.NODE_ENV !== "production") {
  import("eruda").then(module => {
    module.init();
  });
}

const network = Object.assign({}, _network);

const requiredFields = { accounts: [network] };

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins(new ScatterEOS());

/** Very important!!! if you want to adapt scatter & meetone */
window.scatter = ScatterJS.scatter;

setTimeout(() => {
  let _eos = null;
  let _account = {};

  /**
   * Connect to Scatter
   */
  scatter.connect("scatter-v1").then(async function(connected) {
    // no connect
    if (!connected) return false;
    _eos = scatter.eos(network, Eos, {});
    await getIdentity();
    // connect success
    window.ScatterJS = null;
  });

  /**
   * get Identity info
   */
  function getIdentity() {
    return new Promise(async resolve => {
      await scatter.getIdentity(requiredFields);
      const account =
        scatter &&
        scatter.identity &&
        scatter.identity.accounts &&
        scatter.identity.accounts.find(x => x.blockchain === "eos");
      console.info(account);
      resolve(account);
      _account = account;
    });
  }

  /**
   * forget Identity info
   */

  function forgetIdentity() {
    console.log("forgetIdentity");
    scatter.forgetIdentity();
  }

  /**
   * Transaction
   */
  function transaction() {
    return new Promise(async (resolve, reject) => {
      transfer.actions[0].authorization[0].actor =
        _account.name || "johntrump123";
      transfer.actions[0].data.from = _account.name || "johntrump123";
      transfer.actions[0].authorization[0].permission =
        _account.authority || "active";
      try {
        let resp = await _eos.transaction(
          {
            actions: transfer.actions
          },
          {
            blocksBehind: 3,
            expireSeconds: 60
          }
        );
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Transaction
   */
  function transaction2() {
    return new Promise(async (resolve, reject) => {
      transfer.actions[0].authorization[0].actor =
        _account.name || "johntrump123";
      transfer.actions[0].data.from = _account.name || "johntrump123";
      transfer.actions[0].authorization[0].permission =
        _account.authority || "active";

      try {
        let resp = await _eos.transaction(
          {
            actions: [transfer.actions[0], transfer.actions[0]]
          },
          {
            blocksBehind: 3,
            expireSeconds: 60
          }
        );
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }

  function cosign() {
    return new Promise(async (resolve, reject) => {
      // MOCK了一份数据
      transfer.actions[0].data.from = _account.name || "johntrump123";
      transfer.actions[0].authorization = [
        {
          actor: "g.f.w",
          permission: "active"
        },
        {
          actor: "johntrump123",
          permission: "active"
        }
      ];

      try {
        let resp = await _eos.transaction(
          {
            actions: transfer.actions
          },
          {
            blocksBehind: 3,
            expireSeconds: 60
          }
        );
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }

  document.getElementById("login").addEventListener("click", getIdentity);
  document.getElementById("logout").addEventListener("click", forgetIdentity);
  document.getElementById("transfer").addEventListener("click", async () => {
    try {
      let res = await transaction();
      alert(JSON.stringify(res));
    } catch (error) {
      console.log(typeof error);
      console.log(JSON.stringify(error));
      let { message } = error;
      alert(message);
    }
  });

  /* 测试Dapps原本就拥有的联合签名情况 */
  document.getElementById("cosign").addEventListener("click", async () => {
    try {
      let res = await cosign();
      alert(JSON.stringify(res));
    } catch (error) {
      console.log(typeof error);
      console.log(JSON.stringify(error));
      let { message } = error;
      alert(message);
    }
  });

  /* 测试Transaction中包含多个Actions的cosign情况 [没问题] */
  document.getElementById("transfer2").addEventListener("click", async () => {
    try {
      let res = await transaction2();
      alert(JSON.stringify(res));
    } catch (error) {
      console.log(typeof error);
      console.log(JSON.stringify(error));
      let { message } = error;
      alert(message);
    }
  });

  /* 测试eosjs16特有的 `eos.contract(c => c.transaction(tr => { ... }))` 的情况 */
  document.getElementById("transfer3").addEventListener("click", async () => {
    let contract = await _eos.contract("eosio.token");
    let { from, to, quantity, memo } = {
      from: _account.name || "johntrump123",
      to: "g.f.w",
      quantity: "0.0001 EOS",
      memo: "meet-dev-tools works!"
    };
    /* 这种写法不支持 */
    contract.transaction(tr => {
      tr.transfer(from, to, quantity, memo);
      tr.transfer(from, to, quantity, memo);
    });
  });
}, 1000);
