<script setup>
import { computed } from 'vue';
import MainLayout from '../layouts/Main.vue';
import PostCategory from '../components/PostCategory.vue';
import { blogStore } from '../stores/blogStore'
import { format } from 'date-fns';

const blogger = blogStore();
const URL_PATH = blogger.urlPath;
const allPosts = computed(() => blogger.categoryPosts);



const truncateText = (text, maxLength) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
};

const formatDate = (dateString) => {
	return format(new Date(dateString), 'dd MM yyyy HH:mm');
};

// onMounted(async () => {
// 	const categoryId = route.params.id
//   await blogger.getCategoryPosts(categoryId);
// })
</script>

<template>
	<MainLayout>

		<section class="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
			<PostCategory />
			<template v-if="allPosts.length > 0">
			<div class="container p-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					<template v-for="post in allPosts" :key="post.id">
						<article class="dark:bg-gray-900">
							<router-link :to="'/posts/' + post.id" rel="noopener noreferrer"
								aria-label="Te nulla oportere reprimique his dolorum">
								<img :src="URL_PATH + post.image" :alt="post.title"
									class="object-cover w-full h-52 dark:bg-gray-500">
							</router-link>
							<div class="flex flex-col flex-1 p-6">
								<router-link :to="'/posts/' + post.id" rel="noopener noreferrer"
									aria-label="Te nulla oportere reprimique his dolorum"></router-link>
								<router-link :to="'/posts/' + post.id" rel="noopener noreferrer"
									class="text-xs tracking-wide uppercase hover:underline dark:text-violet-400">{{
										post.title
									}}</router-link>
								<h3 class="flex-1 py-2 text-sm leadi">{{ truncateText(post.content, 50) }}</h3>
								<div class="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
									<span>{{ formatDate(post.created_at) }}</span>
									<!-- <span>2.9K views</span> -->
								</div>
							</div>
						</article>
					</template>
				</div>
				</template>


				<div v-else class="justify-center text-center my-auto md:mx-50 mt-10 text-gray-600">
					<p class="text-center font-semibold text-xl text-gray-600 mt-20 ">
						NO POSTS YET
					</p>
				</div>


			
		</section>
	</MainLayout>
</template>
