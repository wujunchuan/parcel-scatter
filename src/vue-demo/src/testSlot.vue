<template>
  <div>
    <slot name="header">
      header
    </slot>

    <slot name="default">
      default
    </slot>
    <slot name="footer">
      footer
    </slot>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped></style>
