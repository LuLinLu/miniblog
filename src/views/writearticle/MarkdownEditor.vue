<template>
  <div>
    <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="content" :toolbars="toolbars" :ishljs = "true"></mavon-editor>
  <v-btn color="success" class="mt-6" @click="finishEdit">确定</v-btn>
    <v-btn color="error" class="mt-6 ml-3" @click="cancelEdit">取消</v-btn>
  </div>
</template>

<script>
    export default {
        name: "MarkdownEditor",
        props:["endedit","canceledit"],
        data(){
            return {
                content:"",
                toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                    undo: true, // 上一步
                    redo: true, // 下一步
                }
            }
        },
        methods: {
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                let formdata = new FormData();
                formdata.append('image', $file);
                formdata.append('user',this.$store.state.name)
                this.axios({
                    url: 'uploadimg',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then(res => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    this.$refs.md.$img2Url(pos, res.data.url);
                    console.log(res.data.url);
                })
            },
            $imgDel(pos){
                console.log(pos[1].name);
                let formdata = new FormData()
                formdata.append("user",this.$store.state.name)
                formdata.append("image",pos[1].name)
                this.axios({
                    url: 'deleteimg',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                })
            },
            finishEdit(){
                this.$emit("endedit",this.content)
            },
            cancelEdit(){
                this.$emit("canceledit")
            }
        }
    }
</script>

<style scoped>

</style>