<template>
  <v-card
      class="mx-auto"
      :color="color"
      dark
      max-width="400"
  >
    <v-card-title>
      <v-avatar
          large
          left
      >
        <v-img
            class="elevation-6"
            :src="commit.avatar"
        ></v-img>
      </v-avatar>
      <span class="title font-weight-light ml-1">{{commit.name}} 说：</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{commit.content}}
      </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">


        <v-list-item-content>
          <v-list-item-title>{{commit.c_time | dateFilter }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "CardTopic",
        props:["commit"],
        data(){
            return {
                color:"#26c6da",
            }
        },
        mounted(){
            this.randomColor()
        },
        methods:{
            randomColor(){
                const colors = [
                    "blue darken-1",
                    "cyan",
                    "purple lighten-3",
                    "deep-purple darken-1",
                    "teal",
                    "light-blue darken-1",
                    "green",
                    "light-green",
                    "lime darken-3",
                    "brown darken-1"
                ]
                const i = Math.floor(Math.random()*10)
                this.color = colors[i]
            },
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
    }
</script>

<style scoped>

</style>