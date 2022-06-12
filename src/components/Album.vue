<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'

const data = ref(null)
const error = ref(null)


function fetchAlbum(albumId) {


    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
}

function isValidID(str) {
    return /^([1-9]\d*)$/.test(str);
}

onMounted(() => {
    const albumId = useRoute().params.id

    if (!isValidID(albumId)) {
        alert('Invalid ID ')
        return
    }
    fetchAlbum(albumId)

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

    </div>
    <div v-else>Loading...</div>

</template>
