export function copyToClipboard(text: string, successMessage: string, errorMessage: string) {
  if (!navigator.clipboard) {
    alert('Clipboard API not supported. Please copy manually.');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      console.log(successMessage);
      // alert(successMessage);
    })
    .catch(err => {
      console.error(errorMessage, err);
      alert(errorMessage);
    });
}
