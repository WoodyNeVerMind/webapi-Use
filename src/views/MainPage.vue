<template>
  <el-main>
    <div class="search-input">
      <!-- 搜索框，带搜索建议 -->
      <el-autocomplete
        class="search-input"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder=""
        :trigger-on-focus="true"
        @select="update"
      >
        <el-button
          slot="append"
          class="search-btn"
          icon="el-icon-search"
          @click="update"
        ></el-button>
      </el-autocomplete>
      <span class="search-reset" @click="clearInput()">&times;</span>
    </div>
    <el-divider></el-divider>
    <!-- 模块1------介绍 -->
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card" v-loading="loadingIntro">
          <div>
            <el-descriptions
              title="产品简介-百度"
              direction="vertical"
              :column="1"
              :colon="showColon"
            >
              <el-descriptions-item>
                {{ this.introText }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
        <el-card class="box-card" v-loading="loadingNews">
          <div>
            <el-descriptions
              title="相关资讯-必应"
              direction="vertical"
              :column="1"
              :colon="showColon"
            >
              <el-descriptions-item
                ><el-link @click="openNews(0)" style="margin-left: 10px">{{
                  this.newsName[0]
                }}</el-link>
              </el-descriptions-item>
              <el-descriptions-item
                ><el-link @click="openNews(1)" style="margin-left: 10px">{{
                  this.newsName[1]
                }}</el-link>
              </el-descriptions-item>
              <el-descriptions-item
                ><el-link @click="openNews(2)" style="margin-left: 10px">{{
                  this.newsName[2]
                }}</el-link>
              </el-descriptions-item>
              <el-descriptions-item
                ><el-link @click="openNews(3)" style="margin-left: 10px">{{
                  this.newsName[3]
                }}</el-link>
              </el-descriptions-item>
              <el-descriptions-item
                ><el-link @click="openNews(4)" style="margin-left: 10px">{{
                  this.newsName[4]
                }}</el-link>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
        <el-card class="box-card" v-loading="loadingBingImages">
          <div>
            <el-descriptions
              title="参考图片-必应"
              direction="vertical"
              :column="1"
              :colon="showColon"
            >
            </el-descriptions>
            <el-col :span="12">
              <img
                :src="bingImageUrls[0]"
                @click="openBingImages(0)"
                class="bing-image"
              />
            </el-col>
            <el-col :span="12">
              <img
                :src="bingImageUrls[1]"
                @click="openBingImages(1)"
                class="bing-image"
              />
            </el-col>
          </div>
        </el-card>
      </el-col>
      <!-- 模块2------购买参考 -->
      <el-col :span="12">
        <el-card v-loading="loadingBuyInfo" class="box-card">
          <el-descriptions
            title="购买参考-唯品会"
            direction="vertical"
            :column="1"
            :colon="showColon"
          >
          </el-descriptions>
          <!-- 前两个商品 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <img
                :src="goodsMainPicture[0]"
                @click="openSale(0)"
                class="imageVideo"
              />
            </el-col>
            <el-col :span="12">
              <img
                :src="goodsMainPicture[1]"
                @click="openSale(1)"
                class="imageVideo"
              />
            </el-col>
          </el-row>
          <!-- 前两个商品介绍 -->
          <el-col :span="12" style="margin-top:5px"
            >{{ price[0] + "￥" }}
          </el-col>
          <el-col :span="12" style="margin-top:5px"
            >{{ price[1] + "￥" }}
          </el-col>
          <el-row :gutter="24">
            <el-col :span="12" style="margin-top:5px"
              >{{ goodsName[0] }}
            </el-col>
            <el-col :span="12" style="margin-top:5px"
              >{{ goodsName[1] }}
            </el-col>
          </el-row>
          <!-- 分割线 -->
          <el-divider></el-divider>

          <!-- 后两个商品 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <img
                :src="goodsMainPicture[2]"
                @click="openSale(2)"
                class="imageVideo"
              />
            </el-col>
            <el-col :span="12">
              <img
                :src="goodsMainPicture[3]"
                @click="openSale(3)"
                class="imageVideo"
              />
            </el-col>
          </el-row>
          <!-- 后两个商品介绍 -->
          <el-row :gutter="24">
            <el-col :span="12" style="margin-top:5px"
              >{{ price[2] + "￥" }}
            </el-col>
            <el-col :span="12" style="margin-top:5px"
              >{{ price[3] + "￥" }}
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="margin-top:5px"
              >{{ goodsName[2] }}
            </el-col>
            <el-col :span="12" style="margin-top:5px"
              >{{ goodsName[3] }}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <!-- 模块3------视频推荐 -->
      <el-col :span="12">
        <el-card v-loading="loadingVideo" class="box-card">
          <el-descriptions
            title="相关视频-bilibili"
            direction="vertical"
            :column="1"
            :colon="showColon"
          >
          </el-descriptions>
          <!-- 前两个视频 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <img
                :src="videoCoverUrls[0]"
                @click="openVideo(0)"
                class="imageVideo"
              />
            </el-col>
            <el-col :span="12">
              <img
                :src="videoCoverUrls[1]"
                @click="openVideo(1)"
                class="imageVideo"
              />
            </el-col>
          </el-row>
          <!-- 前两个视频介绍 -->
          <el-row :gutter="24">
            <el-col :span="12" style="margin-top:10px"
              >{{ videoTitles[0] | filter }}
            </el-col>
            <el-col :span="12" style="margin-top:10px"
              >{{ videoTitles[1] | filter }}
            </el-col>
          </el-row>
          <!-- 分割线 -->
          <el-divider></el-divider>

          <!-- 后两个视频 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <img
                :src="videoCoverUrls[2]"
                @click="openVideo(2)"
                class="imageVideo"
              />
            </el-col>
            <el-col :span="12">
              <img
                :src="videoCoverUrls[3]"
                @click="openVideo(3)"
                class="imageVideo"
              />
            </el-col>
          </el-row>
          <!-- 后两个视频介绍 -->
          <el-row :gutter="24">
            <el-col :span="12" style="margin-top:10px"
              >{{ videoTitles[2] | filter }}
            </el-col>
            <el-col :span="12" style="margin-top:10px"
              >{{ videoTitles[3] | filter }}
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 模块4------品牌信息 -->
      <el-col :span="12">
        <el-card class="box-card" v-loading="loadingBrandInfo">
          <el-descriptions
            title="品牌信息-维基百科"
            direction="vertical"
            :column="1"
            :colon="showColon"
          >
          </el-descriptions>
          <div class="text item">
            {{ (brandInfoTitle[0] + "：" + brandInfoText[0]) | filter }}
          </div>
          <div v-for="o in 7" :key="o" class="text item">
            {{ (brandInfoTitle[o] + "：" + brandInfoText[o]) | filter }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script type="text/javascript">
import { getSuggest, getResultList } from "../api/bilibili.js";
import { getBaidu } from "../api/baidu.js";
import { getImages, getNews } from "../api/bing.js";
import { getQuery } from "../api/wiki.js";
import { getVipInfo } from "../api/vip.js";
export default {
  name: "MainPage",
  filters: {
    filter: function(value) {
      value = value
        .replace(/class/g, "")
        .replace(/em/g, "")
        .replace(/keyword/g, "")
        .replace(/span/g, "")
        .replace(/search/g, "")
        .replace(/match/g, "")
        .replace(/[`*\-+=<>?:"{}|/;'\\[\]*——\-+=]/g, "")
        .replace(/\s/g, "");
      return value;
    }
  },
  data() {
    return {
      preKeyword: "", //v-model绑定
      keyword: "", //v-model绑定
      searchIndex: 0,
      introText: "",
      videoUrls: [],
      videoCoverUrls: [],
      videoTitles: [],
      showColon: false,
      bingImageUrls: [],

      //卡片显示标识
      loadingVideo: true,
      loadingIntro: true,
      loadingBingImages: true,
      loadingBuyInfo: true,
      loadingNews: true,
      loadingBrandInfo: true,

      //商品信息
      brandName: [],
      destUrl: [],
      goodsName: [],
      goodsMainPicture: [],
      price: [],

      //新闻信息
      newsName: [],
      newsUrl: [],

      //品牌信息
      brandInfoTitle: [],
      brandInfoText: []
    };
  },
  created() {
    //获取来自上个页面的keyword
    this.keyword = this.$route.query.keyword;
    //调用外部API，获取数据
    this.initVideo(this.keyword);
    this.initBaidu(this.keyword);
    this.initBuyInfo(this.keyword);
    this.initImages(this.keyword);
    this.initNews(this.keyword);
  },
  methods: {
    update() {
      //this.initPicture(this.keyword);
      console.log(this.keyword);
      this.loadingVideo = true;
      this.loadingIntro = true;
      this.loadingBingImages = true;
      this.loadingBuyInfo = true;
      this.loadingNews = true;
      this.loadingBrandInfo = true;

      this.initBaidu(this.keyword);
      this.initVideo(this.keyword);
      this.initBuyInfo(this.keyword);
      this.initImages(this.keyword);
      this.initNews(this.keyword);
    },
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
    initBaidu(keyword) {
      getBaidu(keyword).then(res => {
        this.introText = res.data.data.text;
        this.loadingIntro = false;
      });
    },
    initVideo(keyword) {
      getResultList(keyword, 1, 4).then(res => {
        for (var i = 0; i < 10; i++) {
          this.videoUrls[i] = res.data.data.result[10].data[i].arcurl; //视频url
          this.videoCoverUrls[i] =
            "https:" + res.data.data.result[10].data[i].pic; //视频封面url
          this.videoTitles[i] = res.data.data.result[10].data[i].title; //视频名
        }
        this.loadingVideo = false;
      });
    },
    openVideo(i) {
      window.open(this.videoUrls[i], "_blank");
    },
    openSale(i) {
      window.open(this.destUrl[i], "_blank");
    },
    openBingImages(i) {
      window.open(this.bingImageUrls[i], "_blank");
    },
    openNews(i) {
      window.open(this.newsUrl[i], "_blank");
    },
    initImages(keyword) {
      getImages(keyword).then(res => {
        var bingImagesData = [];
        bingImagesData = res.data.value;
        for (var i = 0; i < bingImagesData.length; i++) {
          this.bingImageUrls[i] = bingImagesData[i].contentUrl;
        }
        this.loadingBingImages = false;
      });
    },
    initQuery(keyword) {
      getQuery(keyword).then(res => {
        console.log(res);
        for (var i = 0; i < 8; i++) {
          this.brandInfoTitle[i] = res.data.query.search[i].title;
          this.brandInfoText[i] = res.data.query.search[i].snippet;
          if (this.brandInfoText[i].substr(-1) != "。") {
            this.brandInfoText[i] += "......";
          }
        }
        this.loadingBrandInfo = false;
      });
    },
    initBuyInfo(keyword) {
      getVipInfo(keyword).then(res => {
        //console.log(res);
        for (var i = 0; i < 4; i++) {
          this.brandName[i] = res.data.data[i].brandName; //商品品牌
          this.destUrl[i] = res.data.data[i].destUrl; //购买链接url
          this.goodsMainPicture[i] = res.data.data[i].goodsMainPicture; //商品图
          this.goodsName[i] = res.data.data[i].goodsName; //商品名
          this.price[i] = res.data.data[i].vipPrice; //商品价格
        }
        this.loadingBuyInfo = false;
        this.initQuery(this.brandName[0] + "公司");
      });
    },
    initNews(keyword) {
      getNews(keyword).then(res => {
        for (var i = 0; i < 5; i++) {
          this.newsName[i] = res.data.value[i].name; //新闻名称
          this.newsUrl[i] = res.data.value[i].url; //新闻链接
        }
        this.loadingNews = false;
      });
    }
  }
};
</script>
<style scoped>
.search-input {
  height: 45px;
  width: 550px;
  margin: 0 auto;
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
  right: 75px;
  top: 9px;
}
.imageVideo {
  width: 97%;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 94%;
  margin: 20px auto;
}
.bing-image {
  width: 100%;
  margin-bottom: 10px;
}
</style>
