<template>
  <v-content>
    <banner/>
    <v-parallax :src="require('@/assets/material.webp')">
      <v-row
          align="center"
          justify="center"
      >
        <h1 class="display-2 font-weight-thin mb-4">LuBlog.cn</h1>
        <h4 class="subheading">今天有什么想说的吗？</h4>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row>
        <v-col cols="6" md="6" xl="6">
          <ImgCard :homedata="homedata[0]"/>
        </v-col>
        <v-col cols="6" md="6" xl="6">
          <ImgCard :homedata="homedata[1]" :key="homedata.id" />
        </v-col>
       </v-row>
      <v-row>
        <v-col cols="12">
          <ImgCard :homedata="homedata[2]" :key="homedata.id"/>
        </v-col>
      </v-row>
      <v-sheet color="pink lighten-3" class="text-center subtitle-2">新近发表</v-sheet>
      <v-row>
        <v-col cols="3" md="3" xs="6">
          <ImgCard :homedata="homedata[3]" :key="homedata.id" />
        </v-col>
        <v-col cols="3" md="3" xs="6">
          <ImgCard :homedata="homedata[4]" :key="homedata.id" />
        </v-col>
        <v-col cols="3" md="3" xs="6">
          <ImgCard :homedata="homedata[5]" :key="homedata.id" />
        </v-col>
        <v-col cols="3" md="3" xs="6">
          <ImgCard :homedata="homedata[6]" :key="homedata.id" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
    import Banner from "./Banner";
    import ImgCard from "./ImgCard";
    export default {
        name: "Home",
        data(){
            return{
                showGra:false,
                homedata:[],
            }
        },
        components: {ImgCard, Banner},
        mounted(){
            this.getHomeData()
        },
        methods:{
            getHomeData(){
                this.axios.get("gethomedata").then( res => {
                    this.homedata = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>