<template>
    <div class="tabs">
        <ul>
            <li v-if="selected=='property'" class="is-active"><RouterLink v-bind:to="'/my-properties/'+slug">Details</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-properties/'+slug">Details</RouterLink></li>
            <li v-if="selected=='property-inspections'" class="is-active"><RouterLink v-bind:to="'/my-properties/'+slug+'/inspections'">Inspection Times</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-properties/'+slug+'/inspections'">Inspection Times</RouterLink></li>
            <li v-if="selected=='property-applications'" class="is-active"><RouterLink v-bind:to="'/my-properties/'+slug+'/application'">My Application</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-properties/'+slug+'/application'">My Application</RouterLink></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SubNav',
    props: {
        slug: String,
        selected: String
    }
}
</script>