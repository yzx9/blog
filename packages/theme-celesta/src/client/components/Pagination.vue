<template>
  <ul class="flex flex-row justify-center select-none">
    <template v-for="p in pager">
      <template v-if="p.type === 'page'">
        <li
          class="pagination__item"
          :class="{ 'pagination__item--active': p.active }"
          @click="onCurrentChange(p.index)"
        >{{ p.index }}</li>
      </template>
      <template v-else-if="p.type === 'folder' && p.position === 'left'">
        <li class="pagination__item" @click="onExpand('left')">...</li>
      </template>
      <template v-else-if="p.type === 'folder' && p.position === 'right'">
        <li class="pagination__item" @click="onExpand('right')">...</li>
      </template>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue"

const emit = defineEmits(["update:current", "update:size"])

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
  pagerCount: {
    type: Number,
    default: 7,
    validator: (val: number) => {
      return Number.isInteger(val) && val >= 7 && val % 2 === 1
    },
  },
})

const totalPageRef = computed(() => Math.ceil(props.total / props.pageSize))

enum State {
  expanded,
  foldRight,
  foldLeft,
  foldBoth,
}

const state = computed(
  (): State => {
    const half = (props.pagerCount + 1) / 2

    if (totalPageRef.value <= props.pagerCount) {
      return State.expanded
    } else if (props.current <= half) {
      return State.foldRight
    } else if (props.current > totalPageRef.value - half) {
      return State.foldLeft
    } else {
      return State.foldBoth
    }
  }
)

const unfoldRef = computed(() => {
  switch (state.value) {
    case State.expanded:
      return { left: 1, right: totalPageRef.value }
    case State.foldRight:
      return { left: 1, right: props.pagerCount - 2 }
    case State.foldLeft:
      return {
        left: totalPageRef.value + 1 - (props.pagerCount - 2),
        right: totalPageRef.value,
      }
    case State.foldBoth:
      const half = (props.pagerCount - 5) / 2
      return {
        left: props.current - half,
        right: props.current + half,
      }
  }
})

type Pager = (
  | { type: "page"; index: number; active: boolean }
  | { type: "folder"; position: "left" | "right" }
)[]

const pager = computed(() => {
  const pager: Pager = []

  if ([State.foldLeft, State.foldBoth].includes(state.value)) {
    pager.push({ type: "page", index: 1, active: false })
    pager.push({ type: "folder", position: "left" })
  }

  for (let i = unfoldRef.value.left; i <= unfoldRef.value.right; i++) {
    pager.push({ type: "page", index: i, active: i === props.current })
  }

  if ([State.foldRight, State.foldBoth].includes(state.value)) {
    pager.push({ type: "folder", position: "right" })
    pager.push({ type: "page", index: totalPageRef.value, active: false })
  }

  return pager
})

const onCurrentChange = (cur: number) => emit("update:current", cur)

// TODO
const onSizeChange = (size: number) => emit("update:size", size)

const onExpand = (type: "left" | "right") => {
  const { current, pagerCount } = props
  const count = pagerCount - 4

  switch (type) {
    case "left":
      return onCurrentChange(current - count)
    case "right":
      return onCurrentChange(current + count)
  }
}
</script>

<style lang="postcss">
.pagination__item {
  @apply h-8 w-10 mx-2 leading-8 text-center cursor-pointer;
  @apply border rounded border-transparent;
  @apply transition-all text-gray-900 hover:text-primary-500;

  &.pagination__item--active {
    @apply text-primary-500 border-gray-200 hover:border-gray-300;
  }
}
</style>
