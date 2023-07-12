export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  
  if (status.value === 'authenticated') {
    return;
  }
  return navigateTo('/login');
})
