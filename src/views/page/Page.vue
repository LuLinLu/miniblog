<template>
  <v-content>
    <v-layout>
    <v-row justify="center">
      <v-col cols="11"  md="7"  align-self="start" align="start">
        <v-card outlined class="mr-0">
          <v-img
              class="white--text"
              height="200px"
              width="100%"
              :src="page.cover"
          >
            <v-card-title class="align-end fill-height text-center">{{page.title}}</v-card-title>

          </v-img>

          <v-card-title class="subtitle-1">{{page.subtitle}}</v-card-title>
          <v-card-text class="subtitle-2 mt-0"><span>发布时间：{{page.c_time | dateFilter}}</span><a href="#" class="ml-3" style="text-decoration: none;">作者：{{page.author}}</a></v-card-text>
          <v-card-actions>
            <strong class="mb-2 ml-3">分类：</strong><Tag :category="page.category" class="ml-1 subtitle-1"/>
          </v-card-actions>
          <v-card-text><social-sharing :url="'http://lublog.cn/page?id='+page.id" inline-template>
            <div id="share-icon" >
              <network network="facebook">
                <i class="fa fa-facebook"></i>
              </network>
              <network network="linkedin">
                <i class="fa fa-linkedin"></i>
              </network>
              <network network="pinterest">
                <i class="fa fa-pinterest"></i>
              </network>
              <network network="reddit">
                <i class="fa fa-reddit"></i>
              </network>
              <network network="twitter">
                <i class="fa fa-twitter"></i>
              </network>
              <network network="vk">
                <i class="fa fa-vk"></i>
              </network>
              <network network="weibo">
                <i class="fa fa-weibo"></i>
              </network>
              <network network="whatsapp">
                <i class="fa fa-whatsapp"></i>
              </network>
            </div>
          </social-sharing></v-card-text>
          <v-card-text class="black--text body-1 text-justify">
                <vue-markdown :source="source" id="mark-content"></vue-markdown>
          </v-card-text>
        </v-card>

        <v-divider></v-divider>
      </v-col>
      <v-col cols="11" md="4" class="d-none d-md-flex d-lg-none d-lg-flex d-xl-none">
        <Recommend @recommendchange="handlerecommend"/>
      </v-col>
    </v-row>
    </v-layout>
    <v-row justify="center">
      <v-col cols="8">
        <v-textarea
            outlined
            name="input-7-4"
            label="发表评论"
            :disabled="uuid === ''"
            v-model="commitData"
        ></v-textarea>
        <v-btn text outlined :disabled="uuid === ''" @click="postCommit">发布</v-btn>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row >
      <v-col v-for="com in commits" cols="4" :key="com.name">
        <CardTopic :commit="com"/>
      </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import Tag from '../../components/Tag.vue'
    import CardTopic from "../../components/commit/CardTopic";
    import Recommend from "./Recommend";
    export default {
        name: "Page",
        props:["id"],
        data(){
            return {
                uuid:this.$store.state.uuid,
                query:"",
                commitData:"",
                commits:[],
                source:"",
                page:{}
            }
        },
        mounted(){
            this.getArticle()
        },
        filters: {
            dateFilter(time) {
                const dataTime = new Date(time)
                const dataNow = new Date()
                const elapsed = (dataNow - dataTime) / 1000
                const year = dataTime.getFullYear()
                const month = dataTime.getMonth()+1
                const date = dataTime.getDate()
                const hours = dataTime.getHours()
                if (elapsed <= 7200) {
                    return "刚刚"
                } else if (elapsed <= 86400){
                    return "一天前"
                } else if (elapsed <= 604800 ){
                    return "几天前"
                } else {
                    return `${year}年${month}月${date}日${hours}点,${elapsed}`
                }
            }
        },
        methods:{
            postCommit(){
                const data = {
                    name:this.$store.state.name,
                    avatar:this.$store.state.avatar,
                    c_time: new Date(),
                    content:this.commitData,
                }
                this.commits.unshift(data)
                this.axios.post("postcommits",{"id":this.id,"commits":this.commits}).then( res => {
                })
            },
            getArticle(){
                this.axios.get(`getarticle?id=${this.id}`).then( res => {
                    this.page = res.data
                    if (res.data.commits !== null){
                        this.commits = res.data.commits
                    }
                    this.source = this.page.content
                })
            },
            handlerecommend(id){
                console.log(1);
                this.axios.get(`getarticle?id=${id}`).then( res => {
                    this.page = res.data
                    if (res.data.commits !== null){
                        this.commits = res.data.commits
                    }
                    this.source = this.page.content
                })
            }
        },
        components:{
            Recommend,
            CardTopic,
            VueMarkdown,
            Tag
        }
    }
</script>

<style scoped>
  #mark-content >>> :nth-child(2){
    margin-top: 2em;
  }
  #mark-content >>> img {
    max-width: 80%;
  }
  #mark-content >>> code {
    max-width: 80%;
    padding: .5em;
  }
  #share-icon {
    display: flex;
    justify-content: flex-start;
  }
  #share-icon >>> i {
    font-size: 2em;
    padding-left: .22em;
    color: #71bc37;
  }
  #share-icon >>> i:hover{
    text-shadow: 0 0 .5em rgba(126, 72, 63, 0.97);
    cursor: pointer;
  }
</style>