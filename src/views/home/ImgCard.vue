<template>
  <v-flex
      xs12
      :class="classes"
  >
    <v-card
        height="350"
        color="grey lighten-1"
        dark
    >
      <v-img
          :src="homedata.cover"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout
            fill-height
            wrap
            ma-0
            class="text-right pa-2"
        >
          <v-flex xs12>
            <Tag :category="homedata.category"></Tag>
            <h3 class="title font-weight-bold mb-2">
              {{ homedata.title }}
            </h3>
            <div class="caption">
              {{ homedata.author }}<br>{{ homedata.c_time | dateFilter }}
            </div>
          </v-flex>
          <v-flex align-self-end>
            <v-chip
                class="text-uppercase ma-0"
                color="primary"
                label
                small
                @click.stop="handleCardClick"
            >
              点击查看
            </v-chip>
          </v-flex>
        </v-layout>
      </v-img>
    </v-card>
  </v-flex>
</template>

<script>
  import Tag from "../../components/Tag";
    export default {
        name:"ImgCard",
        props:{
            homedata:{
               type: Object,
                default:()=> ({
                    title:"",
                    cover:"",
                })
            }
        },
        components:{Tag},
        data(){
          return{

          }
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
        computed: {
            classes () {
                return {
                    'md6': this.size === 2,
                    'md4': this.size === 3
                }
            },
            handleCardClick(){
                this.$router.push(`/page?id=${this.homedata.id}`)
            }
        }
    }
</script>

<style>
  .v-image__image {
    transition: .3s linear;
  }
</style>