<template>
  <div class="container" >
   <!--  选中效果 -->
  <div class="select-bg" v-if="selectStatus" @tap="selectMenu">
    <div class="select-menu">
      <a v-for="(item,index) in menus" :key="index" @click.stop="choose" :data-menu="item.menu">{{item.name}}</a>
    </div> 
  </div>
  <div class="top-menu">
    <div class="top-title">{{selectSchool}}</div>
    <img class="top-img" @tap="selectMenu" src="/src/image/menu.png">
   </div>
    <form class="form-container" @submit="bindsubmit">
      <div class="form-box">
        <div class="form-left">
           <input name="name" type="text" class="form-control" v-model="motto" placeholder="课程名字可填可不填" />
           <div class="form-left-line">
             <input name="score" type="text" v-model.lazy="score" placeholder="请输入成绩" maxlength="6" />
             <input name="credit" type="text"  placeholder="请输入学分" maxlength="3" />     
           </div> 
            <button hover-class="button-focus" type="primary" formType="submit" :loading="buttonLoading">点击连续计算
          </button>
          <div v-if="result" class="show-results">你的gpa:{{result.gpa?result.gpa:"0.00"}} 平均分:{{result.average?result.average:"0.00"}}</div>   
        </div>
      <!--   <div  class="form-right">    </div> -->
      </div>
    </form>
    <div class="results">
      <div v-for="(item,index) in results" :key="index" class="cells" hover-class="cells-focus">
        <div class="cell">{{item.name}}</div>
        <div class="cell">{{item.score}}</div>
        <div class="cell">{{item.credit}}</div>
        <div class="cell-delete" :data-index="index" @tap="deleteItem"><img class="delete-item"  src="/src/image/delete.png"></div>
      </div>   
    </div>
    <div class="footer-ad">
      <div class="ad"> <ad unit-id="adunit-87d793c5afc5a2e2"></ad></div>  
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { imnuGpa } from '@/utils/gpa'
import { rule } from '@/utils/gpaRule'

export default {
  data () {
    return {
      gpaRuleIndex: 0,
      selectSchool: '尚未选择学校',
      userInfo: {},
      nickName: 'xxoo',
      score: '',
      result: null,
      results: [],
      buttonLoading: false,
      selectStatus: false,
      menus: [{name: '选择学校', menu: 'school'}, {name: '绩点介绍', menu: 'introduce'}, {name: '关于程序', menu: 'about'}]
    }
  },

  components: {
    card
  },

  methods: {
    choose (e) {
      let menu = e.currentTarget.dataset.menu
      switch (menu) {
        case ('school') :
          var url = '/pages/' + menu + '/main'
          wx.navigateTo({url})
          this.selectMenu()
          break
        case ('introduce') :
          url = '/pages/' + menu + '/main'
          wx.navigateTo({url})
          this.selectMenu()
          break
        case ('about') :
          url = '/pages/' + menu + '/main'
          wx.navigateTo({url})
          this.selectMenu()
          break
        default:
          console.log('gg')
      }
    },
    selectMenu () {
      let selectStatus = this.selectStatus
      this.selectStatus = !selectStatus
    },
    bindViewTap () {
      console.info('dad')
    },
    deleteItem (e) {
      var index = e.currentTarget.dataset.index
      let temp = this.results
      temp.splice(index, 1)
      if (temp.length) {
        wx.setStorageSync('syncData', temp)
        let gpaRuleIndex = this.gpaRuleIndex
        let result = imnuGpa(temp, rule.gpaRule[gpaRuleIndex])
        this.result = result
      } else {
        this.result = null
        wx.removeStorageSync('syncData')
      }
    },
    bindsubmit (e) {
      // console.log(e.mp.detail.value)
      let values = e.mp.detail.value
      let that = this
      if (values.score && values.credit) {
        this.buttonLoading = true
        setTimeout(() => {
          let temp = that.results
          temp.unshift(values)
          that.results = temp
          wx.setStorageSync('syncData', temp)
          let gpaRuleIndex = that.gpaRuleIndex
          let result = imnuGpa(temp, rule.gpaRule[gpaRuleIndex])
          that.result = result
          that.buttonLoading = false
        }, 500)
      } else {
        wx.showToast({
          title: '不能为空!',
          icon: 'none',
          duration: 2000
        })
      }
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    // @click="clickHandle('test click', $event)"
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  created () {
    let syncData = wx.getStorageSync('syncData')
    let gpaRuleIndex = wx.getStorageSync('gpaRuleIndex')
    if (syncData && gpaRuleIndex) {
      this.result = imnuGpa(syncData, rule.gpaRule[gpaRuleIndex])
      this.results = syncData
    } else if (syncData) {
      this.result = imnuGpa(syncData, rule.gpaRule[0])
      this.results = syncData
    }
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onShow () {
    let schoolList = wx.getStorageSync('schoolList')
    let that = this
    if (schoolList) {
      schoolList.forEach((item, index) => {
        if (item.status) {
          that.gpaRuleIndex = index
          wx.setStorageSync('gpaRuleIndex', index)
          if (that.results.length >= 1) {
            this.result = imnuGpa(that.results, rule.gpaRule[index])
          }
          that.selectSchool = item.name
        }
      })
      // console.log(schoolList)
    }
  },
  onShareAppMessage () {
    return {
      title: '绩点计算',
      path: '/pages/index/main',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
}
</script>

<style scoped>
.top-menu{
  position: fixed;
  top:0rpx;
  height: 70rpx;
  width: 100%;
  background-color: #0f8a46;
  display: flex;
  text-align: center;
  z-index: 9;
}

.top-title{
  margin: 0 auto;
  font-weight: bold;
  font-size: 38rpx;
  color:#fff;
}

.top-img{
  position: absolute;
  right:30rpx;
  line-height: 70rpx;
  width: 50rpx;
  height: 50rpx;
}

.select-bg{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom:0;
  z-index: 2;
  background-color: rgba(0,0,0,.3);
}
.select-menu{
  width: 170rpx;
  position: absolute;
  right:18rpx;
  top:70rpx;
  background-color: #fff;
  z-index: 11;
  animation: menu 0.1s ease-in 1;
  overflow: hidden;
  border-radius: 10rpx;
}

@keyframes menu{
  from{height: 0rpx}
  to{height: 100rpx}
} 
.select-menu a{
  height: 40rpx;
  text-align: center;
  font-size: 35rpx;
  margin:15rpx auto;
  border-bottom: 1px solid #f7f7f7;
}

.top-img:hover{
  background-color: rgba(0,0,0,.1);
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  display: block;
  overflow: hidden;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 80rpx;
}
.form-container{
  position: fixed;
  top:5rpx;
  box-shadow: 0 0 6rpx 6rpx #ccc;
  margin-top: 50rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 20rpx;
  z-index:1;
}
.form-box{
  padding: 66rpx;
  display: flex;
  overflow: hidden;
  flex-flow:row nowrap;
}
.form-right{
  flex:1;
}
.form-left{
  flex:3;
}
.form-left button{
  /*background-color: #0f8a46;*/
  background-image: linear-gradient(45deg,#0f8a46,#15ae59);
}
.form-left .button-focus{
  opacity: 0.8;
}
.form-left-line{
  display: flex;
  flex-flow: row nowrap;
}
.form-left-line input{
  border: 1px solid #ccc;
  padding: 10rpx;
  margin: 5rpx 10rpx;
  border-radius: 30rpx;
  font-size:30rpx;
  color:#000;
  text-align: center;
  transition: 1s;
}
.form-left-line input:hover{
  border: 1px solid blue;
  text-align: left;
  transition: 1s;
}
.form-left button{
  margin-top: 10rpx;
  font-weight: bold;
  font-size: 35rpx;
  border-radius: 30rpx;
}
.form-control {
  padding: 10rpx 10rpx;
  margin: 5rpx 10rpx;
  border: 1px solid #ccc;
  border-radius: 30rpx;
  font-size:30rpx;
  color:#000;
  text-align: center;
  transition: 1s;
}
@keyframes result{
  from{height: 0;}
  to{height: 60rpx;}
}
.show-results{
  padding: 10rpx 10rpx;
  margin-top: 20rpx;
  border: 1px solid #ccc;
  border-radius: 30rpx;
  font-size:35rpx;
  font-weight: bold;
  color:#000;
  text-align: center;
  animation: result 0.1s ease-in 1;
}
.form-control:hover {
  border: 1px solid blue;
  text-align: left;
  transition: 1s;
}
.counter{
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.results{
  position: absolute;
  top:520rpx;
  overflow: hidden;
  width: 100%;
  height: 680rpx; 
  overflow:auto; 
}
.cells{
  width: 90%;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  border-bottom: 2prx solid #f7f7f7;
  background-color: #fff;
  border-radius: 30rpx;
  margin: 10rpx auto;
  border-bottom: 1px solid #f7f7f7;
  text-align: center;
}
.cells-focus{
  background-color: rgba(0,0,0,.2);
}
.cell{
  margin: 10rpx 15rpx;
  flex:2;
  overflow: hidden;
}
.cell-delete{
  margin: 10rpx 15rpx;
  flex:1;
}
.delete-item{
  width: 50rpx;
  height: 50rpx;
  transition: 0.5s;
}
.footer-ad{
  width: 100%;
  position: fixed;
  bottom:0;
  display: block;
}
.footer-ad .ad{
  display: block;
  width:650rpx;
  margin:0 auto;
}
</style>
