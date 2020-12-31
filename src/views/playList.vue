<template>
  <div>歌单详情</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  created() {
    console.log(this.$route.query.q);
  },
};
</script>

<style scoped>
div {
  margin-top: 100px;
}
</style>