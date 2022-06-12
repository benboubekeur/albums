<script setup>
defineProps({
    photo: Object
})
</script>
<template>
    <div
        class="  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-1  ">
        <a :href="photo.url">

            <div class="flex flex-col items-center pb-10">
                <img :src="photo.thumbnailUrl" alt="Bonnie image"
                     class="mt-1 mb-3 w-24 h-24 rounded-full shadow-lg"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center">
                    {{ photo.title }}</h5>

            </div>
        </a>
    </div>
</template>