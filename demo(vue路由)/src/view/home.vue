<template>
  <div>
    <h1>Welcome to Your Vue.js App</h1>
    <button @click="on">跳转</button>
    <h1>{{mag}}</h1>
    <div @click="ax">
      <axios></axios>
    </div>
  </div>
</template>

<script>
import axios from "@/view/axios";
export default {
  data() {
    return {
      mag: "首页"
    };
  },
  components: {
    axios
  },
  methods: {
    on() {
      this.$router.push({ path: "/qingting" });
    },
    ax() {
      this.$router.push({ path: "/axios" });
    }
  }
};
</script>

<style>
</style>