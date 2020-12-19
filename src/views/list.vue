<template>
  <div class="listss">
    <!-- 精品歌单 -->
    <div class="top">
      <img src="../assets/4.jpg" />
      <div class="top-card">
        <el-button plain>精品歌单</el-button>
        <h3>Acoustic | 人生最好的境界是丰富的安静</h3>
        <p>
          做一个安静细微的人，于角落里自在开放，默默悦人，却始终不引起过分热闹的关注，保有独立而随意的品格，这就很好
          人生最好的境界是丰富的安静，安静，是因为摆脱了外界虚名浮利的诱惑，丰富，是因为拥有了内在精神世界的宝藏
          就低质量社交，高质量独处，去拥有内在精神世界的宝藏吧 P.S. Acoustic &
          Acoustic
          Version常用意思是"不插电"，指的是原声版的歌曲，表示不含电子合成音乐，而是由纯乐队演奏的版本，非MIDI合成音乐，当歌曲需要重新编曲演绎的时候，那么重新编曲之前的就称为Acoustic
          Version，不插电即Unplugged，直译为"拔掉电源插头"，是指不使用电子乐器，不经过电子设备的修饰加工的现场化的流行音乐表演形式
          其实一首歌都是从一种心境开始写起
        </p>
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="tab-bar">
      <span>全部</span>
      <span>欧美</span>
      <span>华语</span>
      <span>流行</span>
      <span>说唱</span>
      <span>摇滚</span>
      <span>民谣</span>
      <span>电子</span>
      <span>轻音乐</span>
      <span>影视原声</span>
      <span>ACG</span>
      <span>怀旧</span>
      <span>治愈</span>
    </div>
    <div class="clear"></div>
    <!-- 歌单 -->
    <div class="main">
      <div class="recommend">
        <div class="lists">
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
          <div class="list">
            <img src="../assets/2.jpg" />
            <p>所以你并没有坚定地选择过我</p>
          </div>
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