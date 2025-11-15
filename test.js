const input = document.getElementById('text');
const generateButton = document.getElementById('generate');
const resultSection = document.getElementById('result');
const qrcodeCanvas = document.getElementById('qrcode');
const downloadLink = document.getElementById('download');

generateButton.addEventListener('click', ()=>{
    const text = input.value.trim();
    if(text){
        QRCode.toCanvas(qrcodeCanvas, text, {width:400}, (error) => {
            if(error){
                console.error(error)
                return
            }
            resultSection.classList.add('active')

            const imageDataURL = qrcodeCanvas.toDataURL('image/png');
            downloadLink.href = imageDataURL;
            downloadLink.download = "qrcode.png";
            downloadLink.style.display = 'inline'
        })
    }else{
        alert('Veuillez entrer un texte ou un lien pour générer le QR Code')
    }
})