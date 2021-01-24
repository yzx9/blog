<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <Ghost />
      <div class="info">
        <span class="title">404</span>
        <blockquote>{{ getMsg() }}</blockquote>

        <RouterLink to="/">{{ getLinkTitle() }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import Ghost from "./components/ghost.vue"

const messages = {
  "en-US": [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
    `You are drunk.`,
    `The page you're looking for doesn't exist. Ooops`,
    `This is awkward`
  ],
  "zh-CN": ["你来到了世界尽头", "你来到了洪荒之地", "知识尚未触及"]
}
const linkTitles = {
  "en-US": ["Take me home.", "Go Home", "Homepage", "HEAD ON HOME"],
  "zh-CN": ["返回主页"]
}

const localization = lang => i18n => i18n[lang] ?? i18n["en-US"]
const rand = arr => arr[Math.floor(Math.random() * arr.length)]

export default {
  components: {
    Ghost
  },
  methods: {
    getMsg() {
      return rand(localization(this.$lang)(messages))
    },
    getLinkTitle() {
      return rand(localization(this.$lang)(linkTitles))
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-container {
  display: flex;
  align-items: center;

  .theme-default-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
}

.info {
  min-width: 400px;

  .title {
    font-size: 6rem;
    color: $accentColor;
  }
}
</style>