<template>
  <v-banner v-show="show" single-line>
   {{bannerText}}
    <template v-slot:actions>
      <v-btn
          @click="show=false"
          text
          color="deep-purple accent-4"
      >
        知道了
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
    export default {
        name: "Banner",
        data:()=>({
            show:true,
            bannerText:"登陆后才能发表回复和写文章哟～",
        }),
        methods:{

        },
    }
</script>

<style scoped>

</style>