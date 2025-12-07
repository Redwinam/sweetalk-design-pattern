<script setup>
import { provide, ref, reactive, onMounted } from 'vue'

const tabs = reactive([])
const activeIndex = ref(0)

const registerTab = (tab) => {
  tabs.push(tab)
  // 默认激活第一个
  if (tabs.length === 1) {
    tab.setActive(true)
  }
}

const selectTab = (index) => {
  activeIndex.value = index
  tabs.forEach((tab, i) => {
    tab.setActive(i === index)
  })
}

provide('tabsProvider', {
  registerTab
})
</script>

<template>
  <div class="app-tabs">
    <div class="app-tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="app-tab-button"
        :class="{ active: index === activeIndex }"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="app-tabs-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app-tabs {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  overflow: hidden;
}

.app-tabs-header {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.app-tab-button {
  padding: 12px 24px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s, background-color 0.25s;
  border-right: 1px solid var(--vp-c-divider);
}

.app-tab-button:last-child {
  border-right: none;
}

.app-tab-button:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-mute);
}

.app-tab-button.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-brand); /* 可选：增加底部指示条 */
  margin-bottom: -1px; /* 遮住底部的边框 */
  font-weight: 600;
  border-bottom: 2px solid transparent; /* Remove bottom border */
}

.app-tabs-body {
  padding: 24px;
}

.app-tabs-body :deep(h1:first-child),
.app-tabs-body :deep(h2:first-child),
.app-tabs-body :deep(h3:first-child),
.app-tabs-body :deep(h4:first-child) {
  margin-top: 0;
  border-top: none;
  padding-top: 0;
}
</style>
