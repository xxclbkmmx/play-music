<template>
  <div class="index">
    <!-- 左侧导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/found"
            ><i class="icon icon-icon-test"></i><span>发现音乐</span>
          </router-link>
        </li>
        <li>
          <router-link to="/list"
            ><i class="icon icon-icon-19"></i><span>推荐歌单</span></router-link
          >
        </li>
        <li>
          <router-link to="/songs"
            ><i class="icon icon-musiclist"></i
            ><span>最新音乐</span></router-link
          >
        </li>
        <li>
          <router-link to="/mv">
            <i class="icon icon-mv"></i><span>最新MV</span></router-link
          >
        </li>
      </ul>
    </div>
    <!-- 右侧占位 -->
    <main>
      <!-- <found></found> -->
      <router-view :key="$route.query.t"></router-view>
      <!-- 音乐播放 -->
      <div class="player">
        <audio :src="musicUrl" controls autoplay></audio>
      </div>
    </main>
  </div>
</template>

<script>
import found from "../views/found";
export default {
  components: {
    found,
  },
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style scoped>
.index {
  display: flex;
}
.nav {
  width: 200px;
  text-align: center;
  background-color: #ededed;
  margin-top: 60px;
  height: 1000px;
}
.nav ul li {
  list-style: none;
  margin: 10px 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.nav ul li:hover {
  background-color: rgba(128, 128, 128, 0.2);
}
.nav span {
  font-size: 22px;
  color: #000;
  transition: all 0.2s ease-in;
  margin-left: 10px;
}
.nav span:hover {
  color: hsl(6deg, 65%, 62%);
  transition: all 0.2s ease-in;
}
.nav i {
  font-size: 24px;
}
a {
  text-decoration: none;
}
main {
  background-color: #fff;
  flex: 1;
}
a.router-link-active {
  color: hsl(6deg, 65%, 62%);
}
.player {
  position: fixed;
  bottom: 0;
  width: 84%;
}
.player audio {
  width: 100%;
}
</style>