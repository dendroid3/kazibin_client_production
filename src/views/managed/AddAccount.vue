<template>
    <div class="main-wrapper" :class="{
        'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
        'medium-width col-6 offset-3':  $vuetify.breakpoint.md,
        'large-width col-6 offset-3':  $vuetify.breakpoint.lg,
    }">
      <p class="primary-color-text form-title d-flex justify-start px-2">
          {{ "Send Management Request" }} 
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
            v-model="account.provider"
            label="account provider"
            required
            > </v-text-field>  
        </div>
        <div>
            <v-text-field 
            clearable
            outlined
            type="text"
            v-model="account.provider_identifier"
            hint="ID given by the provider."
            label="account ID"
            :disabled="!account.provider"
            required
            > </v-text-field>
        </div>
        <div>
            <v-text-field 
            clearable
            outlined
            type="text"
            v-model="account.email"
            hint="Email used to register the account."
            label="email"
            :disabled="!account.provider_identifier"
            required
            > </v-text-field>  
        </div>
        <div>
            <v-select
            :items="country_list"
            label="profile origin"
            :disabled="!account.email"
            v-model="account.proxy"
            required
            outlined
            ></v-select>
        </div>
        <div class="d-flex justify-center">
            <v-btn 
            :loading="loading"
            small 
            @click="submit"
            :disabled="!account.proxy"
            class="rounded success submit-button"
            >
                submit
            </v-btn>
        </div>
        
      </v-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: "AddAccount",
    data(){
        return{
        valid: false,
        lazy: false,
        account: {
            provider: null,
            provider_identifier: null,
            email: null,
            proxy: null
        },
        loading: false,
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

    methods: {
        ...mapActions('Managed', ['addAccount']),
        submit(){
            this.loading = true;
            this.addAccount(this.account)
            .then(()=>{
                this.loading = false;
                this.$router.push({name: 'MyManaged'});
            })
            .catch(()=>{
                this.loading = false;
            })
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
