function handleDownload(button) {
    const row = button.closest('tr');

    const name = row.cells[0].textContent.trim();
    const fileName = 'certificate.jpg';

    downloadCertificateWithName(name, fileName);
}

function downloadCertificateWithName(name, fileName) {
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, canvas.height / 2.2);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = fileName.split('.')[0] + '-' + name.replace(/\s+/g, '-') + '.jpg';
        link.click();
    };
    img.src = '/assets/certificate/certificate.jpg';
                            
}
