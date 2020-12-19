<template>
  <div class="songs">
    <!-- 选项卡 -->
    <div class="tab-bar">
      <span>全部</span>
      <span>欧美</span>
      <span>华语</span>
      <span>日本</span>
    </div>
    <div class="clear"></div>
    <!-- 表格 -->
    <div class="play-table">
      <el-table stripe style="width: 100%">
        <thead>
          <el-table-column></el-table-column>
          <el-table-column> </el-table-column>
          <el-table-column label="音乐标题" width="240"> </el-table-column>
          <el-table-column label="歌手" width="160"> </el-table-column>
          <el-table-column label="专辑" width="220"> </el-table-column>
          <el-table-column label="时长"> </el-table-column>
        </thead>
        <tbody></tbody>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.songs {
  width: 80%;
  margin: 60px auto;
}
.tab-bar {
  float: right;
  margin: 30px 0;
}
.clear {
  clear: both;
}
.tab-bar span {
  margin-left: 1em;
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease-in;
}
.tab-bar span:hover {
  color: rgb(221, 109, 96);
  transition: all 0.2s ease-in;
}
.play-table {
  width: 100%;
}
.play-table img {
  width: 70px;
}
</style>