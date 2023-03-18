<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My Profile</h1>
                <div class="control">                    
                    <router-link class="button is-link" to="/my-profile/form">Edit</router-link>
                </div>
            </div>            

            <hr>

            <div class="column is-12">                
                <div class="field">
                    <label class="label">Full Name</label>
                    <p>{{ profile.get_full_name }}</p>
                </div>

                <div class="field">
                    <label class="label">Username</label>
                    <p>{{ profile.user.username }}</p>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <p>{{ profile.user.email }}</p>
                </div>

                <div class="field">
                    <label class="label">Location</label>
                    <p>{{ profile.location }}</p>
                </div>

                <div class="field">
                    <label class="label">Bio</label>
                    <p>{{ profile.bio }}</p>
                </div>                    
            </div>
            
            <hr>

            <div class="column is-12 has-text-right">
                <button @click="logout()" class="button is-danger">Log out</button>                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'my-profile',
    components: {
        
    },
    data() {
        return {
            profile: {
                'user': {
                    'id': 1,
                    'username': '',
                    'email': '',
                    'groups': [
                        {
                            'name': ''
                        }
                    ],
                    'first_name': '',
                    'last_name': ''
                },
                'bio': '',
                'location': '',
                'birth_date': '',
                'get_image': '',
                'get_thumbnail': '',
                'get_full_name': ''
            }
        }
    },
    mounted() {
        document.title = 'My Profile | The Perfect Tenant'

        this.getMyProfile()
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getMyProfile() {
            await axios
                .get('v2/user/profile/')
                .then(response => {
                    this.profile = response.data
                    console.log(this.profile)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>