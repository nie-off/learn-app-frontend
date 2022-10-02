<template>
    <div class="create">
        <div class="columns">
            <div class="column is-8 is-offset-4">
                <h1 class="title">Create an Account</h1>
                <form>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input class="input" type="email" placeholder="Email input" name="username" v-model="username">
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
                            <button class="button is-success" @click="createAccount">Sign up</button>
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
            createAccount(e) {
                const userData = {
                    username: this.username,
                    password: this.password
                }
                e.preventDefault();
                
                axios
                .post("/api/v1/users/", userData)
                .then(response => {
                    console.log(response)
                    
                    this.$router.push('/login')
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
            }
        }
    }
</script>

<style>
    
</style>