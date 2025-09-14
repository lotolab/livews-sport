<template>
  <div class="layout-defaults">
    <router-view v-slot="{ Component, route }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        mode="out-in"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped></style>
