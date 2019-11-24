/*
 * Trx
 * 序列化与反序列化
 * TransactionObject -> HexBuffer
 * HexBuffer -> TransactionObject
 * @Author: JohnTrump
 * @Date: 2019-11-22 00:27:17
 * @Last Modified by: JohnTrump
 * @Last Modified time: 2019-11-23 01:31:11
 */
import { Api, Serialize, JsonRpc } from "eosjs";
import _network from "../../config/network";
import _buf from "./buf";
console.log(_buf);
const network = Object.assign({}, _network);

let buf = Array.from(_buf);

const rpc = new JsonRpc(
  `${network.protocol}://${network.host}:${network.port}`,
  {}
); // 初始化JsonPrc接口

const api = new Api({
  rpc,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

api.getContract("eosio.token").then(contract => {
  let buf =
    "578cd75d1f08052a6393000000000100a6823403ea3055000000572d3ccdcd0220799e9a2264305500000000a8ed32323044a852df3c1b7d00000000a8ed3232363044a852df3c1b7d00000000000e1660010000000000000004454f5300000000156d6565742d6465762d746f6f6c7320776f726b732100";
  console.log(
    Serialize.deserializeActionData(
      contract,
      "eosio.token",
      "transfer",
      buf,
      api.textEncoder,
      api.textDecoder
    )
  );
});

// const serializeString = `e289d75d4e03abb2f318000000000100a6823403ea3055000000572d3ccdcd0220799e9a2264305500000000a8ed32323044a852df3c1b7d00000000a8ed3232363044a852df3c1b7d00000000000e1660010000000000000004454f5300000000156d6565742d6465762d746f6f6c7320776f726b732100`;
// const serializeString = `3b90d75dca0f5b57dd69000000000100a6823403ea3055000000572d3ccdcd0220799e9a2264305500000000a8ed32323044a852df3c1b7d00000000a8ed3232363044a852df3c1b7d00000000000e1660010000000000000004454f5300000000156d6565742d6465762d746f6f6c7320776f726b732100`;
const serializeString = `ac16d85dfa16a6686940000000000100a6823403ea3055000000572d3ccdcd02104208bed35b315500000000a8ed32324046a852df3c1b7d0000000080ab26a72f4046a852df3c1b7d002450919aa32b222c0100000000000004454f53000000000e31302e303030302c302e3033303000`;

const serializeHex = Buffer.from(serializeString, "hex");
console.log("serializeString", serializeString);
console.log("serializeHex", serializeHex);

const deserializeTransaction = api.deserializeTransaction(serializeHex);
console.log("deserializeTransaction", deserializeTransaction);

const serializeHex_1 = api.serializeTransaction(deserializeTransaction);
console.log(serializeHex_1);

serializeHex_1.toString();
