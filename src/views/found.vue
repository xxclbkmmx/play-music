<template>
  <div class="found">
    <div class="cloud">
      <!-- 选项卡 -->
      <div class="swiper">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in banners" :key="index">
            <img :src="item.imageUrl" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 推荐歌单 -->
      <div class="recommend">
        <h3>推荐歌单</h3>
        <div class="lists">
          <div class="list" v-for="(item, index) in mvs" :key="index">
            <img :src="item.picUrl" />
            <span class="shadow"></span>
            <i class="icon icon-icon-test"></i>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <!-- 最新音乐 -->
      <div class="newmusic">
        <h3>最新音乐</h3>
        <div class="musics">
          <div class="music" v-for="(item, index) in newSongs" :key="index">
            <img :src="item.picUrl" alt="" @click="playMusic(item.id)" />
            <div class="item">
              <h4>{{ item.name }}</h4>
              <span>{{ item.song.artists[0].name }}</span>
            </div>
            <!-- <div><span class="icon icon-icon-test play"></span></div> -->
          </div>
        </div>
      </div>
      <!-- 推荐mv -->
      <div class="recomm">
        <h3>推荐MV</h3>
        <div class="mvs">
          <div class="mv" v-for="(item, index) in mv" :key="index">
            <img :src="item.picUrl" alt="" @click="toPlayMv(item.id)" />
            <h4>{{ item.copywriter }}</h4>
            <span>{{ item.artists[0].name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      mvs: [],
      //最新音乐
      newSongs: [],
      // 播放mv
      mv: [],
    };
  },
  created() {
    // 轮播图
    axios({
      url: "/banner",
      method: "get",
    }).then((res) => {
      this.banners = res.data.banners;
    });
    // 推荐歌单
    axios({
      url: "/personalized",
      method: "get",
      params: {
        limit: 15,
      },
    }).then((res) => {
      this.mvs = res.data.result;
    });
    // 最新音乐
    axios({
      url: "/personalized/newsong",
      method: "get",
      params: {
        limit: 8,
      },
    }).then((res) => {
      this.newSongs = res.data.result;
    });
    // 播放mv
    axios({
      url: "/personalized/mv",
      method: "get",
    }).then((res) => {
      this.mv = res.data.result;
    });
  },
  methods: {
    // 拿到音乐的id
    playMusic(id) {
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
    toPlayMv(id) {
      this.$router.push(`/playmv?q=${id}`);
    },
  },
};
</script>

<style scoped>
/* .swiper {
  width: 80%;
  margin: 70px auto;
} */
.swiper img {
  width: 100%;
}
.found {
  margin-left: 200px;
}
.cloud {
  width: 80%;
  margin: 70px auto;
}
.lists {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 250px);
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.list {
  width: 200px;
  position: relative;
  margin-top: 5px;
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
  animation: move 0.5s ease;
  border-radius: 5px;
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
  border-radius: 5px;
  cursor: pointer;
}
.list i:hover {
  opacity: 1;
}
.list i {
  font-size: 40px;
  color: #dd6d60;
  position: absolute;
  bottom: 30px;
  right: 8px;
  opacity: 0;
}
.newmusic {
  margin-top: 10px;
}
.musics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 100px);
}
.music {
  display: flex;
  flex-direction: row;
  padding: 10px 30px;
  transition: all 0.2s ease-in;
  position: relative;
}
.music img {
  cursor: pointer;
}
.music:hover {
  background-color: rgba(58, 53, 53, 0.1);
  transition: all 0.2s ease-in;
}
/* .music::after {
  position: absolute;
  background-color: red;
  content: "111";
} */
/* .play {
  display: none;
  position: absolute;
  left: 10%;
  top: 46%;
  z-index: -1;
}
.play:hover {
  z-index: 5;
  background-color: red;
  display: block;
} */
.item {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.item span {
  margin-top: 30px;
  color: hsl(0deg 0% 50%);
}
.music img {
  width: 80px;
  height: 80px;
}
.mvs {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-items: center;
  justify-content: space-between;
  align-items: center;
}
.mv {
  padding: 10px;
  position: relative;
}
/* .mv::after {
  position: absolute;
  content: "▶3433";
  right: 38px;
  top: 18px;
  color: #fff;
} */
.mv h4 {
  margin-top: 10px;
}
.mv span {
  color: hsl(0deg 0% 50%);
}
.mv img {
  width: 250px;
  border-radius: 5px;
}
</style>