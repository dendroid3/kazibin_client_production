<template>
  <div class="main-wrapper py-2">
    <v-form class="mt-4 mx-2"
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }"
    v-model="valid"
    :lazy-validation="lazy"
    ref="form">
      <p class="backg d-flex justify-center heading">
        Create A Profile
      </p>
        {{"I am "}} {{getUser.username + '.'}} {{" I am interested in " + interests + "  " +  role + "."}} 
        <span>
          {{"I pay | Enter CPP | "}}
        </span>
        <v-select
          v-if="interests.prepend !== 'other'"
          :items="interests_prepends"
          label="interests"
          v-model="interests.prepend"
          outlined
        ></v-select>
        <v-select
          v-if="interests.prepend !== 'other'"
          :items="interests_roles"
          label="interests"
          v-model="interests.role"
          outlined
        ></v-select>
        <v-text-field 
          outlined
          v-if="interests.prepend === 'other'"
          clearable
          v-model="interests.append"
          type="name"
          label="what then?"
          required
        > </v-text-field>
      <div class="mx-2">  
        <v-select
          :items="best_description"
          label="what best describes you"
          v-model="profile.level"
          outlined
        ></v-select>
      </div>

    <v-file-input
    class="d-none"
    outlined
    id="files"
    multiple
    label="Files"
    accept="image/*,
    application/pdf,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    application/msword"
    ></v-file-input>
      <v-row class="mx-2 no-gutters d-flex" v-if="profile && ((profile.level == 'post highschool student')||(profile.level == 'post highschool graduant'))">
        <v-col class="col-4"> 
          <v-select
            :items="course_prepends"
            label="disc"
            v-model="course.prepend"
            outlined
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field 
            outlined
            clearable
            v-model="course.append"
            type="name"
            label="course name"
            required
          > </v-text-field>
        </v-col>
      </v-row>
      <div class="mx-2">
        <v-textarea 
        outlined
        type="name"
        :value="`dfg`"
        v-model="profile.bio"
        label="biolkjkj"
        required
        > </v-textarea>  
      </div>
      
      <div class="d-flex justify-center">
        <v-btn 
        @click="submitProfile"
        small 
        class="rounded success submit-button"
        :disabled="!valid">
          submit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateProfile',
  computed:{
    ...mapGetters(['getUser'])
  },
  data () {
    return {
      valid: true,
      lazy: false,
      profile: {},
      course: {},
      interests: {},
      best_description: ['highschool graduant', 'post highschool student', 'post highschool graduant'],
      course_prepends: ['BA', 'BEd', 'BSc', 'MBA', 'BEng'],
      interests_prepends: ['biology', 'mathematics', 'chemistry', 'business', 'english and literature', 'physics', 'sociology', 'other'],
      interests_roles: ['writers', 'tasks'],   
      role: null
    }
  },
  methods: {
    ...mapActions(['createProfile']),
    submitProfile(){
      if((this.profile.level == 'post highschool student')||(this.profile.level == 'post highschool graduant')){
        this.profile.course = this.course.prepend + '( ' + this.course.append + ' )'
      }
      this.createProfile(this.profile)
    },
    async boot(){
      try{
        await this.setInterests()
        await this.setRole()
        if(this.role == 'writers'){
          await this.setCPP("I am " + this.getUser.username + ". I am interested in, " + this.interests + " " + this.role + ". \n\n -- Enter CPP:: ")
          await this.enterSamples("I am " + this.getUser.username + ". I am interested in, " + this.interests + " " + this.role + ". I pay a minimum of " + this.cpp + 
          "KES per page. \n\n -- Would you like to provide some samples of the tasks you usually get? ")
        } else {
          await this.setCPP("I am " + this.getUser.username + ". I am interested in, " + this.interests + " " + this.role + ". \n\n -- Enter CPP:: ")
        }
        // alert(this.interests)
        this.openFileSelect()

      } catch(e){
      }
    },
    setInterests(){
      let prompt_message = "I am " + this.getUser.username + ". I am interested in, \n -- Enter your subjects/interests/courses/expertise:: "
      let interests = "biology, mathematics, chemistry, business, english and literature, physics, sociology, other"

      let interests_entered = prompt(prompt_message, interests);

      if (interests_entered == null || interests_entered == "") {
        text = "User cancelled the prompt.";
      } else {
        this.interests = interests_entered
      }
    },
    setRole(){
      let roles = "tasks or writers?"
      let prompt_message = "I am " + this.getUser.username + ". I am interested in, " + this.interests
       + "\n\n -- Enter either `tasks` or  `writers` explicitly. \n\n You will get both, It is meant for initial identification to better achieve your goal. |"

      let role_entered = prompt(prompt_message, roles);

      if (role_entered != "tasks" && role_entered != "writers") {
        // alert('lkjh')
        this.setRole();
      } else {
        this.role = role_entered
        return true
      }
    },
    setCPP(prompt_message){

      let cpp_entered = prompt(prompt_message, 300);
      this.cpp = cpp_entered

    },
    enterSamples(prompt_message){
      if(confirm(prompt_message)){
        this.openFileSelect()
      }
    },
    
    openFileSelect(){
      document.getElementById('files').click()
    },
  },
  mounted(){
    this.boot()
  }
}
</script>
