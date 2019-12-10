<template>
  <div>
    <!--这里最重要的是 :send=value，send也是可以随便取的，表示要传过去的值-->
    <slot name="listbox" v-for="value in list" :send="value"></slot>
    <!--这里最重要的是 :said='message'，said也是可以随便取的，表示要传过去的值-->
    <slot name="sayWhat" :said="message"></slot>

    <slot name="list">
      <ul>
        <li v-for="item in list" :key="item.id">{{ item.text }}</li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      list: [
        {
          id: 10,
          text: "apple"
        },
        {
          id: 20,
          text: "orange"
        },
        {
          id: 30,
          text: "banana"
        }
      ]
    };
  }
};
</script>