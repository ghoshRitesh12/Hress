export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useAuth();

  if(data?.value?.user?.role === 'admin') {
    return;
  }
  return navigateTo('/');
})
