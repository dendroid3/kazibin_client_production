<template lang="html">
<v-form class="full-width mt-4 mx-2"
  v-model="valid"
  :lazy-validation="lazy"
  ref="form">
  <div class="d-flex">
    <v-file-input
    outlined
    hint="Documents and what nots"
    multiple
    @change="registerFiles"
    label="Files"
    accept="image/*,
    application/pdf,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    application/msword"
    ></v-file-input>
  </div>
  <div class="d-flex justify-center">
    <v-btn 
    small 
    :loading="loading"
    class="rounded success submit-button"
    @click="submit"
    :disabled="!formdata">
      submit
    </v-btn>
  </div>
  <div class="d-flex justify-center mt-2">
    <v-btn 
    small 
    class="rounded grey white--text submit-button">
      learn more
    </v-btn>
  </div>
</v-form>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'Two',
  
  computed:{
    ...mapGetters(['getStepOneResponse'])
  },

  data(){
    return{
      valid: true,
      lazy: false,
      formdata: null,
      loading: false
    }
  },

  methods:{
    ...mapActions(['stepTwo']),
    registerFiles(event){
      var fd = new FormData()
      let files = event.length
      for (let i = 0; i < files; i++) {
          fd.append('documents[]', event[i])
      }
      this.formdata = fd;
    },
    submit(){
      this.loading = true
      this.formdata.append('task_id', this.getStepOneResponse.id)
      this.stepTwo(this.formdata).then((res) => {
        this.loading = res
      })
    }
  }
}
</script>

