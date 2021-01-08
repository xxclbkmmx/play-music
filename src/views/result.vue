<template>
  <div class="result">
    <div>
      <div class="search">
        <h1>{{ $route.query.q }}</h1>
        <span>找到{{ count }}个结果</span>
      </div>
      <!-- 标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲" name="first">
          <div class="table">
            <table class="el-table">
              <thead>
                <th></th>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>专辑</th>
                <th>时长</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in songList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td @dblclick="play(item.id)">
                    {{ item.name }}
                    <span class="icon icon-mv" v-if="item.mvid != 0"></span>
                  </td>
                  <td>{{ item.ar[0].name }}</td>
                  <td>{{ item.al.name }}</td>
                  <td>{{ item.dt | timeFormat }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <!-- 发现歌单 -->
          <div class="recommend">
            <div class="lists">
              <div
                class="list"
                v-for="(item, index) in playList"
                :key="index"
                @click="toPlaylist(item.id)"
              >
                <img :src="item.coverImgUrl" />
                <span class="shadow"></span>
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <div class="recomm">
            <div class="mvs">
              <div class="mv" v-for="(item, index) in mvList" :key="index">
                <img :src="item.cover" alt="" />
                <h4>{{ item.name }}</h4>
                <span>▶{{ item.playCount | playCount }}</span>
                <h5>{{ item.artists[0].name }}</h5>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 对应选项 -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      //保存歌曲字段
      songList: [],
      //保存歌单字段
      playList: [],
      //保存mv字段
      mvList: [],
      //搜索量
      count: "",
    };
  },
  // 过滤器
  filters: {
    // 播放量过滤器
    playCount(val) {
      if (val > 10000) {
        val = parseInt(val / 10000) + "万";
      }
      return `${val}`;
    },
  },
  // 侦听器
  watch: {
    activeName() {
      let type = 1;
      switch (this.activeName) {
        case "first":
          type = 1;
          break;
        case "second":
          type = 1000;
          break;
        case "third":
          type = 1004;
          break;
      }
      this.search(type);
    },
  },
  methods: {
    // 播放歌曲
    play(id) {
      axios({
        url: "/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    },
    //搜索结果
    search(type) {
      axios({
        url: "/cloudsearch",
        methods: "get",
        params: {
          keywords: this.$route.query.q,
          limit: 12,
          type: type,
        },
      }).then((res) => {
        console.log(res);
        if (type == 1) {
          this.songList = res.data.result.songs;
          this.count = res.data.result.songCount;
        } else if (type == 1000) {
          this.playList = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
        } else {
          this.mvList = res.data.result.mvs;
          this.count = res.data.result.mvCount;
        }
      });
    },
    // 歌单详情页
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
    },
  },
  created() {
    this.search();
    console.log("加载");
  },
  mounted() {},
};
</script>

<style scoped>
.result {
  margin-left: 200px;
}
.result > div {
  margin: 80px auto;
  width: 80%;
}
.search {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.search span {
  margin-left: 20px;
  margin-bottom: 4px;
  color: #999;
}
td {
  cursor: pointer;
  font-size: 16px;
}
/* 歌单 */
.lists {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 250px);
  justify-items: center;
  justify-content: space-between;
  align-items: center;
}
.list {
  width: 200px;
  position: relative;
  margin: 10px;
  overflow: hidden;
}
.list:hover::before {
  position: absolute;
  content: "热门推荐";
  color: #fff;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 160px;
  transition: all 0.3s ease;
  animation: move 0.5s ease-in;
}
@keyframes move {
  from {
    top: -50px;
  }
  to {
    top: 0px;
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
  cursor: pointer;
}
/* mv */
.recomm {
  width: 0 auto;
}
.mvs {
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: space-between;
}
.mv {
  padding: 10px;
  position: relative;
  height: 200px;
}
.mv span {
  position: absolute;
  right: 20px;
  top: 14px;
  color: #fff;
}
.mv h4 {
  margin-top: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 250px;
}
.mv h5 {
  color: #999;
}
.mv img {
  width: 250px;
  border-radius: 5px;
}
</style>