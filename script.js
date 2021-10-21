window.onload = function () {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");
    filesInput.addEventListener("change", function (event) {
      var files = event.target.files;
      var output = document.getElementById("result");
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //Only pics
        if (!file.type.match("image")) continue;
        var picReader = new FileReader();
        picReader.fileName = file.name;
        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          var div = document.createElement("div");
          div.classList.add("thumb_wrapper");
          div.innerHTML =
            "<img class='thumbnail uploaded_image' style='width: 200px' alt='" +
            event.target.fileName +
            "' src='" +
            picFile.result +
            "'" +
            "title='" +
            picFile.fileName +
            "'/>";
          output.insertBefore(div, null);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
    });
  } else {
    console.log("Your browser does not support File API");
  }
};

// working code
let generateImageButton = document.querySelector("#generate_image");
generateImageButton.addEventListener("click", (e) => {
  let productImage = document.querySelectorAll("img.uploaded_image");
  productImage.forEach((image) => {
    let width = image.naturalHeight;
    let height = image.naturalWidth;
    let name = image.getAttribute("alt");

    DownloadCanvasAsImage(width, height, name);
  });
});

function DownloadCanvasAsImage(height, width, name) {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", name);
  let canvas = document.createElement("canvas");
  canvas.setAttribute("height", height);
  canvas.setAttribute("width", width);
  var ctx = canvas.getContext("2d");
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText("Hello World", width / 2, height / 2);
  ctx.fillRect(0, 0, width, height);
  console.log(canvas);
  canvas.toBlob(function (blob) {
    let url = URL.createObjectURL(blob);
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  });
}
