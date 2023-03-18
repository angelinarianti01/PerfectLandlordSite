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
    name: 'property-application',
    components: {
        SubNav,
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

<style>
    img {
        width: 300px;
        height: 200px;
    }
</style>