<template>
  <div
    class="flex flex-col items-center m-4 py-4 text-gray-400 text-sm select-none"
  >
    <span>{{ copyright }}</span>
    <span
      >Powered by
      <a href="https://vuepress.vuejs.org/" target="_blank" class="underline"
        >Vuepress</a
      ></span
    >
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date(Date.now()).getFullYear()
const author = "Celeste"

const copyrightRaw = "Copyright © 2021 – :year :author"
const copyright = copyrightRaw
  .replace(":year", currentYear.toString())
  .replace(":author", author)
</script>
