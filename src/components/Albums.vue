<script setup>
import {onMounted, ref} from 'vue'
import Pagination from '@ocrv/vue-tailwind-pagination'


let currentPage = ref(1)
let perPage = ref(2)
let total = ref(20)


const data = ref(null)
const error = ref(null)
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';


function fetchAlbums() {
    fetch(getRequestUrl())
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
}

const getRequestUrl = () => {
    return `${ALBUMS_URL}?_page=${currentPage}&_limit=${perPage}`
}
const pageChanged = (event) => {
    currentPage = event
    console.warn(`Page is ${event}`)
}
onMounted(() => {
    fetchAlbums();

})
</script>

<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>

    <div v-else-if="data"
         class="grid pt-4 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div v-for="album in data" :key="album.id" class="">
            <router-link :to="{ name: 'album', params: { id: album.id } }">
                <div
                    class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 mb-1 cursor-pointer">
                    <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ album.title }}</h5>
                </div>
            </router-link>

        </div>
        <Pagination :current="currentPage" :per-page="perPage" :total="total" @page-changed="pageChanged($event)"/>
    </div>
    <div v-else>Loading...</div>

</template>