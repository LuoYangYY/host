<template>
  <div class="wrapper">
    <div class="wrapper-tool" @click="newfile">
      <span class="iconfont icon-xinjian"></span>
      <div class="tip">新建host文件</div>
    </div>
    <div class="wrapper-tool" @click="deletefile">
      <span class="iconfont icon-shanchu"></span>
      <div class="tip">删除host文件</div>
    </div>
    <div class="wrapper-tool" @click="selectFile(false)">
      <span class="iconfont icon-jianshao"></span>
      <div class="tip">取消选中</div>
    </div>
    <div class="wrapper-tool" @click="selectFile(true)">
      <span class="iconfont icon-zengjia"></span>
      <div class="tip">选中</div>
    </div>
    <div class="wrapper-tool" @click="flushChromeDNS">
      <span class="iconfont icon-repeat"></span>
      <div class="tip">清除chrome缓存</div>
    </div>
  </div>
</template>

<script>
import FileUtil from "@/utils/files.js";

export default {
  name: "tool-bar",
  components: {},
  props: {
    add: {
      type: Function,
      default: null
    },
    delete: {
      type: Function,
      default: null
    },
    select: {
      type: Function,
      default: null
    }
  },
  methods: {
    newfile() {
        this.add();
    },
    deletefile() {
      this.delete();
    },
    selectFile(state) {
      this.select(state)
    },
    flushChromeDNS() {
        FileUtil.flushChromeDNS();
      console.log("flushChromeDNS");
    }
  }
};
</script>

<style scoped>
.wrapper-tool {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 100%;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  margin-right: 20px;
}
.tip {
  display: none;
  position: absolute;
  bottom: -35px;
  height: 30px;
  background: #999;
  color: #fff;
  width: max-content;
  font-size: 15px;
  padding: 0 10px;
  left: 0;
  border-radius: 6px;
}
.wrapper-tool:hover {
  background: blueviolet;
}
.wrapper-tool:hover .tip {
  display: block;
}
</style>
