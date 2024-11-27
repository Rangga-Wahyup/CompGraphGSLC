const imageUpload = document.getElementById('imageUpload');
const effectSelect = document.getElementById('effect');
const convertButton = document.querySelector('button');

convertButton.addEventListener('click', () => {
  const file = imageUpload.files[0];
  
  if (!file) {
    alert('Please select an image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const effect = effectSelect.value;

      if (effect === 'grayscale') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (effect === 'blur') {
        // Implement blur effect here (e.g., using a convolution matrix)
        // ...
      }

      // Display the result in a new tab
      const resultWindow = window.open();
      resultWindow.document.body.appendChild(canvas);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});