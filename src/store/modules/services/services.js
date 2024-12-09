import axios from "axios";

const state = {
    services: null,
    cart_items: []
}

const getters = {
    getServices: (state) => (state.services),
    getCartItems: (state) => (state.cart_items)
}

const actions = {
    async fetchServices({commit}){
        try {
            const response = await 
            axios.get('services/get')
            console.log(response.data)
            commit('SET_SERVICES', response.data)
        } catch (err) {
            console.log(err)
        }
    },

    addItemToCart({commit, getters}, data){
        let items = getters.getCartItems
        console.log(items)
        items.push(data)
        commit('SET_ITEMS_IN_CART', items)
    }
}

const mutations = {
    SET_SERVICES: (state, services) => (state.services = services),
    SET_ITEMS_IN_CART: (state, items) => (state.cart_items = cart_items)
}

export default {
    state, getters, actions, mutations
}
