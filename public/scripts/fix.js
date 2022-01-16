setTimeout(() => {
  console.log('dispatching event');
  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
}, 300);
