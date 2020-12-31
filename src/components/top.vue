<template>
  <div class="top">
    <div class="top-left">
      <span class="icon icon-home"></span>
      <span class="icon icon-sami-select"></span>
      <span class="icon icon-fullscreen"></span>
    </div>
    <div class="top-center">
      <span class="icon icon-arrowleft"></span>
      <span class="icon icon-arrow-right"></span>
    </div>
    <div class="top-right">
      <el-input
        class="search"
        placeholder="搜索歌曲"
        v-model="inputValue"
        @keyup.enter.native="toResult"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toResult() {
      if (this.inputValue == "") {
        this.$message.warning("请输入内容");
      } else {
        this.$router.push("/result?q=" + this.inputValue);
      }
    },
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  background: rgb(249, 249, 249);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 20;
}
.top {
  position: fixed;
}
.top-left {
  position: absolute;
  top: 10px;
}
span:nth-child(1) {
  background: rgb(221, 109, 96);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 5px;
}
span:nth-child(2) {
  background: rgb(220, 192, 96);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  padding: 5px;
  margin-left: 10px;
}
span:nth-child(3) {
  background: rgb(132, 187, 88);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  padding: 5px;
  margin-left: 10px;
}
span:nth-child(4) {
  background: rgb(132, 187, 88);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 5px;
  margin-left: 10px;
}
.top-center {
  margin-left: 180px;
}
.top-center span:hover {
  background-color: rgba(128, 128, 128, 0.2);
  padding: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.top-center span {
  background-color: rgb(249, 249, 249);
  transition: all 0.2s ease-in;
}
.el-input__inner {
  height: 30px;
}
</style>