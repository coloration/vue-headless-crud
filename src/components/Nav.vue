<template>
<div class="vce-nav">
  <slot name="vce-nav" :items="items">
    <span class="vce__header-nav__item">
      {{ name }}
    </span>
    <template v-for="(item, i) in items">
      <span v-show="i !== 0" class="vce__header-nav__divider">/</span>
      <span class="vce__header-nav__item">
        {{ item }}
      </span>
    </template>
  </slot>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'vce-nav',
  props: {
    items: Array as PropType<string[]>
  },
  setup (props, context) {
    
  }
})
</script>