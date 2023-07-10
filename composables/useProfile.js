export const useProfile = () => {
  
  const profile = useState(() => null);

  const fetchProfile = async (url) => {
    try {
      if(!url) throw new Error('Profile fetch url missing');
      const { setPopupMessage } = usePopup();

      const headers = useRequestHeaders(['cookie'])
      const { data, error } = await useFetch(url, { headers });

      setPopupMessage(error?.value?.statusMessage)
      if(data.value) profile.value = data.value;
      if(error.value) throw error.value
      
    } catch (err) {
      console.log(err);
      throw createError({ 
        statusCode: err.statusCode,
        statusMessage: err.statusMessage,
        stack: null
      })
    }
  }

  return {
    profile, fetchProfile
  }
}
