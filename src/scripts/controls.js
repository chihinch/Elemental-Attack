const addKeydownListener = () => {
  document.addEventListener('keydown', handleKeyDown);
};

const keyDownListener = (event) => {
  switch (event.key) {
    case " ":
    default:
      return;
  }
};

export { addKeydownListener };