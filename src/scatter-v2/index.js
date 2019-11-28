import "../../../../source/meet-inject/dist/meetone-webview-inject.iife";

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2"; // For using eosjs@beta and up
import { Api, JsonRpc } from "eosjs"; // eosjs@beta(20) and up
import _network from "../../config/network";
import transfer from "../../config/transfer";

if (process.env.NODE_ENV !== "production") {
  import("eruda").then(module => {
    module.init();
  });
}

setTimeout(() => {
  const network = Object.assign({}, _network);

  const requiredFields = { accounts: [network] };

  const rpc = new JsonRpc(
    `${network.protocol}://${network.host}:${network.port}`,
    {}
  ); // 初始化JsonPrc接口

  // Don't forget to tell ScatterJS which plugins you are using.
  ScatterJS.plugins(new ScatterEOS());

  /** Very important!!! if you want to adapt scatter & meetone */
  window.scatter = window.scatter;

  let _eos = null;
  let _account = {};

  /**
   * Connect to Scatter
   */
  scatter.connect("scatter-v2").then(async function(connected) {
    // no connect
    if (!connected) return false;
    _eos = scatter.eos(network, Api, { rpc, beta3: true });
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
      const account = scatter.identity.accounts.find(
        x => x.blockchain === "eos"
      );
      resolve(account);
      console.info(account);
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
      // MOCK了一份数据
      transfer.actions[0].authorization[0].actor =
        _account.name || "johntrump123";
      transfer.actions[0].data.from = _account.name || "johntrump123";
      transfer.actions[0].authorization[0].permission =
        _account.authority || "active";
      try {
        let resp = await _eos.transact(
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
        let resp = await _eos.transact(
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
}, 1000);
