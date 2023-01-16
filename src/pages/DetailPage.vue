<template>
    <div>
        <el-image :src="datailData.image?.url" v-loading="loading" style="height:200px"></el-image>
        <el-divider />
        <div>{{ datailData.title }}</div>
        <el-divider />
        <!-- <div>{{ datailData.author.nickName}}</div> -->
        <div>{{ datailData.createdAt }}</div>
        <el-divider />
        <div v-html="currentHTML"></div>
        <el-divider />

    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { DetailData } from "../vuex/store"
import MarkdownIt from 'markdown-it'
import axios from 'axios';
import { useRoute } from 'vue-router';
export default defineComponent({

    props: {
        msg: String,
    },
    setup(props) {
        const store = useStore();
        let loading = computed(() => store.state.isLoading)
        const route = useRoute()
        const datailData = computed<DetailData>(() => store.getters.getDetailPost)
        const md = new MarkdownIt()
        const currentHTML = computed(() => {
            if (datailData.value && datailData.value.content) {
                return md.render(datailData.value.content)
            }
            return ''
        })
        onMounted(() => {
            store.dispatch('fetchDetailPosts', route.params.postId)
        })
        return { datailData, loading, currentHTML }
    }
});
</script>

<style scoped>

</style>
