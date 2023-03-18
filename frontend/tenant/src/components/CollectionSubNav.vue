<template>
    <div class="tabs">
        <ul>
            <li v-if="selected=='my-collections'" class="is-active"><RouterLink v-bind:to="'/my-saved-properties/'">My Saved Properties</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-collections/'">My Saved Properties</RouterLink></li>
            <li v-if="selected=='my-inspections'" class="is-active"><RouterLink v-bind:to="'/my-inspections'">My Inpsections</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-inspections'">My Inpsections</RouterLink></li>
            <li v-if="selected=='my-applications'" class="is-active"><RouterLink v-bind:to="'/my-applications'">My Applications</RouterLink></li>
            <li v-else><RouterLink v-bind:to="'/my-applications'">My Applications</RouterLink></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SubNav',
    props: {
        selected: String
    }
}
</script>