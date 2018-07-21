<template>
  <div class="about_container">
    <div class="header">
      <img src="/src/image/logo.png">
      <div class="info">
        <p>绩点计算v1.00</p>
        <p></p>
      </div>
    </div>
    <div class="introduce">
      <div class="content_title">介绍:</div>
      <p class="content">　　绩点,大学里的一个神秘名词,它只出现在新生手册的某几页中,等着学生们自己去挖掘它的算法,可是事与愿违,学霸对绩点公式倒背如流,而学渣却更本不知道有绩点这个东西。</p>
      <p class="content">　　该小程序就是为了解决这个容易被人忽视的问题,使用它可以将你的成绩保存在手机缓存中,每次打开它,你的成绩会原封不动的浮现在你的眼前,随时修改,随时确定自己要不要刷刷绩点,离毕业还差多少...</p>
      <p class="content">　　小程序使用mpvue开发,且已开源,如果列表里没有你学校的绩点算法,你大可以进行二次开发,请遵循MIT协议,如果觉得不错请记个给个Star哦!</p>

    </div>
    <div class="footer">
      <div>GitHub:https://github.com/strugglerx</div>
      <div>MIT Copyright (c) 2018 STRUGGLER</div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: []
    }
  },
  created () {
  }
}
</script>

<style>
.about_container{
  width: 100%;
}
.header{
  width:100%;
  min-height: 400rpx;
  background-image: linear-gradient(#0f8a46,#15ae59);
  position: relative;
  text-align: center;
}
.header img{
  width:188rpx;
  height: 188rpx;
  margin-top: 80rpx;
}
.header .info{
  font-size: 33rpx;
  font-weight: bold;
  text-align: center;
  margin-top: 20rpx;
}
.introduce{
  padding:60rpx;
}
.content_title{
  width: 100rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 38rpx;
  text-align: center;
  font-weight: bold;
  background-color: #ccc;
  color:#fff;
  border-left: 10rpx solid #15ae59;
  border-radius: 10%;
}
.content{
  margin-top: 15rpx;
  font-size: 28rpx;
  color: rgba(0,0,0,.7);
}
.footer{
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 100rpx;
  font-size: 25rpx;
  text-align: center;
  font-weight: bold;
  color:#8c8c8c;
}
</style>
