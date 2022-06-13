<script setup>
import {onMounted, ref, watch} from 'vue'
import Pagination from '@ocrv/vue-tailwind-pagination'
import Album from './AlbumElement.vue'

const data = ref(null)
const error = ref(null)
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';

let currentPage = ref(1)
let perPage = ref(12)
let total = ref(200)


const fetchAlbums = () => {
    fetch(getRequestUrl())
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
}

const getRequestUrl = () => {
    return `${ALBUMS_URL}?_page=${currentPage.value}&_limit=${perPage.value}`
}
const pageChanged = (event) => {
    currentPage.value = event
}
watch(currentPage, (currentPage, prevCurrentPage) => {
    fetchAlbums()
})
onMounted(() => {
    fetchAlbums()
})
</script>

<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>

    <div v-else-if="data">
        <div
            class="grid pt-4 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div v-for="album in data" :key="album.id" class="">

                <album :album="album"/>
            </div>

        </div>
        <div class="grid pt-4 grid-cols-1  w-full">
            <Pagination :current="currentPage" :per-page="perPage" :total="total"
                        @page-changed="pageChanged($event)"/>
        </div>
    </div>
    <div v-else>Loading...</div>

</template>