<template>
  <header>
    <ul>
      <li>
        <router-link to="/"><a><img src="../Img/logo2.png" alt="" width="110px" height="60px" /></a></router-link>
      </li>
      <li>
        <router-link id="userlogo" v-if="!admin" to="/login" @click="cambiaradmin"><a><i  class="fa fa-user-circle"></i></a></router-link>
      </li>
    </ul>
  </header>
</template>


<script>

export default {
  name: "Heade",
  data() {
    return {
      user: null,
      admin:false,
      editar: sessionStorage.Editar,
      borrar: sessionStorage.Borrar
    };
  },
  props: {
    Inicio: {
      type: Boolean,
      default: false,
    },
  },
  firestore: {
  },
  computed: {
    
    
  },
  methods: {
    cambiaradmin(){
      sessionStorage.admin=false;
      this.admin=sessionStorage.admin;
    },
    Editar:function(){
      sessionStorage.Editar="true";
      sessionStorage.Borrar = "false";
    },
    Borrar(){
      sessionStorage.Editar="false";
      sessionStorage.Borrar="true";
    },
    cambiar: function () {
      this.Inicio = true;
    },
   
  },
 
};
</script>

<style scoped lang="scss"> 

@import "../scss/components/_header.scss";
</style>