<template>
    <div class="create">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <h1 class="title">Login</h1>
                <form>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input class="input" type="email" placeholder="Email" name="username" v-model="username">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fa-solid fa-envelope" />
                            </span>
                        </div> 
                    </div>
                    
                    <div class="field">
                        <label class="label">Password</label>
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password" name="password" v-model="password">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fa-solid fa-lock" />
                            </span>
                        </p>
                    </div>
                    
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">
                            {{ error }}
                        </p>
                    </div>
                    
                    <div class="field">
                        <div class="control">
                            <button class="button is-success" @click="createAccount">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: 'Create',
        data() {
            return {
                username: '',
                password: '',
                errors: []
            }
        },
        methods: {
            async createAccount(e) {
                
                this.$store.commit('deleteToken')
                
                const userData = {
                    username: this.username,
                    password: this.password
                }
                e.preventDefault();
                
                await axios
                .post("/api/v1/token/login/", userData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        console.log(JSON.stringify(error.message))
                    } else {
                        console.log(JSON.stringify(error))
                    }
                })
                axios
                .get("/api/v1/users/me")
                .then(response => {
                    this.$store.commit('setUser', {'username': response.data.username, 'id': response.data.id})
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('userid', response.data.id)
                    this.$router.push('/')
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })

            }
        }
    }
</script>


<style>
    
</style>