<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { clearLogin } from "./api/utils";

export default {
  name: "App",

  methods: {
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    },
  },
};
</script>
<style></style>
