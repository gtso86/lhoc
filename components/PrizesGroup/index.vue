<template>
  <div class="d-flex">
    <prizes-stamp
      v-for="(stamp, index) in list"
      :key="index"
      :class="stampClass"
      :stamp="stamp"
    />
  </div>
</template>

<script>
import PrizesStamp from '@/components/PrizesStamp/index.vue'

export default {
  name: 'PrizesGroup',
  components: {
    PrizesStamp
  },
  props: {
    list: {
      type: [Array, Object],
      default: () => {}
    },
    stampClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
