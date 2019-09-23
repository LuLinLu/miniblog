<template>
  <v-app app>
    <Menu/>
    <router-view/>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div class="text-center">&copy; {{ new Date().getFullYear() }} CREATED BY MR.LU</div>
      <div class="flex-grow-1"></div>
    </v-footer>
  </v-app>
</template>

<script>

    import Menu from "./components/Menu";
    export default {
        name: 'App',
        components: {
            Menu
        },

    };
</script>
<style>
  @font-face {
    font-family: 'webfont';
    font-display: swap;
    src: url('//at.alicdn.com/t/webfont_87qfhljc9l7.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/webfont_87qfhljc9l7.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/webfont_87qfhljc9l7.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_87qfhljc9l7.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/webfont_87qfhljc9l7.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/webfont_87qfhljc9l7.svg#Alibaba-PuHuiTi-Regular') format('svg'); /* iOS 4.1- */
  }
  * {
   font-family: "Heiti SC",Georgia,sans-serif;
  }
</style>