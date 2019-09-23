<template>
  <v-simple-table dark dense>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">标题</th>
        <th class="text-left">阅读人数</th>
        <th class="text-center">管理</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in desserts" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.read }}</td>
        <td class="text-center"><v-btn text color="success" @click.stop="lookoutArt(item.id)">查看</v-btn>
          <v-btn text color="error" @click.stop="deleteArt(item.id)">删除</v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
    export default {
        name: "ProTable",
        props:['desserts','deletefile'],
        methods:{
            lookoutArt(id){
                this.$router.push(`/page?id=${id}`)
            },
            deleteArt(id){
                this.axios.post("deletearticle",{"uuid":this.$store.state.uuid,"id":id}).then( res => {
                    console.log(res.data.url);
                    this.$emit("deletefile",res.data.url)
                })
            }
        }
    }
</script>

<style scoped>

</style>