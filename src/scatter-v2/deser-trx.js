/*
 * Trx
 * 序列化与反序列化
 * TransactionObject -> HexBuffer
 * HexBuffer -> TransactionObject
 * @Author: JohnTrump
 * @Date: 2019-11-22 00:27:17
 * @Last Modified by: JohnTrump
 * @Last Modified time: 2019-11-25 13:26:45
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

(async () => { 
  let data = await rpc.get_block(92045580) //get the first block
  console.log(data);
})();

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
const serializeString =
  "36e6dd5d228f02485904000000000180f3d414619730fd0000000000e94c44013044a852df3c1b7d0000000080ab26a7103044a852df3c1b7d045a4f530000000000";

const serializeHex = Buffer.from(serializeString, "hex");
console.log("serializeString", serializeString);
console.log("serializeHex", serializeHex);

const deserializeTransaction = api.deserializeTransaction(serializeHex);
console.log("deserializeTransaction", deserializeTransaction);

const serializeHex_1 = api.serializeTransaction(deserializeTransaction);
console.log(serializeHex_1);

serializeHex_1.toString();

// 翻转Hex
function reverseHex(h) {
  return h.substr(6, 2) + h.substr(4, 2) + h.substr(2, 2) + h.substr(0, 2);
}

let block_id =
  "0576a059950f892883d4281a0fdd51ce092a1d418587bbee48b5da2bbf252340";
function refBlockPrefix() {
  console.log("block_id.substr(16, 8):", block_id.substr(16, 8)); // a6686940
  console.log(
    "reverseHex block_id.substr(16, 8):",
    reverseHex(block_id.substr(16, 8))
  ); // 406968a6
  let ref_block_prefix = parseInt(reverseHex(block_id.substr(16, 8)), 16);
  console.log(ref_block_prefix);
}

// refBlockPrefix();

function refBlockNum() {
  let block_num = block_id.substr(0, 8);
  block_num_hex = parseInt(block_num, 16);
  console.log("block_num_hex:", block_num_hex);
  console.log("block_num_hex & 0xffff:", block_num_hex & 0xffff); // 取低32bits
}

// refBlockNum();

function test() {
  console.log({
    ref_block_num: parseInt(block_id.substr(0, 8), 16) & 0xffff,
    ref_block_prefix: parseInt(reverseHex(block_id.substr(16, 8)), 16)
  });
}
test();
