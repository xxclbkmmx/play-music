<template>
  <div class="listss">
    <!-- 精品歌单 -->
    <div class="top">
      <img :src="highquality.coverImgUrl" />
      <div class="top-card">
        <el-button plain>精品歌单</el-button>
        <h3>{{ highquality.copywriter }}</h3>
        <p>
          {{ highquality.description }}
        </p>
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="tab-bar">
      <span :class="{ active: tag == '全部' }" @click="tag = '全部'">全部</span>
      <span :class="{ active: tag == '欧美' }" @click="tag = '欧美'">欧美</span>
      <span :class="{ active: tag == '华语' }" @click="tag = '华语'">华语</span>
      <span :class="{ active: tag == '流行' }" @click="tag = '流行'">流行</span>
      <span :class="{ active: tag == '说唱' }" @click="tag = '说唱'">说唱</span>
      <span :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'">摇滚</span>
      <span :class="{ active: tag == '民谣' }" @click="tag = '民谣'">民谣</span>
      <span :class="{ active: tag == '电子' }" @click="tag = '电子'">电子</span>
      <span :class="{ active: tag == '轻音' }" @click="tag = '轻音'"
        >轻音乐</span
      >
      <span :class="{ active: tag == '影视原声' }" @click="tag = '影视原声'"
        >影视原声</span
      >
      <span :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'">ACG</span>
      <span :class="{ active: tag == '怀旧' }" @click="tag = '怀旧'">怀旧</span>
      <span :class="{ active: tag == '治愈' }" @click="tag = '治愈'">治愈</span>
    </div>
    <div class="clear"></div>
    <!-- 歌单 -->
    <div class="main">
      <div class="recommend">
        <div class="lists">
          <div class="list" v-for="(item, index) in playlists" :key="index">
            <img :src="item.coverImgUrl" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        class="lay"
        background
        :total="total"
        :current-page="page"
        :page-size="10"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      // 精品歌单
      highquality: [],
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单列表
      playlists: [],
      // 点击高亮
      tag: "全部",
    };
  },
  watch: {
    // 监听的是span标签内的tag，原本是方法，简写在行内了
    tag() {
      // 精品歌单
      this.topData();
      // 歌单列表
      this.listData();
      // 每次切换都重新设置页码
      this.page = 1;
    },
  },
  created() {
    // 精品歌单
    this.topData();
    // 歌单列表
    this.listData();
  },
  methods: {
    // 顶部数据方法
    topData() {
      axios({
        url: "/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        this.highquality = res.data.playlists[0];
      });
    },
    // 精品歌单
    listData() {
      axios({
        url: "/top/playlist",
        method: "get",
        params: {
          limit: 8,
          offset: (this.page - 1) * 8,
          cat: this.tag,
        },
      }).then((res) => {
        this.playlists = res.data.playlists;
        this.total = res.data.total;
      });
    },
    // 页码改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.listData();
    },
  },
};
</script>

<style scoped>
.listss {
  width: 85%;
  margin: 80px auto;
}
.top {
  width: 100%;
  background: url("../assets/4.jpg") center;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
}
.top img {
  width: 160px;
}
.top-card {
  margin: 10px;
}
.top-card h3 {
  color: #fff;
  margin: 10px 0;
}
.top-card p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #999;
}
.tab-bar {
  float: right;
  margin: 30px 0;
  color: #999;
}
.active {
  color: rgb(221, 109, 96);
}
.clear {
  clear: both;
}
.tab-bar span {
  margin-left: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.tab-bar span:hover {
  transition: all 0.2s ease-in;
}
.lists {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-template-rows: repeat(auto-fill, 250px);
  justify-items: center;
  margin: 0 auto;
}
.list {
  width: 200px;
  position: relative;
  margin: 10px;
}
.list:hover::before {
  position: absolute;
  content: "播放量2372";
  color: #fff;
  height: 30px;
  padding: 0 20px;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 160px;
  transition: all 0.3s ease;
  animation: move 0.5s ease-in;
}
.list:hover::after {
  position: absolute;
  content: "";
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 50px;
  right: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 1s ease;
}
@keyframes move {
  from {
    height: 0px;
  }
  to {
    height: 30px;
  }
}
.list p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>