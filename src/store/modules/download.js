import axios from 'axios'

const actions = {
    async download({}, data){
        try{
            const response = await
            axios.get('download_get')
        } catch (e){

        }
    }
}

export default {
    actions
}
