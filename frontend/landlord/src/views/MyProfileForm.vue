<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My Profile</h1>
            </div>

            <hr>

            <div class="column is-12">                
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="profile.user.first_name" >
                    </div>
                </div>

                <div class="field">                    
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="profile.user.last_name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" v-model="profile.user.username">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    <p class="help is-success">This username is available</p>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="email" v-model="profile.user.email">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="profile.location">
                                <option>Select suburb</option>
                                <option>Melbourne CBD</option>
                                <option>South Melbourne</option>
                                <option>Southbank</option>
                                <option>South Yarra</option>
                                <option>North Melbourne</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Bio</label>
                    <div class="control">
                        <textarea class="textarea" v-model="profile.bio"></textarea>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                        <input type="checkbox">
                        I agree to the <a href="#">terms and conditions</a>
                        </label>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="radio">
                        <input type="radio" name="question">
                        Yes
                        </label>
                        <label class="radio">
                        <input type="radio" name="question">
                        No
                        </label>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="saveProfile()">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click="goBack()">Cancel</button>
                    </div>
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
    name: 'my-profile-form',
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
        async saveProfile() {
            // Print request
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                    return request
                })

            // Update profile
            await axios
                .put(`v2/user/profile/update/`, this.profile)
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