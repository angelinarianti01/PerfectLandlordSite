<template>
  <div class="home">
    <h1 class="title">Welcome to The Perfect Landlord!</h1>

    <br>

    <p class="subtitle">If you are a tenant, you must be looking for the perfect abode. By signing up with us, you are able to more than just find the perfect house, but also the perfect landlord!</p>

    <a class="button" href="/log-in">Join Us!</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
