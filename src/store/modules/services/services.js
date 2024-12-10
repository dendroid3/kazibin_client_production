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

    addItemToCart({commit, getters, dispatch}, data){
        let items = getters.getCartItems;

        // Check if the item already exists in the cart
        const exists = items.some(item => item.name === data.name);

        if (!exists) {
            // If the item doesn't exist, add it to the cart
            items.push(data);
            commit('SET_ITEMS_IN_CART', items);
            dispatch('openAlert', {message: 'Item added to cart.', code: 'success'}, {root: true})

        } else {
            dispatch('openAlert', {message: 'Item already exists in the cart.', code: 'error'}, {root: true})
        }
    },

    removeItemFromCart({commit, getters, dispatch}, item_name) {
        let items = getters.getCartItems;
    
        // Filter out the item with the matching id
        const updatedItems = items.filter(item => item.name !== item_name);
    
        if(updatedItems.length == 0){
            dispatch('toogleCart', false, {root:true})
        }
        // Commit the updated cart items
        commit('SET_ITEMS_IN_CART', updatedItems);
        dispatch('openAlert', {message: 'Item removed from cart.', code: 'success'}, {root: true})

    },

    emptyCart({commit, dispatch}) {
        // Set the cart items to an empty array
        commit('SET_ITEMS_IN_CART', []);
        dispatch('openAlert', {message: 'Cart emptiedy.', code: 'success'}, {root: true})
    }
    
    
}

const mutations = {
    SET_SERVICES: (state, services) => (state.services = services),
    SET_ITEMS_IN_CART: (state, cart_items) => (state.cart_items = cart_items)
}

export default {
    state, getters, actions, mutations
}
