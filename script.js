let imageQrCode = document.getElementById(imageQrCode);
let qrImage = document.getElementById(qrImage);
let qrText = document.getElementById(qrText);

function generateQRCode (){
    imageQrCode.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
}