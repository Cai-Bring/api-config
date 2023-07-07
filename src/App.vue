<template>
  <div>API请求基础封装</div>
</template>
<script lang="ts" setup>
import { userAPI } from "./shared/api/account";
import { onMounted } from "vue";

onMounted(() => {
  // 获取测试
  userAPI.get("123").then((res) => {
    console.log(res);
  });
  // 导出测试
  userAPI.export({ pageNum: 1, pageSize: 10 }).then((res) => {
    console.log(res);
  });
});
</script>
