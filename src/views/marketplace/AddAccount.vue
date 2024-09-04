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
          hint="E.g: WritersBay, UvoCorp, 4Writers, e.t.c"
          v-model="account.title"
          label="account provider"
          required
          > </v-text-field>  
      </div>
      <div>
          <v-select
          :items="country_list"
          label="profile origin"
          :disabled="!account.title"
          v-model="account.profile_origin"
          required
          outlined
          ></v-select>
      </div>
      <div>
          <v-select
          :items="['male', 'female']"
          label="profile gender"
          :disabled="!account.profile_origin"
          v-model="account.profile_gender"
          required
          outlined
          ></v-select>
      </div>
      <div>
          <v-text-field 
          clearable
          outlined
          type="number"
          :disabled="!account.profile_gender"
          v-model="account.total_orders"
          label="total orders"
          required
          > </v-text-field>  
      </div>
      <div>
          <v-text-field 
          clearable
          outlined
          type="number"
          :disabled="!account.total_orders"
          v-model="account.pending_orders"
          label="pending orders"
          required
          > </v-text-field>  
      </div>
      <div>
          <v-text-field 
          clearable
          outlined
          type="number"
          :disabled="!account.pending_orders"
          :rules="rules.less_than_100"
          v-model="account.rating"
          label="percentage rating"
          required
          > </v-text-field>  
      </div>
      <div>
          <v-text-field 
          clearable
          outlined
          type="number"
          :disabled="!account.rating"
          v-model="account.cost"
          label="cost"
          required
          > </v-text-field>  
      </div>
                               
      <div class="d-flex justify-center">
          <v-file-input
          outlined
          :disabled="!account.cost"
          @change="registerScreenshots"
          v-model="account_screenshots"
          hint="Clear screenshots of the account dashboard."
          multiple
          label="account screenshots"
          accept="image/*"
          ></v-file-input>
      </div>
      <div>
          <v-checkbox
          required
          v-model="account.negotiable"
          :label="`Negotiable`"
          ></v-checkbox>
      </div>

      <div class="d-flex justify-center">
          <v-btn 
          :loading="loading"
          small 
          @click="submit"
          :disabled="!account.cost"
          class="rounded success submit-button"
          >
              submit
          </v-btn>
      </div>
      
    </v-form>
    </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';

export default {
    name: "AddAccount",
    data(){
        return{
        valid: false,
        lazy: false,
        account: {
          negotiable: true
        },
        loading: false,
        rules: {
          less_than_100: [
            v => (Number(v) < 100) || 'Rating cannot be more than 100%'
          ]
        },
        account_screenshots: null,
        formdata: null,
        country_list: [
            "USA",
            "UK",
            "Canada",
            "Kenya",
            "Afghanistan",
            "Albanian",
            "Algeria",
            "American Samoa",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antarctica",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas (the)",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia (Plurinational State of)",
            "Bonaire, Sint Eustatius and Saba",
            "Bosnia and Herzegovina",
            "Botswana",
            "Bouvet Island",
            "Brazil",
            "British Indian Ocean Territory (the)",
            "Brunei Darussalam",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cabo Verde",
            "Cambodia",
            "Cameroon",
            "Cayman Islands (the)",
            "Central African Republic (the)",
            "Chad",
            "Chile",
            "China",
            "Christmas Island",
            "Cocos (Keeling) Islands (the)",
            "Colombia",
            "Comoros (the)",
            "Congo (the Democratic Republic of the)",
            "Congo (the)",
            "Cook Islands (the)",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Curaçao",
            "Cyprus",
            "Czechia",
            "Côte d'Ivoire",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic (the)",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Eswatini",
            "Ethiopia",
            "Falkland Islands (the) [Malvinas]",
            "Faroe Islands (the)",
            "Fiji",
            "Finland",
            "France",
            "French Guiana",
            "French Polynesia",
            "French Southern Territories (the)",
            "Gabon",
            "Gambia (the)",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Heard Island and McDonald Islands",
            "Holy See (the)",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran (Islamic Republic of)",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kiribati",
            "Korea (the Democratic People's Republic of)",
            "Korea (the Republic of)",
            "Kuwait",
            "Kyrgyzstan",
            "Lao People's Democratic Republic (the)",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macao",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands (the)",
            "Martinique",
            "Mauritania",
            "Mauritius",
            "Mayotte",
            "Mexico",
            "Micronesia (Federated States of)",
            "Moldova (the Republic of)",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands (the)",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger (the)",
            "Nigeria",
            "Niue",
            "Norfolk Island",
            "Northern Mariana Islands (the)",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestine, State of",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines (the)",
            "Pitcairn",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Republic of North Macedonia",
            "Romania",
            "Russian Federation (the)",
            "Rwanda",
            "Réunion",
            "Saint Barthélemy",
            "Saint Helena, Ascension and Tristan da Cunha",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Martin (French part)",
            "Saint Pierre and Miquelon",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten (Dutch part)",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Georgia and the South Sandwich Islands",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "Sudan (the)",
            "Suriname",
            "Svalbard and Jan Mayen",
            "Sweden",
            "Switzerland",
            "Syrian Arab Republic",
            "Taiwan",
            "Tajikistan",
            "Tanzania, United Republic of",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tokelau",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks and Caicos Islands (the)",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates (the)",
            "United States Minor Outlying Islands (the)",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela (Bolivarian Republic of)",
            "Viet Nam",
            "Virgin Islands (British)",
            "Virgin Islands (U.S.)",
            "Wallis and Futuna",
            "Western Sahara",
            "Yemen",
            "Zambia",
            "Zimbabwe",
            "Åland Islands"
        ]
        }
    },

    computed: {
      ...mapGetters(['getDashboadDetails'])
    },

    methods: {
      ...mapActions(['intitiateRequestToDeposit', 'addAccount']),

      registerScreenshots(event){
          var fd = new FormData()
          let files = event.length

          var files_array = []

          for (let i = 0; i < files; i++) {
              console.log(event[i])
              files_array.push(event[i])
              fd.append('screenshots[]', event[i])
          }

          this.formdata = fd;
      },

      submit() {
        if(this.getDashboadDetails.transactions.balance < process.env.VUE_APP_ACCOUNT_DISPLAY_COST) {
            const required_amount = process.env.VUE_APP_ACCOUNT_DISPLAY_COST - this.getDashboadDetails.transactions.balance;
            const intitiate_request_to_deposit_data = {
            action: "advertise writing account",
            required_amount: required_amount
            }
            this.intitiateRequestToDeposit(intitiate_request_to_deposit_data)
            
            return
        }

        const confirmation = 'Ensure that the files provided are correct.'

        if(!confirm(confirmation)) { return }

        this.loading = true

        if(!this.formdata){
          var fd = new FormData()
          this.formdata = fd;
        }

        this.formdata.append('account', JSON.stringify(this.account))

        this.addAccount(this.formdata).then(() => (
            this.loading = false,
            setTimeout(() => {
              this.$router.push('/accounts')
            }, 1000)
        ))
      }
    }
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
