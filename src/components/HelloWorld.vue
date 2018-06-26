<template>
  <div class="hello">
    <v-tabs tabs-fixed="true" tabs-offset="0" tabs-init="0" tab-click="activeTab">
              <v-tab tab-title="Tab1" tab-id="tab1">
                <div class="content-block">
                  <p style="height:600px">Tab 1 content start</p>
                  <p >Tab 1 content end</p>
                </div>
              </v-tab>
              <v-tab tab-title="Tab2" tab-id="tab2">
                <div class="content-block">
                  <p style="height:300px">Tab 2 content start</p>
                  <p >Tab 2 content end</p>
                </div>
              </v-tab>
              <v-tab tab-title="Tab3" tab-id="tab3">
                <div class="content-block">
                  <p style="height:1000px">Tab 3 content start</p>
                  <p >Tab 3 content end</p>
                </div>
              </v-tab>
              <v-tab tab-title="Tab4" tab-id="tab4">
                <div class="content-block">
                  <p style="height:1000px">Tab 3 content start</p>
                  <p >Tab 3 content end</p>
                </div>
              </v-tab>
            </v-tabs>
  </div>
</template>

<script>
  import vTabs from './tabs/vTabs'
  import vTab from './tabs/vTab'
export default {
  name: 'HelloWorld',
  components: {
    vTabs,
    vTab
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabs-block{
    position: relative;
    .tabs-title { display: -webkit-flex; display: flex; background-color: #fff; text-align: center; width: 100%; left: 0px; top: 0; z-index: 1000 }
    .tabs-title .tab { -webkit-flex: 1; flex: 1; padding: .5rem; border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; }
    .tabs-title .tab:first-child { border-left: 0; }
    .tabs-title .tab.active { border-bottom: 3px solid #08acaa; }
    .tabs-content { background-color: #fff;  }
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
