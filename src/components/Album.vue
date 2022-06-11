<script setup>
import { ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
const data = ref(null)
const error = ref(null)


onMounted(() => {

    const albumId = useRoute().params.id
    console.warn(`Album ID is ${albumId}`)

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
})
</script>

<template>
    <h2>From the Album View</h2>
</template>
