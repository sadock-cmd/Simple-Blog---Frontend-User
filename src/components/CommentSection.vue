<script setup>
import { onBeforeMount, ref, computed } from 'vue';

import { blogStore } from '../stores/blogStore'
import { authStore } from '../stores/authStore'
import { format } from 'date-fns';

const props = defineProps(['post'])
const commentMessage = ref('')

const blogger = blogStore();
const auth = authStore();

const allComments = computed(() => blogger.comments)
let commentsCount = null;


const handleComment = async () => {
	const commentData = {
		content: commentMessage.value,
		user_id: auth.user.id,
		post_id: props.post.id
	}
	try {
		await blogger.addComment(commentData)
		commentMessage.value = ''
		console.log('clear the comment v');
	} catch (error) {
		console.log(error)
	}


}

const formatDate = (dateString) => {
	return format(new Date(dateString), 'dd MM yyyy HH:mm');
};

const toggleCommentsDisplay = () => {
	showAllComments.value = !showAllComments.value;
};

const showAllComments = ref(false);

const visibleComments = computed(() => {
	if (!allComments.value.comments) {
		return [];
	}
	const commentsArrayOg = Object.values(allComments.value.comments);
	const commentsArray = commentsArrayOg.reverse()
	commentsCount = commentsArrayOg.length;

	return showAllComments.value ? commentsArray : commentsArray.slice(0, 2);
});



// watchEffect(() => {
// 		allComments.value = blogger.comments;
// 		console.log('post comments 0082 ...', allComments.value);
// 	});

onBeforeMount(async () => {
	blogger.comments = []
	await blogger.getCategories();
	await blogger.getPosts();
	await blogger.getComments(props.post.id);
})
</script>

<template>
	<section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
		<div class="max-w-2xl mx-auto px-4">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments {{ commentsCount }}</h2>

			</div>
			<form class="mb-6" @submit.prevent="handleComment">
				<div
					class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<label for="comment" class="sr-only">Your comment</label>
					<textarea id="comment" rows="6" v-model="commentMessage"
						class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
						placeholder="Write a comment..." required></textarea>
				</div>
				<button type="submit"
					class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-900 hover:bg-slate-800">
					Post comment
				</button>
			</form>

			<template v-if="visibleComments.length === 0">
				<p>No comments</p>
			</template>

			<template v-else>
				<template v-for="comment in visibleComments" :key="comment.id">
					<article class="p-6 pb-2 text-base bg-white rounded-lg dark:bg-gray-900">
						<footer class="flex justify-between items-center mb-2">
							<div class="flex items-center">
								<p
									class="inline-flex items-center mr-3 text-gray-900 dark:text-white font-semibold capitalize">
									{{ comment.user.name }}
								</p>
								<p class="text-sm justify-left text-left text-gray-600 dark:text-gray-400">{{
									formatDate(comment.created_at) }}</p>
							</div>
						</footer>
						<p class="text-left text-gray-500 dark:text-gray-400">{{ comment.content }}</p>
					</article>


				</template>
				<div v-if="!showAllComments.value" class="text-left pl-6">
					<button @click.prevent="toggleCommentsDisplay"
						class="text-md font-medium text-center text-slate-500 hover:text-slate-700 rounded-lg">
						{{ showAllComments.value ? 'Hide Comments' : 'All Comments' }}
					</button>
				</div>
			</template>


		</div>
	</section>
</template>
  
