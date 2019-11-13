/*
 * Transfer Transaction mock data
 * @Author: JohnTrump
 * @Date: 2019-04-15 13:51:38
 * @Last Modified by: JohnTrump
 * @Last Modified time: 2019-11-13 15:15:54
 */
export default {
  actions: [
    {
      account: "eosio.token",
      name: "transfer",
      authorization: [
        {
          actor: "", // use account that was logged in
          permission: "active"
        }
      ],
      data: {
        from: "", // use account that was logged in
        to: "g.f.w",
        quantity: "0.0001 EOS",
        memo: "meet-dev-tools works!"
      }
    }
  ]
};
