<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import Pagination from '@ocrv/vue-tailwind-pagination'

const data = ref(null)
const error = ref(null)

let currentPage = ref(1)
let perPage = ref(12)
let total = ref(200)
let albumId = ref('')


function getRequestURL() {
    return `https://jsonplaceholder.typicode.com/albums/${albumId.value}/photos?_page=${currentPage.value}&_limit=${perPage.value}`;
}

const pageChanged = (event) => {
    currentPage.value = event
}
watch(currentPage, (currentPage, prevCurrentPage) => {
    fetchAlbum()
})

function fetchAlbum() {


    fetch(getRequestURL())
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
}

function isValidID(str) {
    return /^([1-9]\d*)$/.test(str);
}

onMounted(() => {
    albumId.value = useRoute().params.id

    if (!isValidID(albumId.value)) {
        alert('Invalid ID ')
        return
    }
    fetchAlbum()

})
</script>

<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
        <div class="grid pt-4 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

            <div v-for="photo in data" :key="photo.id">

                <div
                    class="  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-1  ">
                    <a :href="photo.url">

                        <div class="flex flex-col items-center pb-10">
                            <img class="mt-1 mb-3 w-24 h-24 rounded-full shadow-lg" :src="photo.thumbnailUrl"
                                 alt="Bonnie image"/>
                            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center">
                                {{ photo.title }}</h5>

                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="grid pt-4 grid-cols-1  w-full">
            <Pagination :current="currentPage" :per-page="perPage" :total="total"
                        @page-changed="pageChanged($event)"/>
        </div>
    </div>
    <div v-else>Loading...</div>

</template>
