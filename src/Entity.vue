<template>
<div class="vce">
  <slot name="entity-header">
    <div class="vce__header">
      <div class="vce__header-main">
        <slot name="entity-nav">
          <div class="vce__header-nav">
            <span class="vce__header-nav__item">
              {{ name }}
            </span>
            <span class="vce__header-nav__divider">/</span>
            <span class="vce__header-nav__item">
              created
            </span>
          </div>
        </slot>
        <slot name="entity-title">
          <h2>
            {{ name }}
            <small v-if="!isList">{{ isCreate ? 'create' : 'modify' }}</small>
          </h2>

        </slot>
      </div>
    </div>
    <div class="vce-header-aside">
      <button v-if="isList" @click="changePageState('create')">create</button>
      <button v-else @click="changePageState('list')">back</button>
    </div>
  </slot>

  <div v-show="isList">
    <slot name="entity-list">
        <table>
          <thead>
            <tr>
              <th v-for="f in entity.fields" :key="f.key">{{ f.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ed in items">
              <td v-for="f in entity.fields">
                {{ ed[f.key] }}
              </td>
            </tr>
          </tbody>
        </table>
    </slot>
  </div>
  <div v-show="!isList">
    <slot name="entity-detail">
      


      <slot name="entity-detail-footer">
        <button v-if="isCreate" @click="handleCreate">Create</button>
        <button v-else>Modify</button>
      </slot>
    </slot>
  </div>
  

    
</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue-demi'
import { Entity } from '.'
import { Field, PageState, EntityComposition } from './type'
export default defineComponent({
  props: {
    fields: {
      type: Array as PropType<Field[]>,
      default: () => ([]),
    },
    entity: {
      type: Object as PropType<EntityComposition>,
      required: true
    },
    name: {
      type: String as PropType<string>,
      default: ''
    },
  },
  setup (props) {
    const pageState = ref<PageState>(PageState.list)

    const isList = computed(() => pageState.value === PageState.list)
    const isCreate = computed(() => pageState.value === PageState.create)
    const items = computed(() => props.entity.entities.value)
    function changePageState (state: string | PageState) {
      window.history.pushState(null, '', window.location.pathname + '?' + state)
      pageState.value = state as PageState
    }

    onMounted(() => {
      pageState.value = window.location.search.substring(1) as PageState
      handleList()
    })


    function handleList () {
      props.entity.list()
    }

    function handleCreate () {
      props.entity.create({})
      .then(() => changePageState(PageState.list))

    }
    

    return {
      pageState,
      isList,
      isCreate,
      changePageState,
      handleCreate,
      items,
    }
    
  }
})
</script>