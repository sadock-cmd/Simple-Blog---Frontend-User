<script setup>
import { computed, onMounted } from 'vue';
import MainLayout from '../layouts/Main.vue';
import PostCategory from '../components/PostCategory.vue';
import { blogStore } from '../stores/blogStore'
import { format } from 'date-fns';

const blogger = blogStore();
const URL_PATH = blogger.urlPath;
const allPosts = computed(() => blogger.posts);

console.log('my postss', allPosts);

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
};

onMounted(async () => {
  await blogger.getPosts();
})
</script>

<template>
  <MainLayout>

	<section class="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
		<PostCategory />
		<div class="container p-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			<template v-for="post in allPosts" :key="post.id">
				<article class="dark:bg-gray-900">
					<router-link :to="'/posts/' + post.id" rel="noopener noreferrer" aria-label="Te nulla oportere reprimique his dolorum">
						<img :src="URL_PATH + post.image" :alt="post.title"
							class="object-cover w-full h-52 dark:bg-gray-500">
					</router-link>
					<div class="flex flex-col flex-1 p-6">
						<router-link :to="'/posts/' + post.id" rel="noopener noreferrer" aria-label="Te nulla oportere reprimique his dolorum"></router-link>
						<router-link :to="'/posts/' + post.id" rel="noopener noreferrer"
							class="text-xs tracking-wide uppercase hover:underline dark:text-violet-400">{{ post.title
							}}</router-link>
						<h3 class="flex-1 py-2 text-lg font-semibold leadi">{{ post.content }}</h3>
						<div class="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
							<span>{{ formatDate(post.created_at) }}</span>
							<span>2.9K views</span>
						</div>
					</div>
				</article>
			</template>
		</div>
	</section>
  </MainLayout>
</template>
