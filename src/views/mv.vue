<template>
  <div class="movie">
    <!-- 排序列表 -->
    <div class="sort">
      <div class="sort-1">
        <ul>
          <li><h4>地区:</h4></li>
          <li>
            <span :class="{ active: area == '全部' }" @click="area = '全部'"
              >全部</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: area == '内地' }" @click="area = '内地'"
              >内地</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: area == '港台' }" @click="area = '港台'"
              >港台</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: area == '欧美' }" @click="area = '欧美'"
              >欧美</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: area == '日本' }" @click="area = '日本'"
              >日本</span
            >
          </li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="sort-1">
        <ul>
          <li><h4>类型:</h4></li>
          <li>
            <span :class="{ active: type == '全部' }" @click="type = '全部'"
              >全部</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: type == '官方版' }" @click="type = '官方版'"
              >官方版</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: type == '原生' }" @click="type = '原生'"
              >原声</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: type == '现场版' }" @click="type = '现场版'"
              >现场版</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="sort-1">
        <ul>
          <li><h4>排序:</h4></li>
          <li>
            <span :class="{ active: order == '全部' }" @click="order = '全部'"
              >全部</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
              >上升最快</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: order == '最热' }" @click="order = '最热'"
              >最热</span
            >
          </li>
          <li><span>|</span></li>
          <li>
            <span :class="{ active: order == '最新' }" @click="order = '最新'"
              >最新</span
            >
          </li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <!-- 推荐mv -->
    <div class="recomm">
      <div class="mvs">
        <div class="mv" v-for="(item, index) in mvs" :key="index">
          <img :src="item.cover" alt="" />
          <h4>{{ item.name }}</h4>
          <span>▶{{ item.playCount }}</span>
          <h5>{{ item.artists[0].name }}</h5>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        class="lay"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
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
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 15,
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "全部",
      // 拿到的数据
      mvs: [],
    };
  },
  watch: {
    area() {
      this.page = 1;
      this.getList();
    },
    type() {
      this.page = 1;
      this.getList();
    },
    order() {
      this.page = 1;
      this.getList();
    },
  },
  methods: {
    // 获取数据
    getList() {
      axios({
        url: "/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        this.mvs = res.data.data;
        for (let i = 0; i < this.mvs.length; i++) {
          if (this.mvs[i].playCount > 100000) {
            this.mvs[i].playCount =
              parseInt(this.mvs[i].playCount / 10000) + "万";
          }
        }
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    // 页码该表方法
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.movie {
  margin: 60px auto;
  width: 80%;
}
.sort span {
  color: #999;
  cursor: pointer;
}
.sort-1 ul li {
  float: left;
  list-style: none;
  margin-left: 4%;
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
}
.sort .active {
  color: hsl(6deg 65% 62%);
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
  justify-content: space-between;
  margin-top: 20px;
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
.pagination {
  display: flex;
  justify-content: center;
}
</style>