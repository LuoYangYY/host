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
        <textarea v-model="showContext" @input="textareaHandle"></textarea>
        <!-- <host-context
            :filelist="filelist"
          :showHostIndex="showHostIndex"
          :showContext="showContext"
          ></host-context> -->
      </div>
    </div>
    <div class="host-footer">
      <div class="left">&copy; copyright 2020, power by LY</div>
      <div class="iconfont icon-shezhi" @click="showPwdDialogEvent(true)"></div>
    </div>
    <password :showPwdDialog="showPwdDialog" @showPwdDialogEvent="showPwdDialogEvent"></password>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import HostList from "@/components/HostList";
import Password from "@/components/Password";
import FileUtil from "@/utils/files.js";

FileUtil.initFile();

export default {
  name: "host",
  components: {
    ToolBar,
    HostList,
    Password
  },
  data() {
    let localFiles = FileUtil.localFiles;
    let useHostFiles = FileUtil.readConfigFile("use") || [];
    useHostFiles.forEach((file, index) => {
      localFiles.forEach(item => {
        if (file.name === item.name) {
          localFiles[index].isUse = true;
        }
      });
    });
    return {
      showHostIndex: 0,
      filelist: localFiles,
      showContext: "",
      showPwdDialog: false
    };
  },
  mounted() {
    this.readHostFile();
  },
  methods: {
    addFileHandler() {
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
    editHostName(item, index, value) {
      let name = this.filelist[index].name;
      if (!name) {
        FileUtil.newFile(value);
        this.readHostFile(value);
      } else {
        FileUtil.renameFile(name, value);
      }
      this.filelist[index].isEdit = false;
      this.filelist[index].name = value;
    },
    toggleShowIndex(index) {
      this.showHostIndex = index;
      this.readHostFile();
    },
    escEditHostName(item, index) {
      if (item.name === "") {
        this.filelist.shift();
      } else {
        this.filelist[index].isEdit = false;
      }
    },
    deleteFileHandler() {
      FileUtil.removeFile(this.filelist[this.showHostIndex].name);
      this.filelist.splice(this.showHostIndex, 1);
      this.showHostIndex = 0;
    },
    selectFileHandler(state) {
      this.filelist[this.showHostIndex].isUse = state;
      let name = this.filelist[this.showHostIndex].name;
      let useFiles = FileUtil.readConfigFile("use") || [];
      let tempArr = JSON.parse(JSON.stringify(useFiles));

      let isTrue = tempArr.some(item => item.name === name);
      if (isTrue) {
        useFiles.forEach((file, index) => {
          if (file.name === name && !state) {
            tempArr.splice(index, 1);
          }
        });
      } else {
        tempArr.push({ name: name });
      }
      FileUtil.writeConfigFile("use", tempArr);
      FileUtil.writeHost();
    },
    readHostFile(name) {
      if (name || this.filelist[this.showHostIndex]) {
        this.showContext =
          FileUtil.readFile(name || this.filelist[this.showHostIndex].name) ||
          "";
      }
    },
    textareaHandle(e) {
      let value = e.target.value;
      FileUtil.writeFile(this.filelist[this.showHostIndex].name, value);
    },
    showPwdDialogEvent(state){
        this.showPwdDialog = state;
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
  position: relative;
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
  overflow: auto;
}
.host-context-right {
  background: #2a2c35;
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  padding: 0 20px;
}
/* .wrapper {
  padding-top: 20px;
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
} */
.host-context-right textarea {
  width: 100%;
  height: 100%;
  outline: none;
  background: none;
  color: #fff;
  font-size: 16px;
  border: none;
  line-height: 2;
  letter-spacing: 1px;
  padding-bottom: 80px;
}
.host-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  background: #191a30;
  color: #fff;
  padding: 0 20px;
}
.host-footer .left {
  float: left;
}
.host-footer .iconfont {
  float: right;
}
</style>
