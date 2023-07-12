export const usePopup = () => {
  
  const popupMessage = useState('popupMessage', () => null);

  const setPopupMessage = (message) => {
    if(!message) return;
    popupMessage.value = message;
  }

  const closePopup = () => {
    popupMessage.value = null;
  }

  return {
    popupMessage, setPopupMessage,
    closePopup,
  }
}
