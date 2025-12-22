<template>
    <div class="category-bar">
      <el-tabs v-model="currentCid" @tab-click="handleClick" type="card" editable @edit="editCategory" class="bauhaus-tabs">
        <el-tab-pane   v-for="(item,i) in categories"  :label="item.name" :key="i+item.name" :name="item.id.toString()" >
        </el-tab-pane>
      </el-tabs>
      <category-edit-form ref="editForm" @update="update"></category-edit-form>
    </div>
</template>

<script>
  import CategoryEditForm from "./CategoryEditForm";
    export default {
      name: "CategoryBar",
      components: {CategoryEditForm},
      data() {
        return {
          currentCid:"-1",
          categories:[]
        }
      },
      mounted() {
        this.update()
      },
      methods: {
        update(){
          var _this = this
          var cid
          if(this.$route.query.cid === undefined){
            cid = undefined
          }
          else{
            cid = this.$route.query.cid
          }

          this.axios.get("/categories")
            .then(function (response) {
              if(response.status === 200) {
                _this.categories = response.data
                if(_this.categories.length>0){
                  if(cid === undefined){
                    _this.currentCid = _this.categories[0].id.toString()
                  }
                  else{
                    _this.currentCid = cid
                  }
                  _this.$emit('categorySelect')
                }
              }
            })
        },

        edit() {
          this.$refs.editForm.dialogFormVisible = true
          this.$refs.editForm.isCreate = false
          for(var i=0;i<this.categories.length;i++){
            if(this.categories[i].id.toString() === this.currentCid){
              this.$refs.editForm.form = this.categories[i]
            }
          }
        },

        editCategory(targetName,action) {
          if (action === 'remove') {
            var _this = this
            this.$confirm('此操作将永久删除该笔记分类, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.axios.get('category/delete/'+targetName.toString())
                .then(function (response) {
                  if(response.data.status === 200){
                    _this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    let tabs = _this.categories;
                    let activeName = _this.currentCid;
                    if (activeName === targetName) {
                      tabs.forEach((tab, index) => {
                        if (tab.id.toString() === targetName) {
                          let nextTab = tabs[index + 1] || tabs[index - 1];
                          if (nextTab) {
                            activeName = nextTab.id.toString();
                          }
                        }
                      });
                    }
                    _this.currentCid = activeName;
                    _this.categories = tabs.filter(tab => tab.id.toString() !== targetName);
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

          }
          if(action === 'add'){
            this.$refs.editForm.dialogFormVisible = true
            this.$refs.editForm.isCreate = true
          }


        },

        handleClick() {
          this.$emit('categorySelect')
        },
      }
    }
</script>

<style scoped>
  .category-bar {
    margin-bottom: 20px;
  }
  
  /* Deep Selectors for Element UI Tabs to match Bauhaus */
  .bauhaus-tabs >>> .el-tabs__header {
    border-bottom: 2px solid var(--bauhaus-black);
    margin: 0;
  }

  .bauhaus-tabs >>> .el-tabs__nav {
    border: none !important;
  }

  .bauhaus-tabs >>> .el-tabs__item {
    border: 2px solid var(--bauhaus-black) !important;
    border-bottom: none !important;
    margin-right: 5px;
    background-color: var(--bauhaus-white);
    color: var(--bauhaus-black);
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0 !important;
    height: 40px;
    line-height: 40px;
    transition: all 0.2s ease;
  }

  .bauhaus-tabs >>> .el-tabs__item.is-active {
    background-color: var(--bauhaus-yellow);
    color: var(--bauhaus-black);
    top: 2px; /* Visual trick to make it look connected */
  }

  .bauhaus-tabs >>> .el-tabs__item:hover {
    background-color: var(--bauhaus-blue);
    color: var(--bauhaus-white);
  }

  .bauhaus-tabs >>> .el-tabs__new-tab {
    border: 2px solid var(--bauhaus-black) !important;
    color: var(--bauhaus-black) !important;
    background-color: var(--bauhaus-white);
    border-radius: 0 !important;
    margin-left: 10px;
  }
  
  .bauhaus-tabs >>> .el-tabs__new-tab:hover {
    background-color: var(--bauhaus-red);
    color: white !important;
  }
</style>
