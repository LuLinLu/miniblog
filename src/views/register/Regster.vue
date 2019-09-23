<template>
  <v-card class="elevation-12">
    <v-snackbar
        v-model="snackbar"
        color="red"
        :timeout="3000"
        top
    >
      {{ postErr }}
      <v-btn
          dark
          text
          @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
    <v-toolbar
        color="pink lighten-1"
        dark
        flat
    >
      <v-toolbar-title>用户注册</v-toolbar-title>

    </v-toolbar>
    <v-card-text>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="pa-3"
  >
    <v-text-field
        v-model="registerData.name"
        :counter="10"
        :rules="registerData.nameRules"
        label="用户名"
        required
    ></v-text-field>

    <v-text-field
        v-model="registerData.email"
        :rules="registerData.emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-text-field
        name="password"
        type="password"
        v-model="registerData.password"
        :counter="15"
        :rules="registerData.passwordRules"
        label="密码"
        required
    ></v-text-field>

    <v-text-field
        type="password"
        v-model="confirmPwd"
        :counter="15"
        :rules="PwdRules"
        label="确认密码"
        required
    ></v-text-field>

    <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || '你必须同意遵守用户协议才能继续!']"
        label="我同意遵守用户协议"
        required
    ></v-checkbox>



  </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>

      <v-btn
          color="error"
          @click="reset"
      >
        重置内容
      </v-btn>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
    >
      提交注册
    </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>

    export default {

        data: () => ({
            file:null,
            imageUrl:null,
            valid: false,
            snackbar:false,
            postErr:"",
            checkbox:false,
            confirmPwd:"",
            registerData:{
                name:"",
                nameRules: [
                    v => !!v || '用户名不能为空',
                    v => (v && v.length <= 10) || '用户名必须小于10字符',
                ],
                avatar:"http://localhost:8001/static/avatar/avatar.png",
                email:"",
                emailRules: [
                    v => !!v || '邮箱不能为空',
                    v => /.+@.+\..+/.test(v) || '邮箱个格式不正确',
                ],
                password:"",
                passwordRules:[
                    v => !!v || '密码不能为空',
                    v => v && (v.length <= 15 && v.length >= 7) || "密码需大于7个字符且小于15个字符"
                ],
            }
        }),
        computed:{
            PwdRules(){
                return [
                    v => !!v || 'Name is required',
                    ()=> (this.confirmPwd === this.registerData.password) || "两次密码必须一致"
                ]
            }
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                    this.postRegData()
                }


            },
            reset () {
                this.$refs.form.reset()
            },
            postRegData(){
                this.axios.post("register",this.registerData).then(res => {
                    if (res.data.status === "success"){
                        this.$router.push("/home")
                    }else {
                        this.postErr = res.data.status;
                        this.snackbar = true
                    }
                })
            }
        }

    }
</script>


<style scoped>

</style>