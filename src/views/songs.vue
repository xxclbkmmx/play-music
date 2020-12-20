<template>
  <div class="songs">
    <!-- 选项卡 -->
    <div class="tab-bar">
      <span :class="{ active: tag == 0 }" @click="tag = 0">全部</span>
      <span :class="{ active: tag == 36 }" @click="tag = 96">欧美</span>
      <span :class="{ active: tag == 7 }" @click="tag = 7">华语</span>
      <span :class="{ active: tag == 8 }" @click="tag = 8">日本</span>
    </div>
    <div class="clear"></div>
    <!-- 表格 -->
    <div class="play-table">
      <table class="el-table">
        <thead>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="item.album.picUrl" @click="playSong(item.id)" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.album.artists[0].name }}</td>
            <td>{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      // 歌曲数据
      lists: [],
      // 分类
      tag: 0,
    };
  },
  methods: {
    // 获取最新歌曲
    getSongs() {
      axios({
        url: "/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        this.lists = res.data.data;
        console.log(this.lists);
        // 格式化时间
        for (let i = 0; i < this.lists.length; i++) {
          let duration = this.lists[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.lists[i].duration = `${min}:${sec}`;
        }
      });
    },
    // 音乐播放
    playSong(id) {
      axios({
        url: "/song/url",
        method: "get",
        params: { id },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    },
  },
  watch: {
    tag() {
      this.getSongs();
    },
  },
  created() {
    this.getSongs();
  },
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
.active {
  color: hsl(6deg 65% 62%);
}
.tab-bar span {
  margin-left: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.tab-bar span:hover {
  transition: all 0.2s ease-in;
}
.play-table {
  width: 100%;
}
thead {
  display: table-header-group;
  vertical-align: middle;
}
table {
  width: 100%;
  margin: 0 auto;
}
table th:nth-child(1) {
  width: 20px;
}
tbody tr:nth-child(2n) {
  background: rgb(249, 249, 249);
}
table th {
  width: 130px;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
}
.el-table {
  border-collapse: collapse;
}
.play-table img {
  width: 60px;
}
</style>