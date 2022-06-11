<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";

const data = ref(null)
const error = ref(null)
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';


function fetchAlbums() {
    fetch(ALBUMS_URL)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
}

onMounted(() => {
    fetchAlbums();

})
</script>

<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data" class="w-full">
        <ul class="list-outside hover:list-inside">
            <li v-for="album in data" :key="album.id">
                <router-link :to="{ name: 'album', params: { id: album.id } }">
                    <div
                        class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 mb-1 cursor-pointer">
                        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ album.title }}</h5>
                    </div>
                </router-link>
            </li>
        </ul>

    </div>
    <div v-else>Loading...</div>

</template>