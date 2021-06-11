<template>
  <div id="principal" v-cloak>
    <h1><strong>Carta</strong></h1>
    <div id="bloque">
    
      <div id="articulos" v-for="cart in categorias" v-bind:key="cart.id" data-target="#carta3" data-toggle="collapse" @click="cambiarCarta(cart)">
          <a href="#carta2"><h4>{{cart}}</h4></a>
        </div> 
        <div id="qr" data-target="#codigoqr" data-toggle="collapse">
        <a href="#codigoqr"><h4>Código Qr</h4> </a>
      </div>
      
      </div>
      
      <div id="carta">
        <div  id="carta2" >
        <h3 id="categoria">{{categoria}}</h3>
          <ul  v-for="car in iniciarCarta" v-bind:key="car.Id" >
            <li>{{car.Nombre}} -> {{car.Descripcion}} </li>
          </ul>
      </div>
      </div>
      

      

      <div id="codigoqr" class="collapse">
        <img src="../Img/qr.png" alt="" width="250px" height="250px">
      </div>
  </div>
</template>


<script>
import firebase from "firebase";
import { db } from "../db";

export default {
  name: "Novedades",
  data() {
    return {
      user: null,
      admin: null,
      carta : [],
      categorias : ['Tostadas','Infusiones-Cafes','Raciones','Vegetarianos','Postres','Bocadillos-Hamburguesas'],
      productos : [],
      categoria: "",
      precio: "",
      nombre: "",
      id: ""
    };
  },
  props: {
    articulos: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  firestore:{
   productos : db.collection("Carta")
  },

  methods: {
    cambiarCarta(id){
      this.categoria=id;
     
    },
  },
  /*Función en el cuál se comprueba si hay un usuario logeado y si existe se comprueba si es el admin o no.*/ 
  created() {
          this.Categoria= this.categorias[0];

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        if (user.email == "administrador@admin.com") {
          this.admin = user;
          this.user = null;
        }
      } else {
        this.user = null;
      }
    });
  },
  computed:{
    iniciarCarta(){
      let cart = [];
      for(var i=0;i<this.productos.length;i++){
        if(this.categoria==this.productos[i].Categoria){
          cart.push(this.productos[i]);
        }
      }
      return cart;
    },
    
  },
  mounted(){
    this.cambiarCarta(this.categorias[0]);
  }
 
};
</script>
<style scoped lang="scss">
@import "../scss/components/_carta.scss";

</style>