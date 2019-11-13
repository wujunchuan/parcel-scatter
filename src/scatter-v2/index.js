import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2"; // For using eosjs@beta and up
import { Api, JsonRpc } from "eosjs"; // eosjs@beta(20) and up
import _network from "./config/network";
import transfer from "./config/transfer.js";

if (process.env.NODE_ENV !== "production") {
  import("eruda").then(module => {
    module.init();
  });
}

const network = Object.assign({}, _network);

const requiredFields = { accounts: [network] };

const rpc = new JsonRpc(
  `${network.protocol}://${network.host}:${network.port}`,
  {}
); // 初始化JsonPrc接口

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins(new ScatterEOS());

/** Very important!!! if you want to adapt scatter & meetone */
window.scatter = ScatterJS.scatter;

let _eos = null;
let _account = null;

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
    const account = scatter.identity.accounts.find(x => x.blockchain === "eos");
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
  return new Promise(async resolve => {
    transfer.actions[0].authorization[0].actor = _account.name;
    transfer.actions[0].data.from = _account.name;
    transfer.actions[0].authorization[0].permission = _account.authority;
    let resp = await _eos.transact(
      {
        actions: transfer.actions
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      }
    );

    console.log("resp", resp);
  });
}

document.getElementById("login").addEventListener("click", getIdentity);
document.getElementById("logout").addEventListener("click", forgetIdentity);
document.getElementById("transfer").addEventListener("click", transaction);
