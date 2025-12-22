<template>
  <div>
    <el-col :span="24">
      <el-card class="note" style="width: 100%;text-align: center" shadow="never" v-model="note">
        <div slot="header" class="clearfix">
          <span>{{ note.name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-more" @click="read(note.id)"></i></el-button>
        </div>
        <MdEditor
          v-model="note.contentMd"
          :on-save="saveNote"
          :on-upload-img="onUploadImg"
          class="bauhaus-editor"
        />
      </el-card>
    </el-col>

    <el-dialog
      :visible.sync="dialogFormVisible"
      width="40%"
      center
      :title="'设置笔记链接'">
      <el-row>
        <el-form>
          <el-form-item v-model="noteLink" >
            <el-select v-model="noteLink.noteIndex" placeholder="请选择链接笔记" @change="getTitleList" style="width: 100%">
              <el-option v-for="(item,i) in noteList" :label="item.name" :value="i" :key="item.id" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="noteLink.titleID" placeholder="请选择链接标题" @change="generateLink" style="width: 100%">
              <el-option v-for="item in titleList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-input style="width: 65%" v-model="noteLink.link" id="notelink"></el-input>
          <el-button
            data-clipboard-target="#notelink"
            data-clipboard-action="copy"
            type="primary"
            icon="el-icon-document-copy"
            style="font-size: 13px;margin-left: 0px;width: 30%;float: right"
            class="copy-btn"
            @click="copyLink">
            复制
          </el-button>


      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import { MdEditor } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'
  import MarkdownIt from 'markdown-it'
    export default {
      name: "NoteEdit",
      components: { MdEditor },
      data() {
        return {
          noteLink: {
            noteIndex:'',
            titleID:'',
            link:''
          },
          dialogFormVisible:false,
          noteList:[],
          titleList:[],
          note:{
            contentMd:''
          },
          mdParser: new MarkdownIt()
        }
      },
      mounted() {
        if(this.$route.query.noteId){
          this.loadNote(this.$route.query.noteId)
        }
      },
      methods: {
        loadNote(id){
          var _this = this
          this.axios.get('note/'+id.toString())
          .then(function (response) {
            if(response.data.status === 200){
              _this.note = response.data.object
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        },
        saveNote(value){
          var _this = this
          var url = '/update/content/note/'+this.note.id
          this.note.contentMd = value
          this.note.contentHtml = this.mdParser.render(value)
          this.axios.post(url,this.note)
          .then(function (response) {
            if(response.data.status === 200){
              _this.$message({
                type:'success',
                message:'保存成功'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        },
        read(id){
          this.$router.push({
            path:'/note/detail',
            name:'NoteDetail',
            query:{
              noteId:id
            }
          })
        },
        getNoteList(){
          var _this = this
          this.axios.get('/notes')
          .then(function (response) {
            if(response.status === 200){
              _this.noteList = response.data
              _this.dialogFormVisible = true
              console.log(_this.noteList)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        },
        getTitleList(){
          this.titleList = []
          this.noteLink.titleID = ''
          this.noteLink.link = ''
          var content = this.noteList[this.noteLink.noteIndex].contentHtml
          let div = document.createElement("div")
          div.innerHTML = content
          let doc = div.children
          for(var i=0;i<doc.length;i++){
            if(doc[i].nodeName.indexOf("H") !== -1){
              this.titleList.push({
                id:doc[i].children[0].getAttribute("id"),
                name:doc[i].innerText,
              })
            }
          }


        },
        generateLink(){
          this.noteLink.link = ''
          var prefix = "notelink://"
          this.noteLink.link = prefix+(this.noteList[this.noteLink.noteIndex].id)+"&"+this.noteLink.titleID
        },
        copyLink(){
          let clipboard = new Clipboard('.copy-btn')
          clipboard.on('success', e => {
            this.$message({
              type: 'success',
              message:'复制成功'
            });
            this.dialogFormVisible = false
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$message('复制失败');
            this.dialogFormVisible = false
            setTimeout(() => {
            }, 500)
            clipboard.destroy()
          })

        },
        onUploadImg(files, callback) {
          const upload = (file) => {
            const formData = new FormData();
            formData.append('image', file);
            return this.axios({
              url: 'pic/',
              method: 'post',
              data: formData,
              headers: { 'Content-Type': 'multipart/form-data' },
            }).then((response) => {
              if (response.status === 200) {
                return response.data.object;
              } else {
                return Promise.reject(new Error('upload failed'))
              }
            })
          }
          Promise.all(files.map(upload))
            .then(urls => callback(urls))
            .catch(() => this.$message('图片上传失败'))
        }
      }
    }
</script>

<style scoped>
  .bauhaus-edit-container {
    padding: 20px;
    background-color: var(--bauhaus-gray);
    min-height: 100vh;
  }

  .bauhaus-card {
    border: 3px solid var(--bauhaus-black) !important;
    box-shadow: 8px 8px 0px var(--bauhaus-black) !important;
    border-radius: 0 !important;
  }

  .bauhaus-card >>> .el-card__header {
    background-color: var(--bauhaus-yellow);
    border-bottom: 3px solid var(--bauhaus-black) !important;
    padding: 15px 20px;
  }

  .bauhaus-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-title {
    font-weight: 900;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: var(--bauhaus-black);
    letter-spacing: 1px;
  }

  .icon-btn {
    color: var(--bauhaus-black) !important;
    font-size: 1.2rem;
    padding: 5px !important;
    border: 2px solid transparent !important; /* Initial state */
    transition: all 0.2s ease;
  }

  .icon-btn:hover {
    background-color: var(--bauhaus-white);
    border: 2px solid var(--bauhaus-black) !important;
    box-shadow: 2px 2px 0px var(--bauhaus-black);
  }

  .bauhaus-editor {
    border: 3px solid var(--bauhaus-black) !important;
    border-radius: 0 !important;
    margin-top: 10px;
    box-shadow: none !important; /* Remove mavon-editor default shadow if any */
    z-index: 1; /* Ensure it stacks correctly */
  }

  /* Override mavon-editor internal styles */
  .bauhaus-editor >>> .v-note-op {
    border-bottom: 2px solid var(--bauhaus-black) !important;
    background-color: var(--bauhaus-white) !important;
    border-radius: 0 !important;
  }

  .bauhaus-editor >>> .v-note-panel {
    border-radius: 0 !important;
  }
  
  .bauhaus-toolbar-btn {
    color: var(--bauhaus-black) !important;
    font-weight: bold;
  }
  
  .bauhaus-toolbar-btn:hover {
    color: var(--bauhaus-blue) !important;
  }

  .bauhaus-btn {
    border: 2px solid var(--bauhaus-black) !important;
    box-shadow: 4px 4px 0px var(--bauhaus-black) !important;
    transition: all 0.2s;
  }

  .bauhaus-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px var(--bauhaus-black) !important;
  }

  .bauhaus-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--bauhaus-black) !important;
  }

  /* Scrollbar override */
  .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
</style>
