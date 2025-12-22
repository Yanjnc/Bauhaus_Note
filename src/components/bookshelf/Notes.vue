<template>
  <div class="bauhaus-notes-container">
    <el-row :gutter="20">
      <el-col :xl="6" :lg="8" :md="12" :sm="24" v-for="(item,i) in visibleNotes" :key="i">
        <div class="bauhaus-note-card" @click="readNote(item.id)">
          <div class="note-header">
            <span class="note-title">{{item.name}}</span>
          </div>
          <div class="note-body">
            {{restrict(item.abs)}}
          </div>
          <div class="note-actions">
            <el-button class="action-btn" type="text" @click.stop="editNote(item.id)">EDIT</el-button>
            <el-button class="action-btn" type="text" @click.stop="editInfo(item)">INFO</el-button>
            <el-button class="action-btn danger" type="text" @click.stop="deleteNote(item.id)">DEL</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="fab-container">
      <div class="fab fab-yellow" @click="editCategory" title="Edit Category">
        <div class="shape-square"></div>
      </div>
      <div class="fab fab-blue" @click="addNote" title="Add Note">
        <div class="shape-plus"></div>
      </div>
    </div>

    <div class="pagination-container">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="notes.length"
        @current-change="handelPageChange"
        class="bauhaus-pagination">
      </el-pagination>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Notes",
      data() {
        return {
          notes:[],
          visibleNotes:[],
          currentPage:1,
          pageSize:12,
        }
      },
      methods: {
        showNotes(notes){
          this.notes = notes
          //0-11
          //12-24
          this.visibleNotes = []
          for(var i=this.pageSize*(this.currentPage-1);i<(this.pageSize)*(this.currentPage);i++){
            if(i>=this.notes.length){
              break
            }
            this.visibleNotes.push(this.notes[i])
          }
          console.log(this.visibleNotes)
        },

        restrict(abs){
          if(abs === "" || abs == null){
            return ""
          }

          if(abs.length<48){
            return abs
          }
          else {
            return abs.substring(0,48) + '...'
          }
        },

        editInfo(note){
          this.$emit('editInfo',note)
        },

        editNote(id){
          this.$router.push({
            path:'/note/edit',
            name:'NoteEdit',
            query:{
              noteId:id
            }
          })
        },

        readNote(id){
          this.$router.push({
            path:'/note/detail',
            name:'NoteDetail',
            query:{
              noteId:id
            }
          })
        },

        addNote(){
          this.$emit('addNote')
        },

        deleteNote(id){
          var _this = this
          this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.axios.get('note/delete/'+id.toString())
              .then(function (response) {
                if(response.data.status === 200){
                  _this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  _this.$emit('updateInfo')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },

        editCategory(){
          this.$emit('editCategory')
        },

        handelPageChange(pageBack){
          this.currentPage = pageBack
          this.visibleNotes = []
          for(var i=this.pageSize*(this.currentPage-1);i<(this.pageSize)*(this.currentPage);i++){
            if(i>=this.notes.length){
              break
            }
            this.visibleNotes.push(this.notes[i])
          }
          console.log(this.visibleNotes)
        },


      }
    }
</script>

<style scoped>
  .bauhaus-notes-container {
    width: 100%;
    padding-bottom: 100px;
  }

  .bauhaus-note-card {
    background-color: var(--bauhaus-white);
    border: 3px solid var(--bauhaus-black);
    height: 200px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 8px 8px 0px var(--bauhaus-black);
  }

  .bauhaus-note-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px var(--bauhaus-blue);
  }

  .note-header {
    background-color: var(--bauhaus-black);
    color: var(--bauhaus-white);
    padding: 10px;
    border-bottom: 3px solid var(--bauhaus-black);
  }

  .note-title {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .note-body {
    padding: 15px;
    flex-grow: 1;
    font-size: 14px;
    color: var(--bauhaus-black);
    line-height: 1.5;
  }

  .note-actions {
    display: flex;
    border-top: 3px solid var(--bauhaus-black);
  }

  .action-btn {
    flex: 1;
    border-radius: 0;
    border: none;
    border-right: 3px solid var(--bauhaus-black);
    margin: 0 !important;
    padding: 10px 0;
    color: var(--bauhaus-black);
    font-weight: bold;
    font-size: 12px;
  }

  .action-btn:last-child {
    border-right: none;
  }

  .action-btn:hover {
    background-color: var(--bauhaus-yellow);
    color: var(--bauhaus-black);
  }

  .action-btn.danger:hover {
    background-color: var(--bauhaus-red);
    color: white;
  }

  /* FABs */
  .fab-container {
    position: fixed;
    bottom: 40px;
    right: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fab {
    width: 60px;
    height: 60px;
    border: 3px solid var(--bauhaus-black);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 5px 5px 0px var(--bauhaus-black);
    transition: all 0.2s;
  }

  .fab:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0px var(--bauhaus-black);
  }

  .fab-yellow {
    background-color: var(--bauhaus-yellow);
  }

  .fab-blue {
    background-color: var(--bauhaus-blue);
  }

  .shape-square {
    width: 20px;
    height: 20px;
    border: 2px solid var(--bauhaus-black);
  }

  .shape-plus {
    width: 20px;
    height: 20px;
    position: relative;
  }

  .shape-plus::before, .shape-plus::after {
    content: '';
    position: absolute;
    background-color: white;
  }

  .shape-plus::before {
    width: 4px;
    height: 20px;
    left: 8px;
    top: 0;
  }

  .shape-plus::after {
    width: 20px;
    height: 4px;
    top: 8px;
    left: 0;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .bauhaus-pagination >>> .btn-prev, .bauhaus-pagination >>> .btn-next {
     background-color: var(--bauhaus-white) !important;
     border: 2px solid var(--bauhaus-black) !important;
     margin: 0 5px;
     height: 32px;
     border-radius: 0;
  }
  
  .bauhaus-pagination >>> .el-pager li {
    background-color: var(--bauhaus-white) !important;
    border: 2px solid var(--bauhaus-black) !important;
    margin: 0 5px;
    border-radius: 0;
    font-weight: bold;
    height: 32px;
    line-height: 28px;
  }
  
  .bauhaus-pagination >>> .el-pager li.active {
    background-color: var(--bauhaus-blue) !important;
    color: white;
  }

</style>
