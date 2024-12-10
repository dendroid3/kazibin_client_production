<template>
    <div class="pa-0 ma-0">
      
      <div class=" lighten-4 d-flex align-center my-4 justify-center" style="position: fixed; z-index: 999; top: 0; right: 0; left: 0; bottom: 0;">
        <div class="grey px-4 py-2 -2 rounded" style="min-width: 40%;">
          <div class="d-flex justify-end">
            <v-icon class="pa-4 red--text mb-2 pointer" @click="closeCart">
              mdi-close
            </v-icon>
          </div>
          <div class="green--text bold d-flex justify-center white rounded" style=" font-size: 2rem;">
            Cart
          </div><br>
          
          <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th class="text-center">Item</th>
                    <th class="text-center">Cost</th>
                    <th class="text-center"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in getCartItems" :key="i" class="odd gradeX pa-2 wrapper">
                    <td class="text-center">{{ item.name }}</td> 
                    <td class="text-center">{{ item.cost }}</td> 
                    <td class="text-center">
                        <v-icon class="red--text pointer" @click="removeItem(item.name)">
                            mdi-delete
                        </v-icon>
                    </td> 
                </tr>
                <tr class="odd gradeX pa-2 wrapper">
                    <td class="text-center">Total</td> 
                    <td class="text-center bold-tiny">{{ total }}</td> 
                </tr>
            </tbody>
          </table>
          <v-btn class="green white--text" block @click="checkout">
            <v-icon class="mr-4">
                mdi-whatsapp
            </v-icon>
            Checkout
          </v-btn>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
        name: "Cart",

        computed: {
            ...mapGetters(['getCartItems']),

            total() {
                // Access the items from the cart
                const items = this.getCartItems;

                // Use reduce to sum up the cost of all items
                return items.reduce((total, item) => total + item.cost, 0);
            }
        },

        methods: {
            ...mapActions(['toogleCart', 'removeItemFromCart']),

            closeCart() {
                this.toogleCart(false)
            },

            removeItem(item_name) {
                const confrimation = `You are about to remove ${item_name} from cart.\nProceed?`
                if(!confirm(confrimation)) {return}
                this.removeItemFromCart(item_name)
            },

            checkout() {
                this.toogleCart(false)
                const items = this.getCartItems; // Get all items from the cart
                const total = this.total; // Calculate the total cost

                // Construct the message
                let message = "Hello admin, I am looking for the following services:\n\n";

                items.forEach(item => {
                    message += `${item.name} = *${item.cost}*\n`;
                });

                message += `\nTotaling *${total}*\nThank you.`;

                // Encode the message to make it URL-safe
                const encodedMessage = encodeURIComponent(message);

                // Construct the WhatsApp API URL
                const phoneNumber = "+254797727253"; // Admin's phone number
                const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

                // Open the WhatsApp link in the browser
                window.open(whatsappURL, "_blank");
            }


        }
    }
  </script>
  <style lang="css" scoped>
  .component-wrapper{
    border-radius: 5px;
    z-index: 999;
  }
  .link{
    text-decoration: underline;
    color: blue;
  }
  </style>