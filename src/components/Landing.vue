<template>
       <div id="carouselId" class="carousel slide" data-ride="carousel">
         <ol class="carousel-indicators">
           <li data-target="#carouselId" data-slide-to="0" class="active"></li>
           <li data-target="#carouselId" data-slide-to="1"></li>
           <li data-target="#carouselId" data-slide-to="2"></li>
         </ol>
         <div class="carousel-inner" role="listbox">
           <div class="carousel-item active">
             <img class="img3" data-src="holder.js/900x500/auto/#777:#555/text:First slide" alt="First slide" src="../Img/resta1.png">
             <div class="carousel-caption d-none d-md-block">
             </div>
           </div>
           <div class="carousel-item">
             <img class="img3" data-src="holder.js/900x500/auto/#666:#444/text:Second slide" alt="Second slide" src="../Img/resta2.png">
             <div class="carousel-caption d-none d-md-block">
               
             </div>
           </div>
           <div class="carousel-item">
             <img class="img2" data-src="holder.js/900x500/auto/#666:#444/text:Third slide" alt="Third slide" src="../Img/resta3.png" >
             <div class="carousel-caption d-none d-md-block">
             </div>
           </div>
         </div>
         <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
           <span class="sr-only">Previous</span>
         </a>
         <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
           <span class="carousel-control-next-icon" aria-hidden="true"></span>
           <span class="sr-only">Next</span>
         </a>

       </div>

       

        
 
</template>

<script>
export default {
    name: 'Landing',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
  
  #carouselId{
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url("https://wallpaperaccess.com/full/1156778.jpg");
    background-size: cover;
  }
  .logo{
    position: absolute;
    right: 40vw;
    top:20vh;
    filter: brightness(1);
  }
  .img1, .img2, .img3{
    width: 100vw;
    height: 100vh;
  }

@media (max-width: 700px) {
    .img1, .img2, .img3{
        height: 50vh;
    }
     #carouselId{

    height: 50vh;

  }
}
@media (min-width: 700px) and (max-width: 900px){
    .img1, .img2, .img3{
        height: 50vh;
    }
     #carouselId{

    height: 50vh;

  }
}
@media (min-width: 900px) and (max-width: 1200px) {
    .img1, .img2, .img3{
        height: 70vh;
    }
     #carouselId{

    height: 70vh;

  }
}
</style>