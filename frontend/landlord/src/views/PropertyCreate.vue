<template>
    <div class='page-my-account'>
        <SubNav v-bind:slug="property.slug"/>
        <div class='columns is-multiline'>                           
            <div class="column is-12">
                <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                        <input class="input" type="text" v-model="property.address" >
                    </div>
                </div>
                <div class='field'>
                    <label class='label'>Type</label>
                    <div class='control'>
                        <div class='select'>
                            <select v-model='property.type'>
                                <option>House</option>
                                <option>Apartment</option>
                                <option>Townhouse</option>
                                <option>Studio</option>
                                <option>Retirement Home</option>
                            </select>
                        </div>
                    </div>
                </div>               
                <div class='field'>
                    <label class='label'>Price</label>                    
                    <div class="field has-addons">
                        <div class="control">
                            <a class="button is-static">$</a>
                        </div>
                        <div class="control">
                            <input class="input" type="number" v-model="property.price">
                        </div>
                        <div class="control">
                            <a class="button is-static">per week</a>
                        </div>
                    </div>            
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" v-model="property.description"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Number of rooms</label>
                    <div class="field has-addons">                       
                        <div class="control">
                            <input class="input" type="number" v-model="property.room">
                        </div>
                        <div class="control">
                            <a class="button is-static">bedroom</a>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Number of bathrooms</label>
                    <div class="field has-addons">                       
                        <div class="control">
                            <input class="input" type="number" v-model="property.bathroom">
                        </div>
                        <div class="control">
                            <a class="button is-static">bathrooms</a>
                        </div>
                    </div>
                </div>


                <div class="field">
                    <label class="label">Features</label>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="property.furnished" :checked="property.furnished == '1'" :value="1">Furnished                            
                        </label>
                        <br>
                        <label class="checkbox">
                            <input type="checkbox" v-model="property.airConditioning" :checked="property.airConditioning == '1'">Air Conditioning                            
                        </label>
                        <br>
                        <label class="checkbox">
                            <input type="checkbox" v-model="property.pool" :checked="property.pool == '1'">Pool                           
                        </label>
                    </div>
                </div>

                <br>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="saveProperty()" class="button is-link">Save</button>
                    </div>
                    <div class="control">
                        <button @click="goBack()" class="button is-link is-light">Cancel</button>
                    </div>                
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SubNav from '@/components/SubNav.vue'

export default {
    name: 'property-create',
    components: {
        SubNav
    },
    data() {
        return {
            property: {                    
                "type": "Apartment",
                "address": "",
                "slug": "",  
                "description": "",
                "price": "",
                'get_image': '',
                'get_thumbnail': '',
                "room": 0,
                "bathroom": 0,
                "furnished": 0,
                "airConditioning": 0,
                "pool": 0,
                "gym": 0
            }
        }
    },
    mounted() {
        document.title = 'Property Create | The Perfect Tenant'
    },
    methods: {        
        async saveProperty() {
            // Get user id
            await axios
                .get(`v2/user/profile/`, this.property)
                .then(response => {
                    console.log(response)
                    this.property.landlord_id = response.user.id                   
                })
                .catch(error => {
                    console.log(error);
                });

            // Create slug
            this.property.slug = this.property.address.replace(/ /g, "-").toLowerCase()

            // Reformat features
            this.property.furnished = (this.property.furnished == true)? 1 : 0
            this.property.airConditioning = (this.property.airConditioning == true)? 1 : 0
            this.property.pool = (this.property.pool == true)? 1 : 0
            this.property.gym = (this.property.pool == true)? 1 : 0

            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Update property
            await axios
                .post(`v2/property/my-properties/`, this.property)
                .then(response => {
                    console.log(response)
                    this.$router.go(-1)                    
                })
                .catch(error => {
                    console.log(error);
                });
        },
        goBack() {
            this.$router.go(-1) 
        }
    }
}
</script>