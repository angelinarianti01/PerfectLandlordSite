<template>
    <div class='page-my-account'>
        <SubNav v-bind:slug="property.slug" v-bind:selected="currentNav"/>
        <div class='columns is-multiline'>
            <div class='column is-12'>
                <h1 class='title'> {{ property.address }} Inspection Times:</h1> 
                                 
                <div class="field has-addons">
                    <div class="control">
                        <input class="input" type="date" v-model="date" placeholder="Find a repository">
                        <input class="input" type="time" v-model="time" placeholder="Find a repository">
                    </div>
                    <div class="control">
                        <a @click="AddTime()" class="button is-info">
                        Add time
                        </a>
                    </div>
                </div>
            </div>
            <div class='column is-12'>
                <InspectionBox 
                    v-for="inspection in inspections"
                    v-bind:key="inspection.id"
                    v-bind:inspection="inspection" />       
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SubNav from '@/components/SubNav.vue'
import InspectionBox from '@/components/InspectionBox.vue'

export default {
    name: 'property',
    components: {
        SubNav,
        InspectionBox
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
            inspections: [],
            date: '',
            time: '',
            currentNav: this.$route.name, 
        }
    },
    async mounted() {
        document.title = 'Property Details | The Perfect Tenant'

        await this.getPropertyDetails()
        await this.getPropertyInspections()
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
        async getPropertyInspections() {   
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            await axios
                .post(`v2/inspection/view/`, { 'property_id': this.property.id })
                .then(response => {
                    console.log(response.data);
                    var rawInpsections = response.data;
                    this.inspections = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },  
        async AddTime() {
            // Prepare data
            await axios
                .post(`v2/inspection/create/`, { 
                    'property_id': this.property.id,
                    'date_time': `${this.date} ${this.time}`
                  })
                .then(response => {
                    console.log(response.data);
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