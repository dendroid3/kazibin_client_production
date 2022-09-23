import axios from "axios";
import router from "../../../router";

const state = {}

const getters = {}

const actions = {
    async initialiseVerification({dispatch}, data){
        try{
            const response = await
            axios.post('initialise_verification', data)
            console.log(response)

            if(response.status == 201){
                dispatch('openAlert', {message: response.data.error, code: 'info', timeout: 5000}, {root: true})
            } else if(response.status == 202){
                dispatch('openAlert', {message: response.data.error, code: 'error', timeout: 5000}, {root: true})
            } else if(response.status == 200) {
                dispatch('openAlert', {message: response.data, code: 'success', timeout: 5000}, {root: true})
                router.push('/dashboard')
            }
        } catch(e){
            console.log(e)
        }
    }
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}
