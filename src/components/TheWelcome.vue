<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('https://jsonplaceholder.typicode.com/albums')
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))
</script>

<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
        <ul>
            <li v-for="album in data" >
                {{album.title}}
            </li>
        </ul>

    </div>
    <div v-else>Loading...</div>
</template>