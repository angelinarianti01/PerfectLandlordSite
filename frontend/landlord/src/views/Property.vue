<template>
    <div class='page-my-account'>
        <SubNav v-bind:slug="property.slug" v-bind:selected="currentNav"/>
        <div class='columns is-multiline'>
            <div class='column is-12'>
                <h1 class='title'> {{ property.address }}</h1>
            </div>
            
            <hr>      
            
            <div class="column is-12">
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
                            <input type="checkbox" v-model="property.furnished" :checked="property.furnished == '1'">Furnished                            
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
                        <button @click="deleteProperty()" class="button is-danger">Delete</button>
                    </div>
                    <div class="control">
                        <button @click="goBack()" class="button is-link is-light">Go back</button>
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
    name: 'property',
    components: {
        SubNav
    },
    data() {
        return {
            property: {
                'id': 0,
                'slug': '',
                'landlord_id': 0,
                'type': '',
                'address': '',
                'get_absolute_url': '',
                'description': '',
                'price': 0,
                'get_image': '',
                'get_thumbnail': '',
                'room': 0,
                'bathroom': 0,
                'furnished': '',
                'airConditioning': '',
                'pool': '',
                'gym': ''
            },
            currentNav: this.$route.name, 
        }
    },
    mounted() {
        document.title = 'Property Details | The Perfect Tenant'

        this.getPropertyDetails()
    },
    methods: {        
        async getPropertyDetails() {
            // Retrieve property unique slug 
            const property_slug = this.$route.params.property_slug;

            // Query property details
            await axios
                .get(`v2/property/properties/${property_slug}/`)
                .then(response => {
                    console.log(response.data);
                    this.property = response.data;
                    console.log(this.property)
                    // Revise title to property address
                    document.title = this.property.address + " | The Perfect Tenant";
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async saveProperty() {
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Update property
            await axios
                .post(`v2/property/my-properties/${this.property.id}/`, this.property)
                .then(response => {
                    console.log(response)
                    this.$router.go(-1)                    
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async deleteProperty() {
            
        },
        goBack() {
            this.$router.go(-1) 
        }
    }
}
</script>