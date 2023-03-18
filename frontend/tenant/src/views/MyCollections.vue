<template>
    <div class="page-search">
        <SubNav v-bind:selected="currentNav"/>     

        <div class="columns is-multiline">            
            <PropertyBox 
                v-for="property in properties"
                v-bind:key="property.id"
                v-bind:property="property" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import PropertyBox from '@/components/PropertyBox.vue'
import SubNav from '@/components/CollectionSubNav.vue'

export default {
    name: 'my-collections',
    components: {
        PropertyBox,
        SubNav
    },
    data() {
        return {
            properties: [],
            query: '',
            currentNav: this.$route.name,
        }
    },
    mounted() {
        document.title = 'My Saved Properties | The Perfect Tenant'

        this.getSavedProperties()                    
    },
    methods: {
        async getSavedProperties() {      
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Request
            await axios
                .get('v2/property/saved-properties/')
                .then(response => {
                    console.log(response.data)
                    this.properties = response.data
                })
                .catch(error => {
                    console.log(error)
                }); 
        }
    }
}
</script>

<style lang="scss">
@import '../../node_modules/bulma';


</style>