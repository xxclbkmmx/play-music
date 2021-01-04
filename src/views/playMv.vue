<template>
  <div class="main">
    <el-row :gutter="20">
      <!-- mv详情 -->
      <el-col :span="18">
        <h3>Mv详情</h3>
        <video :src="mvUrl" controls></video>
        <div class="intro">
          <img :src="airtistPic" alt="" />
          <span>{{ mv.artistName }}</span>
        </div>
        <!-- 歌名 -->
        <h2>{{ mv.name }}</h2>
        <div class="time">
          <span>发布：{{ mv.publishTime }}</span>
          <span>播放：{{ mv.playCount | countFormat }}次</span>
        </div>
        <!-- 内容简介 -->
        <div class="summary">
          <p>{{ mv.desc }}</p>
        </div>
        <!-- 评论 -->
        <!-- 热门 -->
        <div class="hot" v-if="page < 2">
          <h3>热门评论({{ hotTotal }})</h3>
          <div class="items" v-for="(item, index) in comment" :key="index">
            <img :src="item.user.avatarUrl" alt="" />
            <div class="item">
              <div>
                {{ item.user.nickname }}：<span>{{ item.content }}</span>
              </div>
              <div class="reply" v-if="item.beReplied.length != 0">
                {{ item.beReplied[0].user.nickname }}：<span>{{
                  item.beReplied[0].content
                }}</span>
              </div>
              <span class="time">{{ item.time | dataFormat }}</span>
            </div>
          </div>
        </div>
        <!-- 最新 -->
        <div class="new">
          <h3>最新评论({{ hotTotal }})</h3>
          <div class="items" v-for="(item, index) in news" :key="index">
            <img :src="item.user.avatarUrl" alt="" />
            <div class="item">
              <div>
                {{ item.user.nickname }}：<span>{{ item.content }}</span>
              </div>
              <div class="reply" v-if="item.beReplied.length != 0">
                {{ item.beReplied[0].user.nickname }}：<span>{{
                  item.beReplied[0].content
                }}</span>
              </div>
              <span class="time">{{ item.time | dataFormat }}</span>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="pag">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="5"
            :current-page="page"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-col>
      <!-- 相关推荐 -->
      <el-col :span="6">
        <h3>相关推荐</h3>
        <div class="mvs" v-for="(item, index) in simimvs" :key="index">
          <div class="mv">
            <img :src="item.cover" alt="" @click="toPlay(item.id)" />
            <p>{{ item.name }}</p>
            <p>{{ item.artistName }}</p>
            <span>▶{{ item.playCount | countFormat }}</span>
            <span>{{ item.duration | timeFormat }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      // mv地址数据
      mvUrl: "",
      // mv信息
      mv: "",
      // 相关mv
      simimvs: [],
      // 歌手照片
      airtistPic: "",
      // 热门
      comment: [],
      // 最新
      news: [],
      // 评论个数
      hotTotal: "",
      total: 0,
      page: 1,
    };
  },
  methods: {
    // 跳转mv
    toPlay(id) {
      console.log(id);
      this.$router.push({
        path: "/playmv",
        query: {
          q: `${id}`,
          t: Date.now(),
        },
      });
    },
    // 分页器
    handleCurrentChange(val) {
      this.page = val;
      this.getComment();
    },
    // 获取评论
    getComment() {
      axios({
        url: "/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          offset: (this.page - 1) * 10,
        },
      }).then((res) => {
        console.log(res);
        this.comment = res.data.hotComments;
        this.news = res.data.comments;
        this.total = res.data.total;
        this.hotTotal = res.data.total;
        console.log(this.total);
      });
    },
  },
  created() {
    // 获取评论
    this.getComment();
    // mv
    axios({
      url: "/mv/url",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      this.mvUrl = res.data.data.url;
    });
    // mv信息
    axios({
      url: "mv/detail",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      this.mv = res.data.data;
      console.log(res);
      // 歌手id
      axios({
        url: "/artists",
        method: "get",
        params: {
          id: this.mv.artistId,
        },
      }).then((res) => {
        this.airtistPic = res.data.artist.picUrl;
      });
    });
    // 相关mv
    axios({
      url: "/simi/mv",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      this.simimvs = res.data.mvs;
    });
  },
};
</script>

<style scoped>
.main {
  margin: 80px auto;
  width: 80%;
}
.intro {
  display: flex;
  align-items: center;
}
video {
  width: 100%;
  margin-top: 20px;
}
.intro img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.intro span {
  font-size: 20px;
  margin-left: 6px;
}
h2 {
  margin-top: 20px;
}
.time {
  margin-top: 20px;
}
.time span {
  color: #bebebe;
}
.time span:nth-child(2) {
  margin-left: 20px;
}
.summary {
  margin-top: 20px;
}
.mv {
  position: relative;
  margin-top: 20px;
}
.mv img {
  width: 100%;
  max-width: 260px;
  height: 130px;
  border-radius: 8px;
}
.mv p:nth-child(3) {
  color: #bebebe;
}
.mv span:nth-child(4) {
  position: absolute;
  top: 2px;
  color: #fff;
  margin-left: 4px;
}
.mv span:nth-child(5) {
  position: absolute;
  top: 100px;
  left: 10px;
  color: #fff;
}
/* 评论 */
.hot {
  margin-top: 20px;
}
.items {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.items img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.item {
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  color: #000;
}
.time {
  margin-top: 6px;
  color: #bebebe;
}
.reply {
  padding: 10px;
  background: #bebebe;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
}
.new {
  margin-top: 50px;
}
.pag {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>