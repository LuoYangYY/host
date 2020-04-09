<template>
  <div class="wrapper">
    <div
      class="wrapper-item"
      v-for="(item, index) in filelist"
      v-bind:key="index"
      :class="showHostIndex === index && 'wrapper-item-show'"
      @click="toggleShowIndex(index)"
    >
      <span class="iconfont icon-wenjian"></span>
      <span
        v-if="!item.isEdit"
        class="name"
        @dblclick="editHostNameHandle(index)"
      >
        {{ item.name }}
        <span v-if="item.isUse" class="checked iconfont icon-duihao"></span>
      </span>
      <input
        v-if="item.isEdit"
        :value="item.name"
        placeholder="input hostname"
        @keyup.enter="hanldeBlur($event, item.name, index)"
        @blur="hanldeBlur($event, item, index)"
        v-focus
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "host-list",
  components: {},
  props: {
    filelist: {
      type: Array,
      default: null
    },
    showHostIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    hanldeBlur(e, item, index) {
      let value = e.target.value;
      if (value !== "") {
        let isTrue = this.filelist.some(item => item.name === value);
        if (!isTrue) {
          this.$emit("editHostName", index, value);
        } else {
          this.$emit("esc", item, index);
        }
      } else {
        this.$emit("esc", item, index);
      }
    },
    // 双击名字可编辑
    editHostNameHandle(index) {
      this.$emit("editHostNameHandle", index);
    },
    // 切换展示host
    toggleShowIndex(index) {
      this.$emit("toggleShowIndex", index);
    }
  }
};
</script>

<style scope>
.wrapper {
}
.wrapper-item {
  height: 40px;
  line-height: 40px;
  width: 180px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
}
.wrapper-item-show {
  background: cadetblue;
}
.wrapper-item .name {
  margin-left: 5px;
}
.wrapper-item .checked {
  float: right;
}
</style>
