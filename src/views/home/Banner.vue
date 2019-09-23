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
            bannerText:"只有登陆/注册后才能发表文章哟，文章归档系统现已经上线。欢迎试用！",
        }),
        methods:{

        },
    }
</script>

<style scoped>

</style>