<template>
  <div id="app">
    <div class="host-header">
      <tool-bar
        :add="addFileHandler"
        :delete="deleteFileHandler"
        :select="selectFileHandler"
      ></tool-bar>
    </div>
    <div class="host-context">
      <div class="host-context-left">
        <host-list
          :filelist="filelist"
          :showHostIndex="showHostIndex"
          @toggleShowIndex="toggleShowIndex"
          @editHostName="editHostName"
          @editHostNameHandle="editHostNameHandle"
          @esc="escEditHostName"
        ></host-list>
      </div>
      <div class="host-context-right">
        <host-context></host-context>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import HostList from "@/components/HostList";
import HostContext from "@/components/HostContext";
import { app, remote } from "electron";

export default {
  name: "host",
  components: {
    ToolBar,
    HostList,
    HostContext
  },
  data() {
    return {
      showHostIndex: 0,
      filelist: [
        {
          name: "local",
          isEdit: false,
          isUse: false
        }
      ]
    };
  },
  methods: {
    addFileHandler() {
      console.log("addFileHandler", app);
      this.filelist.unshift({
        name: "",
        isEdit: true,
        isUse: false
      });
    },
    editHostNameHandle(index) {
      this.filelist[index].isEdit = true;
      this.showHostIndex = index;
    },
    editHostName(index, value) {
      this.filelist[index].isEdit = false;
      this.filelist[index].name = value;
    },
    toggleShowIndex(index) {
      this.showHostIndex = index;
    },
    escEditHostName(item, index) {
      if (item.name === "") {
        this.filelist.shift();
      } else {
        this.filelist[index].isEdit = false;
      }
    },
    deleteFileHandler() {
      this.filelist.splice(this.showHostIndex, 1);
      this.showHostIndex = 0;
    },
    selectFileHandler(state) {
      this.filelist[this.showHostIndex].isUse = state;
    }
  }
};
</script>

<style>
/* CSS */
body {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
.host-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #191a30;
  color: #fff;
  padding: 0 40px;
}
.host-context {
  display: flex;
  height: 100%;
  color: #fff;
}
.host-context-left {
  flex-grow: 0;
  width: 200px;
  background: #373960;
  height: 100%;
  padding: 20px;
}
.host-context-right {
  background: #2a2c35;
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  padding: 0 20px;
}
</style>
