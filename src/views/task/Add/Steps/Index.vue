<template lang="html">
<v-form class="mt-4 px-4"

v-model="valid"
:lazy-validation="lazy"
ref="form">
  <div>
    <v-text-field 
    clearable
    outlined
    type="name"
    v-model="task.code"
    :rules="rules.NoSpaces"
    hint="Suppose you got the task from another platform where tasks are identified with code, you can input it here. This is optional, we will assign your task a code if you have none"
    label="code(optional)"
    > </v-text-field>  
    <v-text-field 
    clearable
    outlined
    type="name"
    v-model="task.topic"
    hint="This is the intended title of the task. Eg: Analysis of Devient Behaviors"
    label="topic"
    required
    > </v-text-field>  
  </div>
  <div>
    <v-text-field 
    clearable
    outlined
    :disabled="!task.topic"
    :rules="rules.Required"
    hint="This is the course or subject of the task. Eg: Psychology"
    type="name"
    v-model="task.unit"
    label="unit"
    required
    > </v-text-field>  
  </div>
  <div>
    <v-select
      :disabled="!task.unit"
      :rules="rules.Required"
      :items="task_types"
      hint="Eg: Essay"
      label="type"
      v-model="task.type"
      outlined
    >
    </v-select>
  </div>
  <div>
    <v-textarea 
    outlined
    type="name"
    :disabled="!task.type"
    :rules="rules.Required"
    hint="Any guidlines for the job. Eg: The client requests that the writer must score at least an 80% on this task."
    v-model="task.instructions"
    label="instructions"
    required
    > </v-textarea>  
  </div>
  {{getStepOneErrors}}
  <div class="d-flex justify-center">
    <v-btn 
    :loading="loading"
    @click="submit"
    small 
    class="rounded success submit-button"
    :disabled="!valid">
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
  name: 'Index',
  computed:{
    ...mapGetters(['getStepOneErrors'])
  },
  data(){
    return{
      valid: true,
      lazy: false,
      task: {},
      task_types: ['Essay', 'Report', 'Review', 'Article', 'Blog', 'Resumes', 'Captioning', 'Programming'],
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ], 
        NoSpaces: [
          v => (v.split(" ").length == 1) || 'Task identifing code cannot have spaces'
        ]
      },
      loading: false
    }
  },
  methods:{
    ...mapActions(['stepOne']),
    submit(){
      this.loading = true
      this.stepOne(this.task).then((res) => {this.loading = res})
    },
  }
}
</script>
