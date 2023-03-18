<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <form method="get" action="/my-properties">
                <div class="field has-addons">
                    <div class="control">
                        <input type="text" class="input" placeholder="Search" name="query">
                    </div>

                    <div class="control">
                        <button class="button is-success">
                            <span class="icon">
                                <i class="fas fa-search"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </form>
            <div class="column is-12">
                <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
            </div>

                
            <TenantBox 
                v-for="tenant in tenants"
                v-bind:key="tenant.id"
                v-bind:tenant="tenant" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TenantBox from '@/components/TenantBox.vue'

export default {
    name: 'Tenants',
    components: {
        TenantBox
    },
    data() {
        return {
            tenants: [],
            query: ''
        }
    },
    mounted() {
        document.title = 'Search | The Perfect Tenant'

        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
        else {
            this.getTenants()            
        }
    },
    methods: {
        async getTenants() {      
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Request
            await axios
                .get('v2/user/tenants/')
                .then(response => {
                    console.log(response.data)
                    this.tenants = response.data
                })
                .catch(error => {
                    console.log(error)
                }); 
        },
        async performSearch() {
            this.$store.commit('setIsLoading', true)

            const data = {
                'query': this.query
            }

            // Search properties by address
            await axios
                .post('v2/property/search/', data)
                .then(response => {
                    console.log(response.data)

                    // Store filtered properties in data
                    this.properties = response.data
                })
                .catch(error => {
                    console.log(error) 
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>