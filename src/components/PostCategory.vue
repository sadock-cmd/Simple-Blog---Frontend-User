<script setup>
import { computed, onMounted } from 'vue';
// import MainLayout from '../layouts/Main.vue';
import { blogStore } from '../stores/blogStore'
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter();

const blogger = blogStore();

const allPosts = computed(() => blogger.posts);
const categories = computed(() => blogger.categories);



const fetchPostsCategory = async(categoryId) => {
	await blogger.getCategoryPosts(categoryId)	
	router.push(`/category-post/${categoryId}`)
}


onMounted(async () => {
	await blogger.getCategories();
	await blogger.getPosts();
})
</script>

<template>
	
		<div class="space-y-2 text-center">
			<!-- <h2 class="text-3xl font-bold">Mr Vlog</h2> -->
			<router-link to="/" class="text-3xl font-bold md:hidden">Mr Vlog - Home</router-link>
			<p class="font-serif text-sm dark:text-gray-400">
			<ul class="items-center justify-center hidden space-x-3 md:flex">
				<!-- Generate dynamic links based on categories -->
				<router-link to="/"
					class="flex items-center px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md">
					All
				</router-link>
				<li v-for="category in categories" :key="category.id" class="flex">
					<button 
						@click.prevent="fetchPostsCategory(category.id)"
						class="flex items-center px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md">
						{{ category.name }}
					</button>
					<!-- <router-link :to="{ name: 'posts', params: category.id  }"
						class="flex items-center px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md">
						{{ category.name }}
					</router-link> -->
				</li>
			</ul>
			</p>
		</div>

</template>
  
