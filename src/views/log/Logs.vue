<template lang="html">
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-12 pl-4 backg"> activity log
            </v-col>
        </v-row>

        <v-row class="pa-2 bold no-gutters">
            <v-col class="col-4 px-1">
                <div class="grey lighten-2 rounded elevation-1 pointer">
                    <div class="d-flex justify-center black--text bold">
                        tasks
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 black--text">
                        <span> {{0}} </span>
                    </div>
                </div>
            </v-col>
            
            <v-col class="col-4 px-1">
                <div class="grey lighten-2 rounded elevation-1 pointer">
                    <div class="d-flex justify-center bold">
                        offers
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{0}}  </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 px-1">
                <div class="grey lighten-2 rounded elevation-1 pointer">
                    <div class="d-flex justify-center bold">
                        bids
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{0}}  </span>
                    </div>
                </div>
            </v-col>
        </v-row>

    </div>
</template>
<script>
export default {
    name: 'Logs'
}
</script>
    
<style lang="css" scoped>
.main-wrapper{
  overflow-x: hidden;
}
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .col-block{
    position: relative;
  }
  .col-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
   .username{
    font-weight: 900;
    font-size: 1.2rem;
  }

  .padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: tada; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
    animation-iteration-count: 3;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 3rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  .backgs{
    background-color: rgb(15,14,56);
  }
  .bold{
    font-weight: 900;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
  .list{
    background-color: rgb(231, 231, 231); 
    border-left: solid 20px red;
  }
  .usn-block{
    position: relative;
  }
  .usn-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .redtext{
    color: red;
  }
  .purpletext{
    color: purple;
  }
  .greentext{
    color: green;
  }
  .yellowtext{
    color: yellow;
  }
</style>