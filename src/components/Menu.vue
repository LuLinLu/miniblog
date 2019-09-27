<template>
  <div>
      <v-app-bar
          app
          clipped-left
          color="amber"
          id="app-bar"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="title">LuBlog&nbsp;<span class="font-weight-light">.cn</span></span>
        <v-spacer></v-spacer>
        <v-text-field
            solo-inverted
            flat
            hide-details
            label="搜索"
            v-model="search"
            prepend-inner-icon="search"
            @keyup.enter="searchHandle"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn v-if="showAvatar" @click="navClick('/login')" text fab rounded class="subtitle-1 ml-2"><v-icon color="grey darken-3">account_circle</v-icon></v-btn>
        <v-avatar
            size="48px"
            v-else>
          <img :src="avatar" alt="avatar">
        </v-avatar>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          app
          clipped
          color="grey lighten-4"
      >
        <v-list
            dense
            class="grey lighten-4"
        >
          <v-list-item
              @click="navClick('/home')"
          >
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                主页
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              @click="navClick('/articles')"
          >
            <v-list-item-action>
              <v-icon>list_alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                文章
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-divider/>
          <v-list-item
            v-show="!showAvatar"
            @click="navClick('/writearticle')"
        >
          <v-list-item-action>
            <v-icon>create</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              写文章
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item
            v-show="!showAvatar"
            @click="navClick('/profile')"
        >
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              档案设置
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>

    export default {
        name: "Menu",
        data:()=>({
            drawer: null,
            avatar:null,
            search:"",
        }),

        computed:{
            showAvatar(){
                if(this.$store.state.uuid === ""){
                    return true
                }else {
                    this.avatar = this.$store.state.avatar
                    return false
                }
            },
        },
        methods:{
            navClick(index){
                this.$router.push(index).catch( err => {

                })
            },
            searchHandle(){
                if(this.search&&this.search.length >= 0){
                    this.$router.replace(`/search?q=${this.search}`).catch(err =>{
                        this.$router.go(0)
                    })
                }
            }
        }

    }
</script>

<style scoped>

  #menu #app-bar {
    border:none;
  }

</style>