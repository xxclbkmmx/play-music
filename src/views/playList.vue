<template>
  <div class="main">
    <!-- 顶部简介 -->
    <div class="top">
      <div class="top-left">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="top-right">
        <p class="title">
          {{ playlist.name }}
        </p>
        <div class="avatar">
          <img :src="creator.avatarUrl" alt="" />
          <div>{{ creator.nickname }}</div>
          <div class="create">{{ playlist.createTime | dataFormat }}创建</div>
        </div>
        <!-- 标签 -->
        <p class="lab">
          标签：<span>{{ tags | tabFormat }}</span>
        </p>
        <p class="lab">
          简介：<span>{{ creator.signature }}</span>
        </p>
      </div>
    </div>
    <!-- 标签页 -->
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <table class="el-table" stripe>
            <thead>
              <th></th>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tracks" :key="index">
                <td>{{ index + 1 }}</td>
                <td><img :src="item.al.picUrl" alt="" /></td>
                <td>{{ item.name }}<span class="icon icon-mv"></span></td>
                <td>和手</td>
                <td>{{ item.al.name }}</td>
                <td>1:00</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <!-- 评论 -->
        <el-tab-pane label="评论()" name="second">
          <div class="all">
            <!-- 热门 -->
            <div class="hot">
              <h3>热门评论</h3>
              <div class="items">
                <img src="../assets/4.jpg" alt="" />
                <div class="item">
                  <div>
                    请你一定战胜抑郁症：<span
                      >他结婚的那天，所有的‘我爱你’都</span
                    >
                  </div>
                  <span class="time">2020-05-14 11:43:33</span>
                </div>
              </div>
            </div>
            <!-- 最新 -->
            <div class="new">
              <h3>最新评论</h3>
              <div class="items">
                <img src="../assets/4.jpg" alt="" />
                <div class="item">
                  <div>
                    请你一定战胜抑郁症：<span
                      >他结婚的那天，所有的‘我爱你’都</span
                    >
                  </div>
                  <span class="time">2020-05-14 11:43:33</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000">
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
      // 选项卡默认
      activeName: "",
      // 歌单数据
      playlist: "",
      //歌单数据中的一项
      creator: "",
      // 标签分类
      tags: [],
      // 歌曲列表数据
      tracks: [],
    };
  },
  // 过滤器
  filters: {
    // 时间过滤器
    dataFormat(val) {
      let date = new Date(val);
      let year = date.getFullYear();
      // 数字转换为字符串才可以进行拼接
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // 标签
    tabFormat(val) {
      let str = val.join("/");
      return `${str}`;
    },
  },
  methods: {},
  created() {
    console.log(this.$route.query.q);
    axios({
      url: "/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      console.log(res);
      this.playlist = res.data.playlist;
      this.creator = res.data.playlist.creator;
      this.tags = res.data.playlist.tags;
      this.tracks = res.data.playlist.tracks;
    });
  },
};
</script>

<style scoped>
.main {
  margin: 110px auto;
  width: 80%;
}
.top {
  display: flex;
  flex-direction: row;
}
.top-left img {
  width: 230px;
}
.top-right {
  margin-left: 20px;
  font-size: 18px;
}
.avatar {
  display: flex;
  flex-direction: row;
  height: 35px;
  line-height: 35px;
  margin-top: 20px;
  font-size: 16px;
}
.create {
  margin-left: 10px;
}
.top-right img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 16px;
}
.lab {
  margin-top: 20px;
}
.lab span {
  font-size: 16px;
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
.new {
  margin-top: 50px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
td img {
  width: 70px;
}
</style>