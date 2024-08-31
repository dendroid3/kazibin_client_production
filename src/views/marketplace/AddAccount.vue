<template>
    <div class="main-wrapper" :class="{
        'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
        'medium-width col-6 offset-3':  $vuetify.breakpoint.md,
        'large-width col-6 offset-3':  $vuetify.breakpoint.lg,
    }">
    <p class="primary-color-text form-title d-flex justify-start px-2">
        {{ "Post Writing Account" }} 
    </p>
    <v-form class="mt-4 px-4"
    v-model="valid"
    :lazy-validation="lazy"
    ref="form">
        <div>
            <v-text-field 
            clearable
            outlined
            type="text"
            v-model="account.title"
            label="account provider"
            required
            > </v-text-field>  
        </div>
    </v-form>
    </div>
</template>
<script>
export default {
    name: "AddAccount",
    data(){
        return{
        valid: true,
        lazy: false,
        account: {},
        loading: false
        }
    },
}
</script>
<style lang="css" scoped>
.bottom{
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
}

div{
  font-family: dosis;
}
.form-title{
  font-size: 2rem;
  font-weight: 300;
  width: 100vw;
}
.stripped{
  background-color: #E0E0E0;
}
.stripped:nth-child(even){
  background-color:#F5F5F5;
}
.main-wrapper{
  padding-bottom: 5rem;
  /* margin-right: 40rem; */
  overflow-x: hidden;
}
</style>
