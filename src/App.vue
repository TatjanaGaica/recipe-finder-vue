<script setup></script>

<template>
  <el-page-header>
    <template #title>
      <span class="flex items-center">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </span>
    </template>
  </el-page-header>
  <RouterView></RouterView>
</template>

<style>
.el-select {
  width: 500px;
  padding: 0px 32px;
}

.el-button {
  padding: 15px 32px;
}

.description {
  padding: 0px 32px;
}

.search-block {
  display: flex;
  flex-direction: row;
}
</style>
