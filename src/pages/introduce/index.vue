<template>
  <div class="introduce-container">
    <div class="top-display">
      <p>GPA=∑(单科绩点×学分)÷∑学分</p>
      <p>请根据具体情况选择算法</p>
      
    </div>
    <div class="detail">
      <div @tap="selectSchool" :data-info="index" v-for="for (item,index) in schools" :key="index" class="item" :class="{ item_focus: item.status }">
        <p class="title">{{item.name}}</p>
        <p class="content">{{item.content}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>

import card from '@/components/card'
import { rule } from '@/utils/gpaRule'

export default {
  components: {
    card
  },
  methods: {
    selectSchool (e) {
      let selectIndex = e.currentTarget.dataset.info
      let list = this.schools
      list.forEach((item, index) => {
        selectIndex === index ? item.status = true : item.status = false
      })
      this.schools = list
      wx.setStorageSync('schoolList', list)
      setTimeout(() => {
        wx.navigateBack({delta: 1})
      }, 700)
    }
  },
  data () {
    return {
      schools: []
    }
  },
  onLoad () {
    // console.log(rule)
    this.schools = rule.school
  },
  onShow () {
    let schoolList = wx.getStorageSync('schoolList')
    if (schoolList.length > 1) {
      this.schools = schoolList
    }
  }
}
</script>

<style>
.top-display{
  position: fixed;
  top:0rpx;
  height: 100rpx;
  width: 100%;
  background-image: linear-gradient(#0f8a46,#15ae59);
  display: block;
  z-index: 9;
  overflow: hidden;
  text-align: center;
}
.top-display p{
  font-size: 30rpx;
  color: #fff;
  margin:5rpx 0;
}
.introduce-container{
  display: block;
  width:100%;
  overflow: hidden;
}
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.detail{
  padding: 30rpx;
  display: flex;
  flex-flow: row wrap;
  margin-top:70rpx;
  overflow: hidden;
}
@keyframes itemIn {
  from{ opacity: 0; }
  to{  opacity: 1;}

}
.item{
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  min-height: 100rpx;
}
.item .title{
  margin-top: 30rpx;
  margin-left: 10rpx;
  font-size: 35rpx;
  font-weight: bold;
  color: #555555;
}
.item .content{
  margin: 20rpx 10rpx;
  display: flex;
  flex-flow: column wrap;
  font-size: 30rpx;
  color: #555555;
}
.item:hover{
  border-bottom: 1px solid #0f8a46;
}
.item_focus{
  border-bottom: 1px solid #0f8a46;
}
</style>
