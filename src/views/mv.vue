<template>
  <div class="movie">
    <!-- 排序列表 -->
    <div class="sort">
      <div class="sort-1">
        <ul>
          <li><h4>地区:</h4></li>
          <li><el-button size="small" round type="primary">全部</el-button></li>
          <li><span>|</span></li>
          <li><span>内地</span></li>
          <li><span>|</span></li>
          <li><span>港台</span></li>
          <li><span>|</span></li>
          <li><span>欧美</span></li>
          <li><span>|</span></li>
          <li><span>日本</span></li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="sort-1">
        <ul>
          <li><h4>类型:</h4></li>
          <li><el-button size="small" round type="primary">全部</el-button></li>
          <li><span>|</span></li>
          <li><span>官方版</span></li>
          <li><span>|</span></li>
          <li><span>原声</span></li>
          <li><span>|</span></li>
          <li><span>现场版</span></li>
          <li><span>|</span></li>
          <li><span>网易出品</span></li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="sort-1">
        <ul>
          <li><h4>排序:</h4></li>
          <li><el-button size="small" round type="primary">全部</el-button></li>
          <li><span>|</span></li>
          <li><span>上升最快</span></li>
          <li><span>|</span></li>
          <li><span>最热</span></li>
          <li><span>|</span></li>
          <li><span>最新</span></li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <!-- 推荐mv -->
    <div class="recomm">
      <div class="mvs">
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
        <div class="mv">
          <img src="../assets/3.jpg" alt="" />
          <h4>最新热门MV推荐</h4>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        class="lay"
        background
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
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
.movie {
  margin: 60px auto;
  width: 80%;
}
.sort span {
  color: #999;
}
.sort-1 ul li {
  float: left;
  list-style: none;
  margin-left: 4%;
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
}
.clear {
  clear: both;
}
.recomm {
  width: 0 auto;
}
.mvs {
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  margin-top: 20px;
}
.mv {
  padding: 10px;
  position: relative;
  height: 200px;
}
.mv::after {
  position: absolute;
  content: "▶3433";
  right: 20px;
  top: 14px;
  color: #fff;
}
.mv h4 {
  margin-top: 4px;
}
.mv span {
  color: hsl(0deg 0% 50%);
}
.mv img {
  width: 250px;
  border-radius: 5px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>