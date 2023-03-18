<template>
    <div class="page-property">
        <SubNav v-bind:slug="property.slug" v-bind:selected="currentNav"/>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">{{ property.address }}</h1>
            </div>   
            
            <figure>
                <img v-bind:src="property.get_image" alt="Placeholder image">
            </figure>
            <div class="column is-12">
                <div class="field is-grouped">
                    <div class="control">
                        <button @click="saveToCollection()" v-if="!propertySaved" class="button is-link">Save To Collection</button>
                        <button @click="unsaveFromCollection()" v-else class="button is-link">Unsave From Collection</button>
                    </div>                    
                    <div class="control">
                        <button @click="goBack()" class="button is-link is-light">Go back</button>
                    </div>                
                </div>
            </div>

            <hr>

            <div class="column is-12">     
                <div class="field">
                    <label class="label">Property Type</label>
                    <p>{{ property.type }}</p>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <p>{{ property.description }}</p>
                </div>

                <div class="field">
                    <label class="label">Price</label>
                    <p>${{ property.price }}/ Week</p>
                </div>

                <div class="field">
                    <label class="label">Room</label>
                    <p>{{ property.room }} rooms</p>
                </div>

                <div class="field">
                    <label class="label">Bathroom</label>
                    <p>{{ property.bathroom }} bathrooms</p>
                </div>

                <div class="field">
                    <label class="label">Features:</label>
                    <ul>

                    </ul>
                        <li v-if="property.furnished == 1">Furnished </li>
                        <li v-if="property.airConditioning == 1">Air Conditioning </li>
                        <li v-if="property.pool == 1">Pool </li>
                        <li v-if="property.gym == 1">Gym </li>
                </div>                    
            </div>
            
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SubNav from '@/components/PropertySubNav.vue'

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
            propertySaved: false,  
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
                    document.title = this.property.address + " | The Perfect Landlord";
                })
                .catch(error => {
                    console.log(error);
                });

            // Check if property is saved
            await axios
                .get(`v2/property/saved-properties/`)
                .then(response => {
                    console.log(response.data);
                    var properties = response.data
                    properties.forEach(p => {
                        if (p.id == this.property.id) {
                            this.propertySaved = true;
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            
        },
        async saveToCollection() {
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Save property in saved properties database
            await axios
                .post(`v2/property/saved-properties/`, {'property_id':this.property.id})
                .then(response => {
                    console.log(response)

                    // Change front end variable
                    this.propertySaved = true;
                })
                .catch(error => {
                    console.log(error);
                });
            
        },
        async unsaveFromCollection() {
            // Save property in saved properties database
            await axios
                .delete(`v2/property/saved-properties/${this.property.id}/`)
                .then(response => {
                    console.log(response)
                    // Change front end variable
                    this.propertySaved = false;
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

<style>
    img {
        width: 300px;
        height: 200px;
    }
</style>