<template>
  <div class="wrapper">
    <textarea 
    v-model="showContext"
    @input="inputHandle"></textarea>
  </div>
</template>

<script>
import FileUtil from "@/utils/files.js";

export default {
  name: "host-context",
  components: {},
  props: {
    filelist: {
      type: Array,
      default: null
    },
    showHostIndex: {
      type: Number,
      default: null
    },
    showContext: {
      type: String,
      default: null
    }
  },
  methods: {
    inputHandle(e) {
      let value = e.target.value;
      FileUtil.writeFile(this.filelist[this.showHostIndex].name,value);
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 20px;
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
}
.wrapper textarea {
  width: 100%;
  height: 100%;
  outline: none;
  background: none;
  color: #fff;
  font-size: 16px;
  border: none;
  line-height: 2;
}
</style>>
 
