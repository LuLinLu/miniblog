<template>
  <v-content>
   <v-container
       class="pa-3"
       fluid
   >
     <v-row v-if="values && values.length >= 0">

       <v-col  cols="12" md="3" sm="6" xs="12" v-for="value in values" :key="value.id">
        <Card :value="value"/>
       </v-col>

     </v-row>
       <v-card v-else outlined>
         <v-card-title>没有找到您要的数据</v-card-title>
       </v-card>
   </v-container>
  </v-content>
</template>

<script>

import Card from "./Card";
export default {
    name:"Search",
    props:["query"],
    data:()=>({
        values:[],
    }),
    components: {
        Card
  },
    mounted(){
        this.searchArticles()
    },
    watch:{
    },
    computed:{
        pagein(){
            return Math.ceil(this.pageTotal / 12)
        }
    },
    methods:{
      searchArticles(){
          this.axios.get(`/searcharticles?q=${this.query}`).then(res => {
              this.values = res.data
          })
      }
    }
};
</script>
