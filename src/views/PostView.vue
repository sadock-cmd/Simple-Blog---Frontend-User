<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import MainLayout from '../layouts/Main.vue';
import { blogStore } from '../stores/blogStore'
import { authStore } from '../stores/authStore'
import CommentSection from '../components/CommentSection.vue';
import { format } from 'date-fns';
import { useRoute } from 'vue-router';

const blogger = blogStore();
const URL_PATH = blogger.urlPath;
const auth = authStore();

const route = useRoute()

const post = computed(() => blogger.post);
const postLikes = computed(() => blogger.likes_count);
const isLoading = ref(true);
// const postDate = computed((post) => {
//   console.log('can i see', post);
//   return format(new Date(post.created_at), 'yyyy-MM-dd')
// });

const handleLike = async (postId) => {
  try {
  const blogPost = {
      user_id: auth.user.id,
      post_id: postId
    }
    await blogger.likePost(blogPost);
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

const formatDate = (dateString) => {
	return format(new Date(dateString), 'dd MM yyyy HH:mm');
};

onMounted(async () => {
  const postId = route.params.id
  isLoading.value = true;
  await blogger.getSinglePost(postId);
  await blogger.updateLikesCount(postId);
  isLoading.value = false;

})

// watch(() => blogger.likes_count, (newLikesCount, oldLikesCount) => {
//   console.log('Likes count changed:', newLikesCount);
//   // You can update any other UI elements or perform additional actions here
// });
</script>

<template>
  <MainLayout>

    <div v-if="!isLoading" class="container md:p-2 md:mx-auto md:p-4 text-gray-100">

      <div class="flex md:items-center justify-center text-gray-900 md:min-w-full">
        <section class="dark:bg-gray-800 dark:text-gray-100 md:text-center">
          <div class="container md:max-w-6xl pt-2 md:p-6 md:mx-auto space-y-6 sm:space-y-12">
            <div rel="noopener noreferrer"
              class="block max-w-sm gap-3 mx-auto md:max-w-full group hover:no-underline focus:no-underline dark:bg-gray-900 items-center text-center">
              <img :src="URL_PATH + post.image" :alt="post.title"
                class="object-cover w-full h-64 rounded sm:h-96 dark:bg-gray-500">
              <div class="py-2 md:p-6 space-y-2">
                <h3 class="text-2xl font-semibold sm:text-4xl">
                  {{ post.title }}
                </h3>
                <span class="text-xs dark:text-gray-400">{{ formatDate(post.created_at) }}</span>
                
                <p class="text-left">{{ post.content }}</p>

                <button @click="handleLike(post.id)" class="text-blue-500 cursor-pointer focus:outline-none mx-2">
                  {{ postLikes }} 
                </button>

                <button @click="post.likes ? handleUnlike(post.id) : handleLike(post.id)"
                  class="text-blue-500 cursor-pointer focus:outline-none">
                  {{ post.likes }}
                  <svg class="mr-1.5 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                    <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                  </svg>
                </button>

                <div class="mt-4">
                  <CommentSection :post="post"/>
                  <!-- <CommentSection v-bind="post"/> -->
                  
                 
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <div v-else class="text-center my-auto mx-auto mt-10 text-gray-600">
      Loading...</div>
  </MainLayout>
</template>
