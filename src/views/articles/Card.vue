<template>
  <v-card
      hover
      class="mx-auto"
      max-width="400"

  >
    <v-img
        class="white--text"
        height="200px"
        :src="value.cover"
    >
      <v-card-title class="align-end fill-height">{{value.title}}</v-card-title>
    </v-img>

    <v-card-text class="d-flex flex-column justify-space-around">

      <span class="text--primary" >
        <div><span>
          <Tag :category="value.category"/>
        </span> </div>

        <br>
        <span class="mt-3">{{value.title}}</span>
      </span><span>{{value.author}}</span>
    </v-card-text>

    <v-card-actions>
      <v-btn
          text
          color="orange"
          @click="showShare = !showShare"
      >
        分享
      </v-btn>
      <v-btn
          text
          color="orange"
          @click.stop="readCard(value.id)"
      >
        阅读
      </v-btn>
    </v-card-actions>
      <v-card outlined v-if="showShare">
        <v-card-actions>
          <social-sharing :url="'http://lublog.cn/page?id='+value.id" inline-template>
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
          </social-sharing>
        </v-card-actions>
      </v-card>
  </v-card>
</template>

<script>
  import Tag from '../../components/Tag'
    export default {
        name: "Card",
        props:['value'],
        components:{
            Tag
        },
        data:()=>({
            showShare:false
        }),
        methods:{
            readCard(id){
                this.$router.push(`/page?id=${id}`)
            }
        },
    }
</script>

<style scoped>
  #share-icon {
    display: flex;
    justify-content: space-around;
  }
  #share-icon >>> i {
    font-size: 2em;
    padding-left: .22em;
    color: #71bc37;
  }
</style>