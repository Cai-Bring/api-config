<template>
  <div>API请求基础封装</div>
</template>
<script lang="ts" setup>
import { userAPI } from "./shared/api/account";
import { onMounted } from "vue";

onMounted(() => {
  userAPI.get("123").then((res) => {
    console.log(res);
  });
});
</script>
