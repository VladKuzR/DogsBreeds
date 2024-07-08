document.addEventListener("DOMContentLoaded", (event) => {
    const photoUpload = document.getElementById('photoInput');
    const photoBox = document.getElementById('file-upload_id');
    const deleteButton = document.getElementById('delete_button');
    const submitButton = document.getElementById('btn_submit');
    const uploadForm = document.getElementById('uploadForm');
    const predictionResult = document.getElementById('predictionResult');
    const loader = document.getElementById('loader');
    const question_mark = document.getElementById('question_mark');
    const cross = document.getElementById('cross_btn');
    const info_sheet = document.getElementById('info_sheet')

    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVh();
    
    window.addEventListener('resize', setVh);



    
    question_mark.addEventListener('click', () => {
        info_sheet.style.display = 'block';
        setTimeout(() => {
            info_sheet.style.opacity = 1;
        }, 0);
    });
    

    cross.addEventListener('click', ()=>{
        info_sheet.style.opacity = 0;
        setTimeout(() => {
                info_sheet.style.display = 'none';
            }, 500);
    })

    photoUpload.addEventListener('change', () => {
        const file = photoUpload.files[0];
        if (file) {
            photoBox.style.background = `url(${URL.createObjectURL(file)}) center center/cover no-repeat`;
            photoBox.innerHTML = '';
            deleteButton.disabled  = false
            submitButton.disabled  = false
            loader.style.display = 'none';
        }
        predictionResult.textContent = 'Prediction will appear here';
        predictionResult.style.display = 'none';
    });
  
    deleteButton.addEventListener('click', () => {
        photoUpload.value = '';
        photoBox.style.background = '';
        photoBox.innerHTML = 'Just upload the photo of your dog here to see the Magic!';
        predictionResult.textContent = 'Prediction will appear here';
        predictionResult.style.display = 'none';
        deleteButton.disabled  = true
        submitButton.disabled  = true
        loader.style.display = 'none';
  
    });
  
    // uploadForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     loader.style.display = 'flex';
    //     submitButton.disabled = true; 
    //     if (photoUpload.files.length > 0) {
    //         const file = photoUpload.files[0];
    
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const base64Data = btoa(reader.result);
    
    //             fetch('https://vlad-ds.pro/pred', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ file: base64Data })
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('Response from server:', data);
    //                 loader.style.display = 'none';
    //                 predictionResult.style.display = 'flex';
    //                 predictionResult.innerHTML = 'The prediction is <br/><b>' + data['prediction'] + '</b>';
    //                 submitButton.disabled = false;
    //             })
    //             .catch(error => {
    //                 console.error('Error uploading file:', error);
    //                 submitButton.disabled = false;
    //             });
    //         };
    //         reader.readAsBinaryString(file);
    //     } else {
    //         alert('Please upload a photo of your dog.');
    //         submitButton.disabled = false;
    //     }
    // });

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loader.style.display = 'flex';
        submitButton.disabled = true; 
        if (photoUpload.files.length > 0) {
            const file = photoUpload.files[0];
    
            // Log original file size
            console.log('Original file size:', file.size, 'bytes');
    
            const img = new Image();
            img.onload = function() {
                console.log('Original dimensions:', img.width, 'x', img.height);
    
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                let newWidth, newHeight;
    
                // Check if the image needs compression
                if (img.width > 1024 || img.height > 1024 || file.size > 1000000) {
                    // Resize the image
                    const aspectRatio = img.width / img.height;
                    if (img.width > img.height) {
                        newWidth = Math.min(img.width, 1024);
                        newHeight = newWidth / aspectRatio;
                    } else {
                        newHeight = Math.min(img.height, 1024);
                        newWidth = newHeight * aspectRatio;
                    }
                } else {
                    // Keep original dimensions if the image is small
                    newWidth = img.width;
                    newHeight = img.height;
                }
    
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
                canvas.toBlob((blob) => {
                    console.log('New file size:', blob.size, 'bytes');
                    console.log('New dimensions:', newWidth, 'x', newHeight);
    
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
                            predictionResult.style.display = 'flex';
                            predictionResult.innerHTML = 'The prediction is <br/><b>' + data['prediction'] + '</b>';
                            submitButton.disabled = false;
                        })
                        .catch(error => {
                            console.error('Error uploading file:', error);
                            submitButton.disabled = false;
                        });
                    };
                    reader.readAsBinaryString(blob);
                }, 'image/jpeg', 0.8); // Adjust quality as needed
            };
            img.src = URL.createObjectURL(file);
        } else {
            alert('Please upload a photo of your dog.');
            submitButton.disabled = false;
        }
    });


  });