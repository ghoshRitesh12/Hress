export const useInfoEdit = () => {
  
  const isInfoEditModalOpen = useState('isInfoEditModalOpen', () => false);

  const openInfoEditModal = () => {
    isInfoEditModalOpen.value = true;
    document.body.style.overflowY = 'hidden';
  }

  const closeInfoEditModal = () => {
    isInfoEditModalOpen.value = false;
    document.body.removeAttribute('style');
  }


  return {
    isInfoEditModalOpen,
    openInfoEditModal, closeInfoEditModal,
  }
}
