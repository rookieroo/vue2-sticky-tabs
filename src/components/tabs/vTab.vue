<template>
  <div class="tab" v-show="isActive" :class="{active: isActive}">
    <slot></slot>
  </div>
</template>

<script>
  import eventHub from './eventCenter'
  export default {
    name: 'vTab',
    props: ['tabTitle', 'tabId'],
    data() {
      return {
        isActive: false
      }
    },
    computed: {
    },
    created() {
      eventHub.$on('active', this.active)
    },
    methods: {
      active(tab) {
        this.isActive = this.tabTitle === tab
      }
    },
    mounted: function () {
      eventHub.$emit('create', this.tabId, this.tabTitle)
      eventHub.$emit('ready', this)
    }
  }
</script>

<style scoped>

</style>
