<script setup>
defineProps({
    album: Object
})
</script>
<template>
    <router-link :to="{ name: 'album', params: { id: album.id } }">
        <div
            class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 mb-1 cursor-pointer">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ album.title }}</h5>
        </div>
    </router-link>
</template>


