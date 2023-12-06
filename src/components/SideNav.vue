<script setup>
import { onMounted } from 'vue';

import { authStore } from '../stores/authStore';
import { blogStore } from '../stores/blogStore';
import { useRouter } from 'vue-router'

const auth = authStore()
const blogger = blogStore();


const router = useRouter();


const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}

onMounted(async () => {
  await blogger.getCategories();
})
</script>

<template>
	<header class="p-4 dark:bg-gray-800 text-gray-100 bg-slate-500">
		<div class="container flex justify-between h-16 mx-auto">
			<router-link to="/" class="flex items-center p-2 font-bold">
        MR VLOG
      </router-link>
			
			<div class="items-center flex-shrink-0 hidden lg:flex">
				<button @click.prevent="handleLogout" class="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign Out</button>
			</div>
			<button class="p-4 lg:hidden" @click.prevent="handleLogout">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 dark:text-gray-100">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
				</svg>
			</button>
		</div>
	</header>
</template>

