
<template>
  <div class="container">
    <h1>test-slot</h1>
    <test-slot>
      <h1 slot="header">App - Header</h1>
      haoa
      <h1 slot="footer">App - Footer</h1>
    </test-slot>
    <hr />
    <h1>test-scope-slot</h1>
    <test-scope-slot :message="bundler">
      <div slot="sayWhat" slot-scope="scope">
        获取slot['sayWhat'] - said {{ scope.said }}
      </div>
      <div slot="listbox" slot-scope="scope">
        获取slot['listbox'] - send {{ scope.send.text }}
      </div>
    </test-scope-slot>
  </div>
</template>

<script>
import Vue from "vue";

import testSlot from "./src/testSlot";
import testScopeSlot from "./src/testScopeSlot";

export default Vue.extend({
  data() {
    return {
      bundler: "Parcel"
    };
  },
  components: {
    testSlot,
    testScopeSlot
  }
});
</script>

<style lang="less" scoped>
</style>
