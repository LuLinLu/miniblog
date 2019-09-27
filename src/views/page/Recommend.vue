<template>
  <div>
    <v-subheader class="subtitle-2">内容推荐</v-subheader>
    <v-divider></v-divider>
    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item v-for="r in recommends" :key="r.id" @click="handleClick(r.id)">
          <v-list-item-avatar tile size="48">
            <v-img :src="r.cover"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="baseline">
            <h4>{{r.title}}</h4>
            <strong class="font-weight-thin caption">{{r.subtitle}}</strong>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
    export default {
        name: "Recommend",
        props:["recommendchange"],
        data(){
            return {
                recommends:[]
            }
        },
        mounted(){
            this.getRecommend()
        },
        methods:{
            getRecommend(){
                this.axios.get("recommend").then(res => {
                    this.recommends = res.data
                })
            },
            handleClick(id){
                this.$emit("recommendchange",id)
            }
        }
    }
</script>

<style scoped>

</style>