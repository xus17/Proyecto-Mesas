<template>
  <div>
    <Heade />
    <div class="login">
      <div class="login2">
        <form @submit.prevent="editar"> 
        <h4>Editar</h4>
          <table>
          <tr>
            <td>Usuario:</td>
            <td><input type="text" v-model="usuario" name="usuario" placeholder="Aqui el nombre.." required></td>
          </tr>
          <tr>
            <td>Mesa: </td>
            <td><select v-model="zona">
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
            <td>Teléfono:</td>
            <td><input type="number" v-model="telefono" name="telefono" placeholder="Aqui el telefono.." required></td>
          </tr>
          <tr>
            <td>Personas:</td>
            <select id="optPersonas" name="personas" v-model="personas">
              <option >1</option>
              <option >2</option>
              <option >3</option>
              <option >4</option>
              <option >5</option>
              <option >6</option>
            </select>
          </tr>
          <tr >
            <td>Fecha:</td>
            <td><input type="date" id="start" name="fecha" v-model="fecha"  :min="fecha" max="2022-12-31"></td>
          </tr>
          <tr >
            <td>Hora:</td>
            <td v-if="botones==true"><button @click="activarDia()" >Día</button><button @click="activarNoche()">Noche</button></td>
            <td v-if="dia==true"><input type="time"   v-model="hora" min="13:00" max="15:00" name="hora" id="dia"></td>
            <td v-if="noche==true"><input type="time"   v-model="hora" min="20:00" max="23:00" name="hora" id="noche"></td> 
          </tr>
          <tr>
            <td><input type="text" v-model="codigo" name="codigo" style="display:none"></td>
            <td><input type="text" id="emailD" name="email" v-model="emaail" style="display:none" ></td>
            <td><button><i class="fa fa-edit" aria-hidden="true"></i></button></td>
          </tr>
        </table>
        </form>
      </div>
      <div class="login2">
        <form @submit.prevent="borrar"> 
          <h4 >Borrar</h4>
          <table>
          <tr>
            <td></td>
            <td><input type="text" v-model="codigo2" name="codigo" style="display:none"></td>
            <td></td>
          </tr>
          <tr>
            <td><input type="text" id="emailC" name="email" v-model="emaail" style="display:none"></td>
            <td><button type="submit"><i class="fa fa-trash" aria-hidden="true"> </i></button></td>
            <td ></td>
          </tr>
        </table>
        </form>
        
      </div>
    </div>
    <Foote />
  </div>
</template>

<script>
import Heade from "../components/Header";
import Foote from "../components/Footer";
import {db} from "../db.js";
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
init("user_eoWfQRQaoit12V2LUYhYO");

export default {
  name: "editarborrar",
  components: {
    Heade,
    Foote
  },
  data() {
    return {
      codigo: sessionStorage.codigo,
      usuario: "",
      zona:"Comedor",
      codigo2: sessionStorage.codigo,
      fecha: "",
      hora:"",
      mesa: "",
      emaail:sessionStorage.email,
      telefono: "",
      personas:1,
      dia:false,
      noche:false,
      botones: true,
      edit: "false",
      bor: "false",
      mesas:[],
      reservas: []
    };
  },
  firestore: {
      reservas: db.collection("Reservas"),
      mesas : db.collection("Mesas")
  },
  mounted(){
      this.edit= sessionStorage.Editar;
      this.bor = sessionStorage.Borrar;
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
      borrar(e){

        
          if(this.codigo2!=""){
            var borrado = false;
            for(var i=0;i<this.reservas.length;i++){
              if(this.codigo2==this.reservas[i].id){
                    borrado=true;
              }
            }
            if(borrado!=true){
                this.$notify({ type: 'error', title: 'Error', text: 'No se ha encontrado la reserva, por favor pon el código correcto.'}); 
            }else{
              this.$confirm({
                title: 'Borrar Reserva',
                message: `¿Seguro que deseas borrar?`,
                button: {
                  yes: 'Sí',
                    no: 'No'
                    
                },
                /**
                 * Función callback
                 * @param {Boolean} confirmar
                 */
                callback: confirmar => { 
                    if (confirmar) {
                       db.collection("Reservas").doc(this.codigo2).delete();
                    this.$notify({ type: 'success', title: 'Borrado', text: 'Se ha borrado correctamente.'}); 
                    this.$router.push("/");
                    var iny = document.getElementById("emailC");
                          for(var l=0;l<this.reservas.length;l++){
                            if(this.codigo2==this.reservas[l].id){
                            iny.value = this.reservas[l].Email;
                            }
                            
                          }
                    try {
                                emailjs.sendForm('service_m05z0s9', 'template_wt0n59q', e.target, 'user_eoWfQRQaoit12V2LUYhYO',
                                { 
                                  email : this.emailC,
                                })

                              } catch(error) {
                                console.log({error})
                              }
                        }else{
                              this.$notify({ type: 'error', title: 'Cancelado', text: 'No se ha borrado. '}); 
                        }
                    }});
                    
                }
          }else{
              this.$notify({ type: 'error', title: 'Error', text: 'Rellena el campo código para borrar.'}); 
          }
          
      },
      confirmareditar(email,nombre,telefono,e){
         this.$confirm({
                title: 'Editar reserva',
                message: `¿Seguro que quieres editarlo?`,
                button: {
                    no: 'No',
                    yes: 'Sí'
                },
                /**
                 * Función callback
                 * @param {Boolean} confirmar
                 */
                callback: confirmar => { 
                    if (confirmar) {
                      db.collection("Reservas").doc(this.codigo).set({
                                        Mesa : this.mesa,
                                        Hora : this.hora,
                                        Email : email,
                                        Nombre : nombre,
                                        Telefono : telefono,
                                        Fecha : this.fecha,
                                        Personas: this.personas
                });
                
                 this.$notify({ type: 'success', title: 'Editado', text: 'Se ha editado correctamente.'}); 
                 this.$router.push("/");
                 try {
                            emailjs.sendForm('service_m05z0s9', 'template_jjt94n8', e.target, 'user_eoWfQRQaoit12V2LUYhYO',
                            {   personas: this.personas,
                            telefono : this.telefono,
                            hora: this.hora,
                            fecha : this.fecha    })

                          } catch(error) {
                            console.log({error})
                          }
                    }else   {
                       this.$notify({ type: 'error', title: 'Cancelado', text: 'No se ha editado. '}); 
                    }
                  }
                })
                
            
            
           
      },
      
      editar(e){
        if((this.botones==false) && (this.codigo!="") && (this.mesa!="") ){
            var editando = false;
            var editandomesa = false;
            for(var j=0;j<this.mesas.length;j++){
                if(this.mesa==this.mesas[j].Mesa){
                    editandomesa=true;
                    
                }
            }
            if(editandomesa==true){
                for(var i =0;i<this.reservas.length;i++){
                if(this.codigo==this.reservas[i].id){
                    editando = true;
                }
            }
            if(editando){
                for(var d=0;d<this.reservas.length;d++){
                    if(this.codigo==this.reservas[d].id){
                        if(this.reservas[d].Fecha==this.fecha){
                            if(this.reservas[d].Mesa==this.mesa){
                                if(this.reservas[d].Hora!=this.hora){
                                    var hora1 = (this.reservas[d].Hora).split(":"),
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
                                    
                                   
                                    if(hor>1){
                                        this.confirmareditar(this.reservas[d].Email,this.reservas[d].Nombre,this.reservas[d].Telefono,e);

                                    }else{
                                    this.$notify({ type: 'error', title: 'Error', text: 'Tiene que haber unas dos horas entre reservas en la misma mesa.'});                                        
                                    }
                                    
                                }else{
                                    this.$notify({ type: 'error', title: 'Error', text: 'Ya hay una reserva a la misma hora en la misma mesa, no puede ser.'}); 
                                }
                        }else{
                          this.confirmareditar(this.reservas[d].Email,this.reservas[d].Nombre,this.reservas[d].Telefono,e);

                        }
                        
                    }else{
                       this.confirmareditar(this.reservas[d].Email,this.reservas[d].Nombre,this.reservas[d].Telefono,e);

                    }
                    }
                    
                }
            }
            }else{
              this.$notify({ type: 'error', title: 'Error', text: 'Introduce una mesa correctamente.'}); 
            }
            
        }else{
             this.$notify({ type: 'error', title: 'Error', text: 'Rellena todos los campos.'}); 
        }
      },
      rellenarmesica(){
      if(this.zona=="Comedor"){
        this.mesa="Comedor 1";
      }else if(this.zona=="Terraza 1"){
        this.mesa = "Terraza 1-1";
      }else{
        this.mesa = "Terraza 2-1";
      }}
    },
    computed:{
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
    }
    
  
  
};
</script>

<style lang="scss" scope >
@import "../scss/components/_login.scss";
</style>