<template>
    <div id="reading-report">
        <img :src="images[0]" alt="">
        <img class="touxiang" :src="userImg?userImg:images[1]" alt="">
        <div class="info">
            <img :src="images[2]" alt="">
            <div class="name">{{alias?alias:"麦麦"}}</div>
            <div class="days">
                {{time}} <span>天</span>
            </div>
            <div class="words">
                {{words}} <span>字</span>
            </div>
        </div>
        <div class="medal">
            <div class="des" v-html="medals[medalIndex].content">
            </div>
            <img class="medal-icon" :src="medals[medalIndex].src" alt="">
        </div>
        <div class="detail">
            <div class="title">查看本周阅读详情</div>
            <div class="content">
              <MinutesDetail :data="minutesDetail"></MinutesDetail>
              <DaysDetail :data="daysDetail"></DaysDetail>
              <div>
                <h3>本周最喜欢的故事排名</h3>
                <p>第⼀名 ： {{mostFavourite.name}} {{mostFavourite.store}}分</p>
              </div>
              <HoursDetail :data="hoursDetail"></HoursDetail>
              <div>
                <h3>专家小贴士</h3>
                <p>按等级区分不同的阅读⽤户给予⼀定的⿎励和⽀持
本周总结的成功案例：别⼈对这个阅读有效的部分</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import DaysDetail from '@components/ParentChildReading/DaysDetail';
import HoursDetail from '@components/ParentChildReading/HoursDetail';
import MinutesDetail from '@components/ParentChildReading/MinutesDetail';

import { wxShareOptions } from '@common';
import {
  getShareUserReadInfo,
  minuteDetails,
  daysDetailThisWeek,
  getUserReadHistoryThisWeek,
  getMostFavouriteThisWeek,
  getHoursDetailThisWeek,
} from '@interface';
import { medals } from '@js/reading/index';

import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: {
    DaysDetail,
    HoursDetail,
    MinutesDetail,
  },
  data() {
    return {
      userImg: '',
      alias: '麦麦',
      words: 0,
      time: 0,
      minutesDetail: {
        userMinute: 0,
        percent: 0,
        readlist: [],
      },
      daysDetail: {
        percent: 0,
        lianxu_days: 0,
        group: [],
      },
      mostFavourite: {
        name: '',
        store: 0,
      },
      hoursDetail: {
        percent: 0,
        common: 0,
        group: [],
      },
    };
  },
  computed: {
    ...mapState(['user']),
    images() {
      return [
        require('@image/ParentChildReading/report_title.png'),
        require('@image/shop/touxiang01.png'),
        require('@image/ParentChildReading/frame_read_day.png'),
        require('@image/ParentChildReading/button.png'),
      ];
    },
    medals() {
      return medals;
    },
    medalIndex() {
      return Math.floor(this.time / 5) > 14 ? 14 : Math.floor(this.time / 5);
    },
  },
  methods: {
    ...mapActions(['isLogin']),
    toProbation() {
      this.$router.push({ path: '/reading' });
    },
    getWeek(date) {
      var date2 = new Date(date.getFullYear(), 0, 1); // 本年1月1日
      var day1 = date.getDay(); // 星期
      if (day1 == 0) {
        day1 = 7;
      }
      var day2 = date2.getDay();
      if (day2 == 0) {
        day2 = 7;
      }
      let d = Math.ceil((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
      return Math.ceil(d / 7);
    },
    init() {
      let test_day = new Date();
      const options = {
        // week: `${new Date().getFullYear()}-${this.getWeek(new Date())}`,
        week: `${new Date().getFullYear()}-${this.getWeek(test_day)}`,

        // uid: this.user.uid
        // week: '2018-13',
        uid: 100000025,
      };

      wxShareOptions({
        title: '麦田亲子阅读',
        link:
          'http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-share&uid=' +
          this.user.uid,
        imgUrl: 'http://www.mytian.com.cn/myhtml/readbook/images/logo.png',
        desc: '用心还原孩子的世界',
      });

      getShareUserReadInfo(this.user.uid).then(res => {
        this.userImg = res.info.userImg;
        this.alias = res.info.alias;
        this.words = res.info.words;
        this.time = res.info.time;
      });

      minuteDetails(options).then(res => {
        this.minutesDetail.userMinute = res.userMinute;
        this.minutesDetail.percent = res.percent;
      });

      getUserReadHistoryThisWeek(options).then(res => {
        this.minutesDetail.readlist = res.readlist;
      });

      daysDetailThisWeek(options).then(res => {
        this.daysDetail.percent = res.percent;
        this.daysDetail.lianxu_days = res.lianxu_days;
        this.daysDetail.group = res.group;
      });

      getMostFavouriteThisWeek(options).then(res => {
        this.mostFavourite.name = res.name;
        this.mostFavourite.store = res.store;
      });

      getHoursDetailThisWeek(options).then(res => {
        this.hoursDetail.percent = res.percent;
        this.hoursDetail.common = res.common;
        this.hoursDetail.group = res.group;
      });
    },
  },
  beforeMount() {
    // this.isLogin(true).then(res =>{
    //     this.init()
    // })
    this.init();
  },
  watch: {
    user() {
      if (this.user && this.user.isLogin) {
        this.init();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#reading-report {
  // background-color:#f6f6f6;
  overflow: auto;
  position: relative;
  .touxiang {
    width: 18%;
    margin: 10px auto 0;
    border-radius: 100px;
  }
  .info {
    position: relative;
    color: @darkOrange;
    img {
      width: 95%;
      margin: 0 auto;
    }
    .name {
      position: absolute;
      left: 50%;
      top: 6.5%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      width: 20%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .days {
      white-space: nowrap;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 78%;
      left: 25%;
      font-size: 30px;
      font-weight: bold;
      span {
        font-size: 16px;
      }
    }
    .words {
      white-space: nowrap;
      position: absolute;
      top: 78%;
      left: 75%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      font-weight: bold;
      span {
        font-size: 16px;
      }
    }
  }
  .medal {
    .des {
      text-align: center;
      font-size: 16px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 10px 0 10px;
      color: @darkOrange;
      span {
        text-decoration: underline;
      }
    }
    .medal-icon {
      width: 35%;
      margin: 5px auto 5px;
    }
  }
  .detail {
    .title {
      text-align: center;
      &:after {
        content: '';
        display: block;
        border: 10px solid transparent;
        border-top-color: green;
        width: 0;
        height: 0;
        margin: 10px auto;
      }
    }
  }
}
</style>
