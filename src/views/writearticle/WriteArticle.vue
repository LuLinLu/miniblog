<template>
  <v-content>
    <v-row justify="center">
      <v-col cols="8">


    <v-stepper v-model="e1" vertical>
      <v-stepper-step :complete="e1 > 1" step="1">先设置标题内容</v-stepper-step>
      <v-stepper-content step="1">
        <v-card
            class="mb-12"
            color="grey lighten-1"
            height="220px"
        >
          <v-card-text>
            <v-form
                v-model="valid"
            >
            <v-text-field
                label="主要标题"
                :rules="titleRules"
                v-model="title"
                :counter="15"

            >
            </v-text-field>
            <v-text-field
                label="概括性标题"
                v-model="subtitle"
                :rules="subtitleRules"
                :counter="25">
            </v-text-field>
            <v-select
                :items="items"
                :rules="categoryRules"
                v-model="category"
                label="文章分类"
                no-data-text="1"
            ></v-select>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn
            color="primary"
            @click="e1 = 2"
            :disabled="!valid"
        >
          继续
        </v-btn>
        <v-btn text
               disabled
        >返回</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e1 > 2" step="2">上传封面图片</v-stepper-step>
      <v-stepper-content step="2">
        <v-card
            class="mb-12"
            color="grey lighten-1"
        >
            <v-img :src="previewurl" contain width="100%" ></v-img>
          <v-card-actions>
            <v-file-input label="上传封面" :clearable="false" accept="image/*" v-model="coverfile" @change="previewFile"></v-file-input>
          </v-card-actions>
        </v-card>

        <v-btn
            color="primary"
            :disabled="coverfile === null"
            @click="e1 = 3"
        >
          继续
        </v-btn>

        <v-btn text
               @click="e1 = 1"
        >返回</v-btn>
      </v-stepper-content>
      <v-stepper-step step="3">选择文章发布类型</v-stepper-step>
      <v-stepper-content step="3">
        <v-overflow-btn
            class="my-2"
            :items="dropdown_font"
            label="请选择"
            loading
            v-model="choice"
            no-data-text=""
        ></v-overflow-btn>
        <v-card
            class="mb-12"
            color="grey lighten-1"

            v-if="choice==='上传文件'"
        >
          <v-card-title class="pa-8"><p style="color: #575757">目前仅支持MD格式文件解析。</p></v-card-title>
          <v-card-text>
            <v-file-input  prepend-icon="card_travel" class="pa-5" accept=".md" v-model="mdfile"></v-file-input>
          </v-card-text>
          <v-card-actions class="mt-3" >
            <v-btn
                color="primary"
                :disabled="mdfile === null"
                @click="confirmUpload"
            >
              完成
            </v-btn>
            <v-btn text @click="e1 = 2">返回</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
            class="mb-12"
            outlined
            v-if="choice==='MarkDown编辑器'"
        >
          <v-card-title class="subtitle-1">文章编辑区</v-card-title>
          <v-card-text class="mb-10">
            <MarkdownEditor @endedit="endedit" @canceledit="e1 = 2" class="mt-8"/>
          </v-card-text>
        </v-card>



      </v-stepper-content>

      <v-stepper-items>


      </v-stepper-items>
    </v-stepper>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
  import MarkdownEditor from "./MarkdownEditor";
    export default {
        name: "WriteArticle",
        data() {
            return {
                uuid:this.$store.state.uuid,
                author: this.$store.state.name,
                valid:false,
                title:"",
                titleRules:[
                    v => !!v || "标题不能为空",
                    v => v && (v.length >= 5 && v.length <= 15) || "标题必须大于5个字符小于15个字符"
                ],
                subtitle:"",
                subtitleRules:[
                    v => !!v || "副标题不能为空",
                    v => v && (v.length >= 10 && v.length <= 25) || "标题必须大于10个字符小于25个字符"
                ],
                choice:"",
                category:"",
                categoryRules:[
                    v => !!v || "文章类别不能为空"
                ],
                coverfile:null,
                mdfile:null,
                previewurl:"",
                items:[],
                e1: 1,
                dropdown_font:["上传文件","MarkDown编辑器"]
            }
        },
        components:{
            MarkdownEditor
        },
        mounted(){
            if (this.$store.state.uuid === ""){
                this.$router.push("/home")
            }
            this.getSubs()
        },
        methods:{
            getSubs(){
                this.axios.get("getsubscribe").then(res =>{
                    res.data.map(item => {
                        this.items.push(item.name)
                    })
                })
            },
            confirmUpload(){
                let formData = new FormData
                formData.append("title",this.title)
                formData.append("author",this.author)
                formData.append("subtitle",this.subtitle)
                formData.append("category",this.category)
                formData.append("cover",this.coverfile)
                formData.append("content",this.mdfile)
                this.axios({
                    url: 'postarticlefile',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then( res => {
                    if (res.data.status==="success"){
                        this.$router.push(`/page?id=${res.data.id}`)
                    }
                })
            },
            previewFile(file){
                let formData = new FormData
                formData.append("file",file)
                this.axios({
                    url:"previewfile",
                    method:"post",
                    data:formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then( res => {
                    this.previewurl = res.data.url
                })
            },
            endedit(content){
                let formData = new FormData
                formData.append("title",this.title)
                formData.append("author",this.author)
                formData.append("subtitle",this.subtitle)
                formData.append("category",this.category)
                formData.append("cover",this.coverfile)
                formData.append("content",content)
                this.axios({
                    url: 'postarticleeditor',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then( res => {
                    if (res.data.status==="success"){
                        this.$router.push(`/page?id=${res.data.id}`)
                    }
                })
            },

        },


    }
</script>

<style scoped>

</style>