<template>
  <div id="home">
    <div v-if="productos">
      <Heade />
      <Landing />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#313D43" fill-opacity="1" d="M0,288L26.7,288C53.3,288,107,288,160,250.7C213.3,213,267,139,320,101.3C373.3,64,427,64,480,64C533.3,64,587,64,640,90.7C693.3,117,747,171,800,213.3C853.3,256,907,288,960,293.3C1013.3,299,1067,277,1120,240C1173.3,203,1227,149,1280,122.7C1333.3,96,1387,96,1413,96L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>      <Carta  v-if="!Inicio" />
      <Reserva id="reservagg" v-if="!Inicio" />
      <SobreNosotros  id="sobrenosotrosgg" />
      <svg style="padding-top:-2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#313D43" fill-opacity="1" d="M0,288L26.7,288C53.3,288,107,288,160,250.7C213.3,213,267,139,320,101.3C373.3,64,427,64,480,64C533.3,64,587,64,640,90.7C693.3,117,747,171,800,213.3C853.3,256,907,288,960,293.3C1013.3,299,1067,277,1120,240C1173.3,203,1227,149,1280,122.7C1333.3,96,1387,96,1413,96L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
      <Foote v-if="!Inicio" />
    </div>
  </div>
</template>


<script>
import Heade from "./Header";
import Landing from "./Landing";
import Carta from "./Carta";
import Reserva from "../Vistas/Reserva";
import SobreNosotros from "../Vistas/SobreNosotros";
import Foote from "./Footer";

export default {
  name: "Home",

  components: {
    Heade,
    Carta,
    Reserva,
    Foote,
    Landing,
    SobreNosotros
  },

  data() {
    return {
      productos: [],
      articulos: [],
      Inicio: false,
      user: null,
    };
  },

  firestore: {
    
  },
  computed: {},
  methods: {

  },
  mounted(){
    sessionStorage.admin=true;
  },
  created(){
    sessionStorage.Borrar="false";
    sessionStorage.Editar = "false";
    
  }
};
</script>

<style scoped lang="scss">
  #reservagg, #sobrenosotrosgg{
    padding-top: 8rem;
  }
</style>