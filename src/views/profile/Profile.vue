<template>
  <v-content>
    <v-layout>
      <v-row justify="center">
        <v-col cols="8">
          <v-card outlined>
            <v-card-title>
              用户档案设置
            </v-card-title>

           <v-list-item three-line>
             <v-list-item-content>
               <v-list-item-title class="baseline mb-3">头像设置</v-list-item-title>
               <v-list-item-avatar
                   size="80"
               >
                 <img :src="avatar" alt="avatar"/>
               </v-list-item-avatar>
               <v-list-item-subtitle>图片为小于3MB的PNG或JPG文件</v-list-item-subtitle>
               <v-list-item-action-text>
                 <v-file-input label="上传头像" class="mt-5" v-model="file" @change="upAvatar"></v-file-input>
               </v-list-item-action-text>
             </v-list-item-content>
             <v-list-item-content>
               <v-list-item-action-text>
                 <div class="baseline  text-center">修改密码<v-btn color="error" @click="editPwd" text>确认修改</v-btn></div>
                 <v-text-field label="原密码" v-model="passwords.oldpwd" type="password"></v-text-field>
                 <v-text-field label="新密码" v-model="passwords.newpwd" type="password"></v-text-field>
                 <v-text-field label="确认密码" v-model="passwords.conpwd" type="password"></v-text-field>
               </v-list-item-action-text>
             </v-list-item-content>
           </v-list-item>

          </v-card>
          <Subscribe/>
          <v-card outlined class="pa-3 mt-3" >
           <div class="baseline ">邮箱地址</div>
            <v-row>
              <v-col cols="7">
                <v-text-field :label="email" v-model="newmail"></v-text-field>
              </v-col>
              <v-col class="mt-3" >
                <v-btn color="error" @click="editEmail">修改</v-btn>
              </v-col>
            </v-row>
          </v-card>
          <div class="baseline mt-3">文章统计</div>
          <div class="text-center">
            <v-dialog
                v-model="dialog"
                width="500"
            >

              <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                >
                  您确认删除文章吗？
                </v-card-title>

                <v-card-text class="text-center body-1 pa-4">
                  您的文章已经删除了，为了避免误删，现在我们已经为您把文章打包成MD文件您可以点击<a :href="downloadfile" download="text.md">这里下载</a>!
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                  >
                    知道了
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
         <ProTable :desserts="desserts" @deletefile="deletefile"/>
        </v-col>
      </v-row>
    </v-layout>
  </v-content>
</template>

<script>
    import ProTable from "./ProTable";
    import Subscribe from "./Subscribe";
    export default {
        name: "Profile",
        components: {Subscribe, ProTable},
        data(){
            return{
                avatar:this.$store.state.avatar,
                uuid:this.$store.state.uuid,
                name:this.$store.state.name,
                file:null,
                dialog:false,
                downloadfile:"",
                email: this.$store.state.email,
                newmail:"",
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                    },
                ],
                passwords:{
                    oldpwd:"",
                    newpwd:"",
                    conpwd:"",
                },
            }
        },
        mounted(){
            if(this.$store.state.uuid === ""){
                this.$router.push("/home")
            }
            this.getUserArts()
        },
        methods:{
            upAvatar(file){
                let formData = new FormData()
                formData.append("file",file)
                formData.append("uuid",this.uuid)
                this.axios({
                    url: 'uploadfile',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then(res => {
                    this.avatar = res.data.url
                })
            },
            editPwd(){
                if(this.passwords.oldpwd.length >= 7 && this.passwords.newpwd.length >= 7){
                    if (this.passwords.newpwd === this.passwords.conpwd){
                        this.axios.post("/editpwd",{"uuid":this.uuid,"passwords":this.passwords}).then(res =>{
                            console.log(res.data);
                        })
                    }
                }
            },
            editEmail(){
                const r = new RegExp(`\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*`)
                console.log(this.newmail);
                console.log(r.test(this.newmail));
            },
            getUserArts(){
                this.axios.post("getuserarticle",{"uuid":this.uuid,"name":this.name}).then( res =>{
                    this.desserts = res.data
                })
            },
            deletefile(url){
                this.dialog = true
                this.downloadfile = url
                this.getUserArts()
            }
        }
    }
</script>

<style scoped>

</style>