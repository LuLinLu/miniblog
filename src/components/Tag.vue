<template>
  <v-chip
      label
      class="mx-0 mb-2"
      text-color="white"
      small
      :color="tagColor"
      align="end"
  >
  {{category}}
  </v-chip>
</template>

<script>
    export default {
        name: "Tag",
        props:{
        category:{
            type:String,
            required: true,
            default:"未知"
        }
    },
        data(){
            return {
                subscribes:[],
                target:{}
            }
        },
        computed:{
            tagColor(){
                switch (this.category) {
                    case "旅行":
                        return "green"
                    case "电影":
                        return "blue lighten-1"
                    case "心情":
                        return "pink lighten-1"
                    case "故事":
                        return "blue-grey lighten-1"
                    case "美食":
                        return "red accent-2"
                    case "读书":
                        return "cyan lighten-2"
                    case "游戏":
                        return "yellow lighten-2"
                    case "音乐":
                        return "green accent-2"
                    default :
                        return "blue lighten-"


                }
            }
        }

    }
</script>

<style scoped>

</style>