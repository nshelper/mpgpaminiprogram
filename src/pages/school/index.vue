<template>
  <div class="school-container">
    <div class="top-menu">
      <div class="input">
        <input type="text" placeholder="查找你的学校" name="">  
      </div>    
    </div>
    <div class="detail">
      <div @tap="selectSchool" :data-info="index" v-for="for (item,index) in schools" :key="index" :class="{ item_focus: item.status }" class="item">{{item.name}}</div>
    </div>
    
  </div>
</template>

<script>

import card from '@/components/card'

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
    }
  },
  data () {
    return {
      schools: []
    }
  },
  created () {

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
.top-menu{
  position: fixed;
  top:0rpx;
  height: 70rpx;
  width: 100%;
  background-image: linear-gradient(#0f8a46,#15ae59);
  display: block;
  z-index: 9;
  overflow: hidden;
}
.top-menu .input{
  display: block;
  width:80%;
  background-color: #fff;
  border-radius: 20rpx;
  line-height: 70rpx;
  height: 50rpx;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  padding: 0 20rpx;
}
.top-menu .input input{
  font-size: 30rpx;
}
.top-menu .input input:hover{
  text-align: left;
}
.school-container{
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
  margin: 10rpx 15rpx;
  height: 50rpx;
  border-radius: 20rpx;
  border: 1px solid #f7f7f7;
  transition: .8s;
  animation: itemIn 1.6s ease-in 1;
}
.item:hover{
  transform: translateY(-5rpx);
}
.item_focus{
  border: 1px solid red;
}
</style>
