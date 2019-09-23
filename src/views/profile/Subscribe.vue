<template>
  <v-card outlined class="pa-3 mt-3" dark>
    <v-row>
      <v-col cols="10">
        <v-combobox
            v-model="subscribes"
            :items="items"
            search-input.sync="search"
            hide-selected
            label="定制您喜欢的文章分类"
            multiple
            persistent-hint
            clearable
            chips
            :disabled="disabled"
            no-data-text="0"
        >
          <template v-slot:selection="data">
            <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click="removeData(data)"
            >
              <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>

        </v-combobox>
      </v-col>
      <v-col align-self="center" align="center">
        <v-btn color="success" rounded @click="postSubs" :disabled="disabled">订阅</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
    export default {
        name: "Subscribe",
        data(){
            return{
                items:[],
                subscribes:this.$store.state.subscribes,
                disabled:false,
            }
        },
        mounted(){
            this.getSubs()
        },
        methods:{
            removeData(data){
                this.subscribes.splice(data.index,1)
            },
            getSubs(){
                this.axios.get("getsubscribe").then( res =>{
                    res.data.map(item => {
                        this.items.push(item.name)
                    })
                })
            },
            postSubs(){
                this.axios.post("postsubs",{"uuid":this.$store.state.uuid,"subscribes":this.subscribes}).then(res =>{
                    if (res.status === 200) {
                        this.disabled = true
                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>