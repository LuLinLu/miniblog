<template>
  <v-content>
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
    <v-container
        class="fill-height"
        fluid
    >

      <v-row
          align="center"
          justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="4"
        >
          <v-card v-if="!showRegForm" class="elevation-12">
            <v-toolbar
                color="pink lighten-1"
                dark
                flat
            >
              <v-toolbar-title>登陆界面</v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                      icon
                      large
                      href="/home"
                      v-on="on"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>返回</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                    label="账号"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="loginData.name"
                ></v-text-field>
                <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="loginData.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="error"  @click="showRegForm=!showRegForm">注册</v-btn>
              <v-btn color="success" @click="postLoginData">登入</v-btn>
            </v-card-actions>
          </v-card>
          <Regster v-else/>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
    import Regster from "../register/Regster";
    export default {
        name: "Login",
        components: {Regster},
        data: () => ({
            showRegForm: false,
            snackbar:false,
            postErr:"",
            loginData: {
                name: "",
                password: "",
            },
        }),
        methods: {
            postLoginData() {
                if(this.loginData.name.length >=3 && this.loginData.password.length >= 6){
                    this.axios.post("login", this.loginData)
                        .then(res => {
                            if (res.data.status === "success") {
                                this.$store.commit("setLoginUser", res.data.data);
                                this.$router.push("/home")
                            }else {
                                this.postErr = res.data.status;
                                this.snackbar = true
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.postErr = "账号密码输入格式不正确。"
                    this.snackbar = true
                }

            }
        }
    }
</script>

<style scoped>

</style>