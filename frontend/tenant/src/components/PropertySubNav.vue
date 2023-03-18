<template>
    <div class="tabs">
        <ul>
            <li v-if="selected=='property'" class="is-active"><RouterLink v-bind:to="'/properties/'+slug">Details</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/properties/'+slug">Details</RouterLink></li>
            <li v-if="selected=='property-inspections'" class="is-active"><RouterLink v-bind:to="'/properties/'+slug+'/inspections'">Inspection Times</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/properties/'+slug+'/inspections'">Inspection Times</RouterLink></li>
            <li v-if="selected=='property-application'" class="is-active"><RouterLink v-bind:to="'/properties/'+slug+'/application'">My Application</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/properties/'+slug+'/application'">My Application</RouterLink></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PropertySubNav',
    props: {
        slug: String,
        selected: String
    }
}
</script>

<style>
    .router-link-active {        
        background-color: lightgrey;
    }
</style>