<template>
  <div class="main-wrapper py-2">
    <v-form class="full-width mt-4 mx-2"
    v-model="valid"
    :lazy-validation="lazy"
    ref="form">
      <p class="backg d-flex justify-center heading">
        Create A Profile
      </p>

      <div class="mx-2">  
        <v-select
          :items="best_description"
          label="what best describes you"
          v-model="profile.level"
          outlined
        ></v-select>
      </div>

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
        v-model="profile.bio"
        label="bio"
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
import { mapActions } from 'vuex'
export default {
  name: 'CreateProfile',
  data () {
    return {
      valid: true,
      lazy: false,
      profile: {},
      course: {},
      best_description: ['highschool graduant', 'post highschool student', 'post highschool graduant'],
      course_prepends: ['BA', 'BEd', 'BSc', 'MBA', 'BEng']
    }
  },
  methods: {
    ...mapActions(['createProfile']),
    submitProfile(){
      if((this.profile.level == 'post highschool student')||(this.profile.level == 'post highschool graduant')){
        console.log('adding course')
        this.profile.course = this.course.prepend + '( ' + this.course.append + ' )'
      }
      console.log('submitting')
      console.log(this.profile)
      this.createProfile(this.profile)
    }
  }
}
</script>
