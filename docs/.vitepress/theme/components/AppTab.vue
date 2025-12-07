<script setup>
import { provide, ref, inject, onMounted, useSlots, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const tabsProvider = inject('tabsProvider')
const isActive = ref(false)

// 注册当前 tab
if (tabsProvider) {
  tabsProvider.registerTab({
    label: props.label,
    setActive: (active) => {
      isActive.value = active
    }
  })
}
</script>

<template>
  <div v-show="isActive" class="app-tab-content">
    <slot></slot>
  </div>
</template>
