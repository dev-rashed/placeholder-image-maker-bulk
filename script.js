// const canvas = document.getElementById('myCanvas');
document.addEventListener("DOMContentLoaded", () => {

    let productImage = document.querySelectorAll('img');
    productImage.forEach(image => {
        const imgPath = image.getAttribute('src');
        console.log(imgPath);
    });
    // working code 
    let generateImageButton = document.querySelector('#generate_image');
    generateImageButton.addEventListener('click', e => {
        
        let productImage = document.querySelectorAll('img');
        productImage.forEach( image => {
            console.log(image.location.pathname);
            let height = image.naturalHeight;
            let width = image.naturalWidth;
    
            DownloadCanvasAsImage(width, height);
        });
        
    })
})
function DownloadCanvasAsImage(height, width){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', `placeholder-${height}-${width}.jpg`);
    let canvas = document.createElement('canvas');
    canvas.setAttribute('height', height);
    canvas.setAttribute('width', width);
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText("Hello World", width/2, height/2);
    ctx.fillRect( 0, 0, width, height);
    console.log(canvas);
    canvas.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
}