
export function useActiveToken() {
  const tokenBuffer = useState(() => []);

  const allActiveTokens = useState(() => []);

  async function getGeneratedTokens() {
    try {
      const { setPopupMessage } = usePopup();    
      const { data, error } = await useFetch("/api/account/active-token")

      if (data?.value) {
        allActiveTokens.value = data.value.tokens;
      } else {
        setPopupMessage(error?.value?.statusMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function generateActiveTokens(value) {
    try {
      value.quantity = Number(value.quantity)
      if(isNaN(value.quantity) || value.quantity <= 0) return;

      const { setPopupMessage } = usePopup();
    
      setPopupMessage("Generating active tokens...")
      const { data, error } = await useFetch(
        "/api/account/active-token", 
        {
          method: "POST",
          body: markRaw(value),
        }
      );
  
      if (data?.value) {
        await getGeneratedTokens()
        setPopupMessage(data?.value?.message);
      } else {
        setPopupMessage(error?.value?.statusMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    tokenBuffer,
    allActiveTokens,
    getGeneratedTokens,
    generateActiveTokens,
  }
}
