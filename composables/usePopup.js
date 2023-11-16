export function usePopup() {
  const popupMessage = useState('popupMessage', () => null);

  function setPopupMessage(message) {
    if (!message) return;
    popupMessage.value = message;
  }

  function closePopup() {
    popupMessage.value = null;
  }

  return {
    popupMessage, setPopupMessage,
    closePopup,
  }
}
