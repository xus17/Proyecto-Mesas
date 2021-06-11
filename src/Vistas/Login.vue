<template>
  <div>
    <Heade />

    <div id="login">
      <div id="login2">
        <button @click="admini" v-if="admin!=true" class="butini2">Administrador</button>
        <button @click="cliente2" v-if="cliente!=true" class="butini2">Cliente</button>
        <div class="field" v-if="cliente3">
          <table>
            <tr>
              <td><label for="">Código</label></td>
            </tr>
            <tr>
              <td><input class="input"  type="text"  placeholder="Código aqui.."   v-model="codigo" v-cloak /></td>
            </tr>
            <tr>
              <td><label for="">Email</label></td>
            </tr>
            <tr>
              <td><input class="input"  type="email"  placeholder="Email aqui.."   v-model="email2" v-cloak /></td>
            </tr>
          </table>
        </div>
        <div class="field" v-if="admin3">
          <table>
            <tr>
              <td><label for="">Email</label></td>
            </tr>

            <tr>
              <td><input class="input"  type="email"  placeholder="Email aqui.."   v-model="email" v-cloak /></td>
            </tr>
            <tr>
              <td><label for="">Contraseña</label></td>
            </tr>
            <tr>
              <td><input class="input"  type="password"  placeholder="Contraseña aqui.."   v-model="password" v-cloak /></td>
            </tr>
            
          </table>
         
        </div>
        
        <div id="botones" >
          <button @click="login" v-if="admin3" class="butini">Login</button>
          <button @click="editarborrar" v-if="cliente3" class="butini">Login</button>
        </div>

      </div>
    </div>
    <Foote />
  </div>
</template>

<script>
import {db} from "../db";
import Heade from "../components/Header";
import Foote from "../components/Footer";

export default {
  name: "Login",
  components: {
    Heade,
    Foote
  },
  data() {
    return {
      email: "",
      email2: "",
      password: "",
      codigo:"",
      cliente: false,
      admin:false,
      admin3: false,
      cliente3:false,
      reservas: []
    };
  },
  firestore: {
    reservas: db.collection("Reservas")
  },
  methods: {
    admini(){
      this.admin=true;
      this.cliente=true;
      this.admin3=true;
    },
    cliente2(){
      this.admin=true;
      this.cliente=true;
      this.cliente3=true;
    },
    editarborrar(){
      
      var verdad= false;
      for(var i=0;i<this.reservas.length;i++){
        if(this.codigo==this.reservas[i].id){
          if(this.email2==this.reservas[i].Email){
            this.$notify({ type: 'success', title: 'Correcto', text: 'Se ha entrado en el panel de editado o borrado de la reserva'});
            sessionStorage.codigo=this.codigo;
            sessionStorage.email = this.email2;
            verdad= true;
            this.$router.push('/editarborrar');
          }
        }
      }
      if(!verdad){
        this.$notify({ type: 'error', title: 'Error', text: 'Introduce correctamente los campos.'});
      }
    },
    login: function () {
      if ((this.email=="admin@admin.com") && (this.password=="admin2")) {  
        this.$notify({ type: 'success', title: 'Correcto', text: 'Se ha entrado en el panel de administrador'});
        this.$router.push("/admin");
      }else{
        this.$notify({ type: 'error', title: 'Error', text: 'Introduce los campos correctamente'});
      }
    }
  },
};
</script>

<style lang="scss" scope >
@import "../scss/components/_login.scss";
</style>