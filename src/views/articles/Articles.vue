<template>
  <v-content>
   <v-container
       class="pa-3"
       fluid
   >
     <v-row>
       <v-col cols="12" md="3" sm="6" xs="12" v-for="value in values" :key="value.id">
        <Card :value="value"/>
       </v-col>
     </v-row>
     <div class="text-center">
       <v-pagination
           v-model="page"
           :length="pagein"
       ></v-pagination>
       </div>
   </v-container>
  </v-content>
</template>

<script>

import Card from "./Card";
export default {
    name:"Articles",
    data:()=>({
        values:[
            {url:"https://free-blog.vuetifyjs.com/img/moroccandays.118acbab.jpg",category:"旅行",title:"在云和山的彼端",author:"少年"},
            {url:"https://free-blog.vuetifyjs.com/img/autumnclouds.e44135e5.jpg",category:"故事",title:"记忆中的湖水",author:"佚名"},
            {url:"https://free-blog.vuetifyjs.com/img/snowcup.a42567f1.jpg",category:"读书",title:"冰天雪地的故事",author:"mr.lu"},
            {url:"https://free-blog.vuetifyjs.com/img/autumnclouds.e44135e5.jpg",category:"故事",title:"记忆中的湖水",author:"佚名"},
            {url:"https://free-blog.vuetifyjs.com/img/firepots.7fd55107.jpg",category:"美食",title:"火的魔法",author:"大胖"},
            {url:"https://free-blog.vuetifyjs.com/img/jellyfish.0782ae1d.jpg",category:"潮流",title:"水母其实不睡觉",author:"明小姐"},
            {url:"https://free-blog.vuetifyjs.com/img/greengrass.4c0f4c29.jpg",category:"读书",title:"麦田怪圈与外星人",author:"UFO"},
            {url:"https://free-blog.vuetifyjs.com/img/july4.e77a6053.jpg",category:"故事",title:"烟花易冷",author:"周董"},
            {url:"https://free-blog.vuetifyjs.com/img/firepots.7fd55107.jpg",category:"美食",title:"火的魔法",author:"大胖"},
            {url:"https://free-blog.vuetifyjs.com/img/jellyfish.0782ae1d.jpg",category:"潮流",title:"水母其实不睡觉",author:"明小姐"},
            {url:"https://free-blog.vuetifyjs.com/img/greengrass.4c0f4c29.jpg",category:"读书",title:"麦田怪圈与外星人",author:"UFO"},
            {url:"https://free-blog.vuetifyjs.com/img/july4.e77a6053.jpg",category:"故事",title:"烟花易冷",author:"周董"},
        ],
        page:1,
        pageTotal:0,
        cate:"",
    }),
    components: {
        Card
  },
    mounted(){

        if (this.$store.state.subscribes){
            this.cate = this.$store.state.subscribes
            this.getArticlesO(this.page)
            console.log(this.$store.state.subscribes);
        } else {
            this.getArticlesO(this.page)
        }
    },
    watch:{
        page(n,o){
            this.getArticlesO(n)
        }
    },
    computed:{
        pagein(){
            return Math.ceil(this.pageTotal / 12)
        }
    },
    methods:{
        getArticlesO(page){
            this.axios.get(`/getarticlelist?page=${page-1}&cate=${this.cate}`).then( res => {
                console.log(res.data);
                this.pageTotal = res.data.count
                this.values = res.data.data
            })
        },
    }
};
</script>
