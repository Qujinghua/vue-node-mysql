<template>
  <div>
    <side-bar></side-bar>
    <container></container>
  </div>
</template>
<script>
import sideBar from "./sidebar/index.vue"
import container from "./container/index.vue"
export default {
  data () {
    return {

    }
  },
  components: {
    sideBar,
    container
  },
  methods: {

  }
}
</script>

