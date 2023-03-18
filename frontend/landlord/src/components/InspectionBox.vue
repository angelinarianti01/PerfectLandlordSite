<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
            {{ new Date(inspection.date_time) }}
            </p>
        </header>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" @click="DeleteTime()" class="card-footer-item">Delete</a>
        </footer>
    </div>
    <br>
</template>

<script>
import axios from 'axios'

export default {
    name: 'InspectionBox',
    props: {
        inspection: Object
    },
    methods: {
        async DeleteTime() {
            await axios
                .post(`v2/inspection/delete/${this.inspection.property.id}/`, {
                    "date_time":this.inspection.date_time
                })
                .then(response => {
                    console.log(response.data)
                    return Response(response.data)               
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}   
</script>

<style scoped>
@import '../../node_modules/bulma';

  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;    
  }  
</style>