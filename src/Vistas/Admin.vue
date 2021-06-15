<template>
  <div id="carroAdmin">
    <Heade />
    <div id="carroA">
      <div>
        <h3>Comandero</h3>
    <div class="separar"><h4 >Comandero</h4><a href="https://bar-base.web.app/" target="_blank"><i class="fa fa-cutlery" aria-hidden="true" width="20px"  height="20px"></i></a></div><br>

        <h3>Mesas</h3>
    <div class="separar"><h4 >Mesas</h4><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#mesas"></div>

    <div id="mesas" class="collapse">
        <div v-for="mesa in mesas" v-bind:key="mesa.id" class="com">
            <h4>{{mesa.Mesa}}</h4>
        </div>
    </div>

    <div class="separar"><h4 >Añadir Mesas</h4><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addmesas"></div>

    <div id="addmesas" class="collapse">
        <div class="separar">
            <select id="selectAddMesa" value="">
                <option v-for="zona in zonas" v-bind:key="zona" >{{zona}}</option>
            </select>
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addMesa()">
        </div>
        
    </div>

    <div class="separar"><h4 >Borrar Mesas</h4><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#borrarmesas"></div>
    <div id="borrarmesas" class="collapse">
        <div class="separar">
            <select id="selectBorrarMesa" value="">
                <option v-for="zona in zonas" v-bind:key="zona" >{{zona}}</option>
            </select>
            <i class="fa fa-trash" aria-hidden="true" width="20px"  height="20px" @click="borrarMesa()"> </i>
        </div>
    </div>
    
    <br>
    <h3>Productos</h3>
    <div class="separar"><h4 >Productos</h4><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#productos"></div>

    <div id="productos" class="collapse">
        <div v-for="(producto,index) in productos" v-bind:key="producto.Id" class="com">
            <h4>{{producto.Nombre}}</h4>
            <p>Nombre: <input type="text" :placeholder=producto.Nombre :id="'nomProducto'+index" ></p>
            <p> Descripcion: <input type="text" :placeholder=producto.Descripcion :id="'precioProducto'+index"> </p>
            <p> Categoria:
                <select :id="'selectCategoria'+index" v-model="producto.Categoria">
                    <option v-for="categoria in categorias" v-bind:key="categoria">{{categoria}}</option>
                </select> 
            </p>
            <p>
            <button @click="editarProd(producto,index)">Editar</button>
            <button @click="borrarProd(producto)">Borrar</button>
            </p>
        </div>
    </div>

    <div class="separar"><h4 >Añadir Productos</h4><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addproductos"></div>
    <div id="addproductos" class="collapse">
        <div class="separar">
            <p>Nombre: <input type="text" placeholder="Aqui el nombre..." v-model="nomProducto"> </p>
            <p> Descripcion: <input type="text" placeholder="Descripcion.." v-model="precioProducto"> </p>
            <p> Categoria:
                <select id="selectAddProductos" value="">
                    <option v-for="categoria in categorias" v-bind:key="categoria" >{{categoria}}</option>
                </select> 
            </p>
            
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addProductos()">
        </div>
        
    </div>

    <br>
    <h3>Reservas</h3>
    
    <div class="separar">
        <h4 >Rerservas</h4>
        <select id="optMes" @click="verReservas()"> 
            <option v-for="mes in meses" v-bind:key="mes">{{mes}}</option>
        </select>
        <img @click="verReservas()" src="../Img/drop.png" width="15px"  height="15px" alt="" data-toggle="collapse" data-target="#mes"> 
        
     
    </div>
    <div id="mes" class="" >
        <div class="separar" v-for="(reserva,index) in reserv" v-bind:key="reserva.Nombre+index">
            <p>Nombre: {{reserva.Nombre}} </p>
            <p>Fecha: {{reserva.Fecha}} </p>
            <p>Hora: {{reserva.Hora}} </p>
            <p>Mesa: {{reserva.Mesa}} </p>
            <p>Email: {{reserva.Email}} </p>
            <p>Personas: {{reserva.Personas}} </p>
            <p>Telefono: {{reserva.Telefono}} </p>  
        </div>
        <div class="separar" v-if="reserv.length==0">
            <h3>No hay reservas para este mes</h3>
        </div>
         
    </div>
    
    <br>
     
    <h3>Grafica Reservas</h3>
    <button @click="cambiargrafica">Cambiar gráfica</button>
         <GChart id="grafica"
        :settings="{ packages: ['corechart', 'table', 'map'] }"
        :type="tipoGrafica"  
        :data= "implementarGrafica"
        :options="chartOptions"
    />
      </div>
    </div>
    
    <Foote />
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../db";
import Heade from "../components/Header";
import Foote from "../components/Footer";
import { GChart } from 'vue-google-charts';

export default {
  name: "Carrito",
  components: {
    Heade,
    Foote,
    GChart
  },
  data() {
    return {
      zonas: ['Comedor','Terraza 1','Terraza 2'],
      nomProducto:"",
      meses: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      precioProducto:0,
      tipoGrafica: 'ColumnChart',
      user: null,
      productos: [],
      Nombre: "",
      Precio: 0,
      Cantidad: 0,
      Descripcion: "",
      Url: "",
      NombreEdit: "",
      PrecioEdit: 0,
      CantidadEdit: 0,
      DescripcionEdit: "",
      reservas : [],
      UrlEdit: "",
      IdEdit: "",
      grf:0,
      mesas : [],
      grafica : [],
      reserv : [],
      categorias : ['Tostadas','Infusiones-Cafes','Raciones','Postres','Vegetarianos','Bocadillos-Hamburguesas'],
      chartData: []
      ,
      chartOptions: {
        chart: {
          title: 'Grafica Reservas',
        },
        backgroundColor: {
            fill: '#e6e4e4',
        },
      }
    };
  },
  props: {},
  methods: {
    cambiargrafica(){
        if(this.grf == 0){
            this.grf++;
            this.tipoGrafica='PieChart';
        }else if(this.grf==1){
            this.grf++;
            this.tipoGrafica='LineChart'
        }else{
            this.grf=0;
            this.tipoGrafica='ColumnChart'
        }
    },
    verReservas(){
        this.reserv=[];
        var mes2 = document.getElementById("optMes");
        var mes = mes2.value;
        if(mes=="Enero"){
            for(var i=0;i<this.reservas.length;i++){
                var fech = this.reservas[i].Fecha.split("-");
                if(fech[1]=="01"){
                this.reserv.push(this.reservas[i]);
                }
            }
        }else if(mes=="Febrero"){
        for(var i2=0;i2<this.reservas.length;i2++){
                var fech2 = this.reservas[i2].Fecha.split("-");
                if(fech2[1]=="02"){
                this.reserv.push(this.reservas[i2]);
                }
            }
        }else if(mes=="Marzo"){
        for(var i3=0;i3<this.reservas.length;i3++){
                var fech3 = this.reservas[i3].Fecha.split("-");
                if(fech3[1]=="03"){
                this.reserv.push(this.reservas[i3]);
                }
            }
        }else if(mes=="Abril"){
        for(var i4=0;i4<this.reservas.length;i4++){
                var fech4 = this.reservas[i4].Fecha.split("-");
                if(fech4[1]=="04"){
                this.reserv.push(this.reservas[i4]);
                }
            }
        }else if(mes=="Mayo"){
        for(var i5=0;i5<this.reservas.length;i5++){
                var fech5 = this.reservas[i5].Fecha.split("-");
                if(fech5[1]=="05"){
                this.reserv.push(this.reservas[i5]);
                }
            }
        }else if(mes=="Junio"){
        for(var i6=0;i6<this.reservas.length;i6++){
                var fech6 = this.reservas[i6].Fecha.split("-");
                if(fech6[1]=="06"){
                this.reserv.push(this.reservas[i6]);
                }
            }
        }else if(mes=="Julio"){
        for(var i7=0;i7<this.reservas.length;i7++){
                var fech7 = this.reservas[i7].Fecha.split("-");
                if(fech7[1]=="07"){
                this.reserv.push(this.reservas[i7]);
                }
            }
        }else if(mes=="Agosto"){
        for(var i8=0;i8<this.reservas.length;i8++){
                var fech8 = this.reservas[i8].Fecha.split("-");
                if(fech8[1]=="08"){
                this.reserv.push(this.reservas[i8]);
                }
            }
        }else if(mes=="Septiembre"){
        for(var i9=0;i9<this.reservas.length;i9++){
                var fech9 = this.reservas[i9].Fecha.split("-");
                if(fech9[1]=="09"){
                this.reserv.push(this.reservas[i9]);
                }
            }
        }else if(mes=="Octubre"){
        for(var i10=0;i10<this.reservas.length;i10++){
                var fech10 = this.reservas[i10].Fecha.split("-");
                if(fech10[1]=="10"){
                this.reserv.push(this.reservas[i10]);
                }
            }
        }else if(mes=="Noviembre"){
        for(var i11=0;i11<this.reservas.length;i11++){
                var fech11 = this.reservas[i11].Fecha.split("-");
                if(fech11[1]=="11"){
                this.reserv.push(this.reservas[i11]);
                }
            }
        }else if(mes=="Diciembre"){
        for(var i12=0;i12<this.reservas.length;i12++){
                var fech12 = this.reservas[i12].Fecha.split("-");
                if(fech12[1]=="12"){
                this.reserv.push(this.reservas[i12]);
                }
            }
        }
    },
    addMesa: function(){
        var select = document.getElementById("selectAddMesa");
        
        var ref=0;
        for(var i=0;i<this.mesas.length;i++){

            if(select.value=="Comedor"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].Mesa.substring(8,12))>ref){
                        ref=parseInt(this.mesas[i].Mesa.substring(8,12));  
                    }
                }
            }else{
              
               if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].Mesa.substring(10,12))>ref){
                        ref=parseInt(this.mesas[i].Mesa.substring(10,12));
                    }
                }
            }
        }

        if(select.value=="Comedor"){
         ref = select.value+" "+(ref+1);
        }else{
          ref = select.value+"-"+(ref+1);
        }
        
        
        this.$notify({ type: 'success', title: 'Añadido', text: 'Se ha añadido una mesa en : '+select.value});
        db.collection("Mesas").add({Zona:select.value, Mesa:ref});

    },
    borrarMesa : function(){
        var select = document.getElementById("selectBorrarMesa");
        
        var ref=0;
        for(var i=0;i<this.mesas.length;i++){

            
            if(select.value=="Comedor"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(8,12))>ref){
                        ref=parseInt(this.mesas[i].id.substring(8,12));
                    }
                }
            }else if(select.value=="Terraza 1"){
               if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }else if(select.value=="Terraza 2"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }
        }

        if((select.value=="Barra") || (select.value=="Comedor")){
            ref = select.value+" "+ref;
        }else{
            ref = "Mesa "+ref;
        }
        
        this.$notify({ type: 'success', title: 'Borrado', text: 'Se ha borrado una mesa en : '+select.value});
        db.collection("Mesas").doc(ref).delete();
    },
    addProductos: function(){
        var select = document.getElementById("selectAddProductos");

        var ref=0;
        for(var i=0;i<this.productos.length;i++){
            if(parseInt(this.productos[i].Id.substring(4,7))>ref){
                ref=parseInt(this.productos[i].Id.substring(4,7));
            }
        }
        ref = "Ref-"+(ref+1);
        
        let precio = this.precioProducto;

        console.log(this.nomProducto+" "+select.value+" "+precio);
        db.collection("Carta").add({Id: ref, Nombre: this.nomProducto, Descripcion: precio, Categoria: select.value});
        this.$notify({ type: 'success', title: 'Añadido', text: 'Se ha añadido : '+this.nomProducto});

    },
    editarProd : function(producto,index){
        var select = document.getElementById("selectCategoria"+index);
        var inputNombre = document.getElementById("nomProducto"+index);
        var inputDescripcion = document.getElementById("precioProducto"+index);

        if(inputNombre.value!="" && inputDescripcion.value!=""){
            
            db.collection("Carta").doc(producto.id).update({Categoria: select.value, Nombre: inputNombre.value, Descripcion: inputDescripcion.value, Id: producto.Id});
            this.$notify({ type: 'success', title: 'Editado', text: 'Se ha editado : '+inputNombre.value});

        }
    },
    borrarProd: function(producto){
        this.$notify({ type: 'success', title: 'Borrado', text: 'Se ha borrado: '+producto.Nombre});
        db.collection("Carta").doc(producto.id).delete();
        
    }
  },
  /*Función en el cuál se comprueba si hay un usuario logeado */ 
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  computed:{
    implementarGrafica: function(){
        let valores = [
        ['Mes', 'Reservas'],
        ['Enero', 0],
        ['Febrero', 0],
        ['Marzo', 0],
        ['Abril', 0],
        ['Mayo', 0],
        ['Junio', 0],
        ['Julio', 0],
        ['Agosto', 0],
        ['Septiembre', 0],
        ['Octubre', 0],
        ['Noviembre', 0],
        ['Diciembre', 0]]
        ;
        let val = this.reservas;
        for(var i=0;i<val.length;i++){
            var valor = val[i].Fecha.split("-");
            if(parseInt(valor[1])==1){
                var cant = valores[1][1];
                valores[1][1]= cant + 1;
            }else if(parseInt(valor[1])==2){
                var cant2 = valores[2][1];
                valores[2][1]= cant2 + 1;
            }else if(parseInt(valor[1])==3){
                var cant3 = valores[3][1];
                valores[3][1]= cant3 + 1;
            }else if(parseInt(valor[1])==4){
                var cant4 = valores[4][1];
                valores[4][1]= cant4 + 1;
            }else if(parseInt(valor[1])==5){
                var cant5 = valores[5][1];
                valores[5][1]= cant5 + 1;
            }else if(parseInt(valor[1])==6){
                var cant6 = valores[6][1];
                valores[6][1]= cant6 + 1;
            }else if(parseInt(valor[1])==7){
                var cant7 = valores[7][1];
                valores[7][1]= cant7 + 1;
            }else if(parseInt(valor[1])==8){
                var cant8 = valores[8][1];
                valores[8][1]= cant8 + 1;
            }else if(parseInt(valor[1])==9){
                var cant9 = valores[9][1];
                valores[9][1]= cant9 + 1;
            }else if(parseInt(valor[1])==10){
                var cant10 = valores[10][1];
                valores[10][1]= cant10 + 1;
            }else if(parseInt(valor[1])==11){
                var cant11 = valores[11][1];
                valores[11][1]= cant11 + 1;
            }else if(parseInt(valor[1])==12){
                var cant12 = valores[12][1];
                valores[12][1]= cant12 + 1;
            }
        }
        return valores 
    }
  },
  firestore: {
    productos: db.collection("Carta"),
    mesas : db.collection("Mesas"),
    reservas : db.collection("Reservas")
  },
};
</script>

<style scoped lang="scss">
@import "../scss/components/_admin.scss";
.com{
  display: flex;
  background-color: rgb(230, 228, 228);
  padding: 0.5rem;
  border: solid 1px black;
  flex-wrap:wrap ;
}
.com p{
  margin-left: 0.5rem;
}
.separar {
    display: flex;
    justify-content: space-between;
    background-color: #e6e4e4;
    padding: 0.5rem;
    border: solid 1px black;
    flex-wrap: wrap;

}
.separar img{
    cursor: pointer;
}
a{
    text-decoration: none;
    color:black;
    padding: 0.5rem;
}
#grafica {
      border: solid 1px black;
}
</style>