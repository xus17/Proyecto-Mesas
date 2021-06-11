<template>
  <div>

    <div id="registrar">
      <h1><strong>Reservar</strong></h1>
      <div id="registrar2">

        <form @submit.prevent="sendEmail">
            <h3><strong>{{mesa}}</strong></h3>
          <img src="../Img/mesa.png" alt="" width="200px" height="200px">
          <table>
          <tr>
            <td>Nombre:</td>
            <td><input type="text" v-model="usuario" name="usuario" placeholder="Aqui el usuario..." required></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input type="email" v-model="email" name="email" placeholder="Aqui el email.." required></td>
          </tr>
          <tr>
            <td>Teléfono:</td>
            <td><input type="number" v-model="telefono" name="telefono" placeholder="Aqui el telefono.." pattern="[0-9]{9}" required></td>
          </tr>
          <tr>
            <td>Fecha:</td>
            <td><input type="date" id="fechEnvia" name="fecha2" v-model="fecha"  :min="fecha" max="2022-12-31" required></td>
          </tr>
          <tr>
            <td>Personas:</td>
            <select id="optPersonas" name="personas" v-model="personas" required>
              <option >1</option>
              <option >2</option>
              <option >3</option>
              <option >4</option>
              <option >5</option>
              <option >6</option>
            </select>
          </tr>
          <tr>
            <td>Mesa: </td>
            <td><select v-model="zona" required>
              <option >Comedor</option>
              <option >Terraza 1</option>
              <option >Terraza 2</option>
              </select>
               <select v-model="mesa">
                <option v-for="(mesita,index) in rellenarMesas" v-bind:key="mesita+index">{{mesita.Mesa}}</option>
              </select>
            </td>
           
          </tr>
          <tr>
            <td>Hora:</td>
            <td v-if="botones==true"><button @click="activarDia()" >Día</button><button @click="activarNoche()">Noche</button></td>
            <td v-if="dia==true"><input type="time"   v-model="hora" min="13:00" max="15:30" name="hora" id="dia"></td>
            <td v-if="noche==true"><input type="time"   v-model="hora" min="20:00" max="23:00" name="hora" id="noche"></td>
          </tr>
          <tr>
            <td><input type="text" id="codigoG" name="codigo" v-model="cod" style="display:none"></td>
            <td> <input type="submit" class="butini"></td>
            <td><input type="text" id="fecReal" name="fecha"  style="display:none"></td>
          </tr>
        </table>

        </form>


      </div>
    </div>

  </div>
</template>

<script>

import {db} from "../db.js"
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
init("user_AXIUM8R4H6yDduZ2S0D9z");


export default {
  name: "Registrar",
  components: {
 
  },
  data() {
    return {
      usuario: "",
      email: "",
      telefono : "",
      fecha : "",
      hora : "",
      zona: "Comedor",
      personas : 1,
      mesa : sessionStorage.Mesa,
      dia: false,
      noche: false,
      botones: true,
      reservas : [],
      mesas : [],
      cod:"Almendra"
    };
  },
  firestore: {
    reservas: db.collection("Reservas"),
     mesas : db.collection("Mesas")
  },
  computed:{
    actualizarReservas(){
      let res= db.collection("Reservas");
      console.log(res.length);
      return res;
    },
    rellenarMesas(){
      
      let mesas2 = [];
      for(var i=0;i<this.mesas.length;i++){
        if(this.zona==this.mesas[i].Zona){
          mesas2.push(this.mesas[i]);
        }
      }
      this.rellenarmesica();
      return mesas2;
    }
  },
  mounted(){
      var fec = new Date();
      var mes = fec.getMonth()+1;
      if((fec.getMonth()<10) || (fec.getDate()<10)){
          if(fec.getDate()<10){
            this.fecha = fec.getFullYear()+"-0"+mes+"-0"+fec.getDate();
          }else{
            this.fecha = fec.getFullYear()+"-0"+mes+"-"+fec.getDate();
          }
      }else{
          this.fecha = fec.getFullYear()+"-"+mes+"-"+fec.getDate();
      }

  },
  methods: {
      rellenarmesica(){
      if(this.zona=="Comedor"){
        this.mesa="Comedor 1";
      }else if(this.zona=="Terraza 1"){
        this.mesa = "Terraza 1-1";
      }else{
        this.mesa = "Terraza 2-1";
      }
      },
      activarDia(){
        this.botones=false;
        this.dia= true;
        this.hora="14:00";
      },
      activarNoche(){
        this.botones=false;
        this.noche= true;
        this.hora="20:00";
      },
      aplicarReserva(){
        var comp2 = "";
        var cp = 0;
        if(this.reservas.length!=0){
          for(var l=0;l<this.reservas.length;l++){
           var comp = this.reservas[l].id.split("-");
           if(cp<parseInt(comp[1])){
             cp = parseInt(comp[1]);
             comp2="Ref-"+(parseInt(comp[1])+1);
              }
             
          }
        }else{
          comp2="Ref-1";
        }
         
        db.collection("Reservas").doc(comp2).set({
          Personas : this.personas,
          Mesa : this.mesa,
          Hora : this.hora,
          Email : this.email,
          Nombre : this.usuario,
          Telefono : this.telefono,
          Fecha : this.fecha
        })
      },
      sendEmail(e) {
        if((this.telefono!="") && (this.fecha!="") &&(this.usuario!="") && (this.email!="")){
          var poder = 0;
        if(this.telefono.length==9){
          if(this.botones==false){
        for(var i=0;i<this.reservas.length;i++){
          if(this.reservas[i].Fecha==this.fecha){
            if(this.reservas[i].Mesa==this.mesa){
              var hora1 = (this.reservas[i].Hora).split(":"),
                  hora2 = (this.hora).split(":"),
                  t1 = new Date(),
                  t2 = new Date();

                  t1.setHours(hora1[0], hora1[1],0);
                  t2.setHours(hora2[0], hora2[1],0);
                  var hor =0;

                  if(hora1[0]>hora2[0]){
                      hor = hora1[0]-hora2[0];
                  }else{
                    hor = hora2[0]-hora1[0];
                  }
                  if(hor<1.9){
                    poder =1;
                    
                    
                  }else{
                    this.$notify({type:'error', title:'Error', text: 'Debe haber mas de 2 horas entre cada reserva de una mesa'})
                    
                  }
                  
          }
        }
        }
        if((poder!=1) ){
                      this.aplicarReserva();
                      console.log("RENT");

                      var iny = document.getElementById("codigoG");
                      var cp=0;
                      for(var l=0;l<this.reservas.length;l++){
                        var comp = this.reservas[l].id.split("-");
                        if(cp<parseInt(comp[1])){
                          cp= parseInt(comp[1]);
                        }
                        
                      }
                      iny.value = "Ref-"+(cp+1);
                      
                    
                       var ine = document.getElementById("fechEnvia");
                       var feci = ine.value.split("-");
                       var ini = document.getElementById("fecReal");
                       ini.value=feci[2]+"-"+feci[1]+"-"+feci[0];
                      
                       
                      

                    try {
                            emailjs.sendForm('service_s3479g6', 'template_cas8rln', e.target, 'user_AXIUM8R4H6yDduZ2S0D9z',
                            { usuario: this.usuario,
                              fecha: this.fecha,
                              email: this.email,
                              hora: this.hora,
                              codigo :this.cod,
                              telefono: this.telefono,
                              personas: this.personas
                            })

                          } catch(error) {
                            console.log({error})
                          }


                          this.usuario = '', this.email = '', this.telefono = ''
                          this.$notify({ type: 'success', title: 'Reserva aceptada', text: 'Se ha confirmado la reserva, en breves le llegará el correo.'});
                    } else{
                      this.$notify({type:'error', title:'Error', text: 'Escoge dia-noche para la reserva.'})
                    }
         
        }else{
          this.$notify({type:'error', title:'Error', text: 'Escoge otra mesa para la reserva.'})
        }
                 

        }else{
          this.$notify({type:'error', title:'Error', text: 'Pon correctamente el numero de telefono.'})
        }
        

        }else{
          this.$notify({type:'error', title:'Error', text: 'Rellena todos los campos correctamente.'})

        }

      },

  },
};
</script>

<style lang="scss" scope>
@import "../scss/components/_reserva.scss";

</style>
