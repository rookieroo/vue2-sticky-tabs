<template>
  <div v-fixed-tabs="vFixedTabs" class="tabs-block" :class="classes">
    <div class="tabs-title" :class="titleClasses">
      <span
        class="tab"
        :class="{ active: isActive === tab.title }"
       @click="callTab(tab)"
        v-for="tab in tabs">
        {{ tab.title }}</span>
    </div>
    <div class="tabs-content" :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import eventHub from './eventCenter'
export default {
  name: 'vTabs',
  props: ['tabsInit', 'tabClick', 'tabsFixed', 'tabsClasses', 'tabsTitleClasses', 'tabsTitleItemClasses', 'tabsContentClasses'],
  data() {
    return {
      tabs: [],
      isActive: '',
      vFixedTabs: this.tabsFixed,
      classes: [],
      titleClasses: [],
      contentClasses: [],
      clickMethod: this.tabClick
    }
  },
  computed: {

  },
  created() {
    eventHub.$on('create', this.create)
  },
  methods: {
    create(id, title) {
      this.tabs.push({
        id: id,
        title: title
      })
    },
    callTab(tab) {
      this.isActive = tab.title
      eventHub.$emit('active', tab.title)
      if (this.clickMethod) {
        let tabId = tab.id || tab.title
        eventHub.$emit(this.clickMethod, tabId)
      }
    },
    init() {
      let activeIndex = this.tabsInit || 0
      this.callTab(this.tabs[activeIndex])
    }
  },
  mounted: function () {
    this.classes = this.tabsClasses ? this.tabsClasses.split(',') : []
    this.titleClasses = this.tabsTitleClasses ? this.tabsTitleClasses.split(',') : []
    this.contentClasses = this.tabsContentClasses ? this.tabsContentClasses.split(',') : []
    this.init()
    eventHub.$emit('ready', this)
  }
}
</script>

<style scoped>
</style>
