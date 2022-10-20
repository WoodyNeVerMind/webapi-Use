<template>
  <div>
    <div class="search-panel">
      <el-autocomplete
        class="search-input"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="输入你想了解的电子产品"
        :trigger-on-focus="false"
        @select="TurnPage()"
      >
        <el-button
          slot="append"
          class="search-btn"
          icon="el-icon-search"
          @click="TurnPage()"
        ></el-button>
      </el-autocomplete>
      <!-- 点击清除输入框内容 -->
      <span class="search-reset" @click="clearInput()">&times;</span>
    </div>
    <div class="hotvideo">
      <el-card class="box-card" v-loading="loadingHotVideo">
        <el-descriptions
          title="热门评测"
          direction="vertical"
          :column="1"
          :colon="showColon"
        >
          <el-descriptions-item
            ><el-link @click="openVideo(0)">{{
              this.hotVideoTitles[0]
            }}</el-link>
          </el-descriptions-item>
          <el-descriptions-item
            ><el-link @click="openVideo(1)">{{
              this.hotVideoTitles[1]
            }}</el-link> </el-descriptions-item
          ><el-descriptions-item
            ><el-link @click="openVideo(2)">{{
              this.hotVideoTitles[2]
            }}</el-link> </el-descriptions-item
          ><el-descriptions-item
            ><el-link @click="openVideo(3)">{{
              this.hotVideoTitles[3]
            }}</el-link>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import { indexOf } from "shelljs/commands";
import { getSuggest, getHotVideo } from "../api/bilibili.js";
// import { getCover } from "../api/bing.js";
export default {
  name: "Index",
  data() {
    return {
      keyword: "", //v-model绑定
      searchIndex: 0,
      coverUrl: "",
      hotVideoTitles: [],
      hotVideoUrls: [],
      showColon: false,
      loadingHotVideo: true
    };
  },
  created() {
    this.initHotVideo();
  },
  methods: {
    selectClick: function(index) {
      this.keyword = this.myData[index];
      this.search();
    },
    clearInput: function() {
      this.keyword = "";
    },
    TurnPage: function() {
      this.$router.push({
        path: "./MainPage",
        query: {
          keyword: this.keyword
        }
      });
    },
    querySearch(queryString, cb) {
      getSuggest(queryString).then(res => {
        this.suggestions = res.data;
        let arr = [];
        for (const i in this.suggestions) {
          arr.push({ value: this.suggestions[i].name });
          if (i > 3) {
            break;
          }
        }
        cb(arr);
      });
    },
    initHotVideo() {
      getHotVideo().then(res => {
        var k = 0;
        for (var i = 0; i < 5; ) {
          var str = res.data.data[k];
          if (str.indexOf("评测") != -1) {
            this.hotVideoTitles[i] = str.slice(
              str.indexOf("title") + 9,
              str.indexOf("badge") - 4
            );
            this.hotVideoUrls[i] = str.slice(
              str.indexOf("short") + 9,
              str.indexOf("bvid") - 4
            );
            i++;
          }
          k++;
          if (k > 99) {
            break;
          }
        }
        this.loadingHotVideo = false;
      });
    },
    openVideo(i) {
      window.open(this.hotVideoUrls[i], "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-panel {
  color: #2c3e50;
  width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -300px;
  margin-top: -100px;
}
.hotvideo {
  text-align: center;
  position: absolute;
  margin-top: 18%;
}
.search-input {
  height: 45px;
  width: 550px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 500px;
  height: 45px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}

input::-ms-clear {
  display: none;
}

.search-reset {
  width: 21px;
  height: 21px;
  position: absolute;
  display: block;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 90px;
  top: 19px;
}
.box-card {
  width: 45%;
  margin: 20px auto;
}
</style>
