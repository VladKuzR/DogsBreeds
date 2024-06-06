document.addEventListener("DOMContentLoaded", (event) => {
    const photoUpload = document.getElementById('photoInput');
    const photoBox = document.getElementById('file-upload_id');
    const deleteButton = document.getElementById('delete_button');
    const submitButton = document.getElementById('btn_submit');
    const uploadForm = document.getElementById('uploadForm');
    const predictionResult = document.getElementById('predictionResult');
  
    photoUpload.addEventListener('change', () => {
        const file = photoUpload.files[0];
        if (file) {
            photoBox.style.background = `url(${URL.createObjectURL(file)}) center center/cover no-repeat`;
            photoBox.innerHTML = '';
            deleteButton.disabled  = false
            submitButton.disabled  = false
        }
    });
  
    deleteButton.addEventListener('click', () => {
        photoUpload.value = '';
        photoBox.style.background = '';
        photoBox.innerHTML = 'Just upload the photo of your dog here to see the Magic!';
        predictionResult.textContent = 'Prediction will appear here';
        deleteButton.disabled  = true
        submitButton.disabled  = true
  
    });
  
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loader = document.getElementById('loader');
        loader.style.display = 'block';
        if (photoUpload.files.length > 0) {
            const file = photoUpload.files[0];
    
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = btoa(reader.result);
    
                fetch('https://vlad-ds.pro/pred', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ file: base64Data })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from server:', data);
                    loader.style.display = 'none';
                    predictionResult.innerHTML = 'The prediction is <b>' + data['prediction'] + '</b>';
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
            };
            reader.readAsBinaryString(file);
        } else {
            alert('Please upload a photo of your dog.');
        }
    });


  });