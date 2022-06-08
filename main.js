let stat = document.querySelector('#stat');
let contrast = document.querySelector('#contrast');
let bright = document.querySelector('#bright');
let sepia = document.querySelector('#sepia');
let gray = document.querySelector('#gray');
let blure = document.querySelector('#blur');
let rotate = document.querySelector('#rotate');
let image = document.querySelector('.image img');
let canvas = document.querySelector('.image #canvas');
let ctx = canvas.getContext('2d');
let buttons = document.querySelector('.buttons');
let reset = document.querySelector('.reset');
let upload = document.querySelector('#upload');
let download = document.querySelector('.download');
let contrallerInput = document.querySelectorAll('.contraller input');
contrallerInput.forEach((ele) => {
       ele.addEventListener('input', () => {
              ctx.filter = `
              saturate(${stat.value / 100})
              contrast(${contrast.value / 20})
              brightness(${bright.value}%)
              sepia(${sepia.value / 100})
              grayscale(${gray.value / 100})
              blur(${blure.value}px)
              hue-rotate(${(rotate.value / 100) * 360}deg)
              `;
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
       });
});

upload.onchange = function () {
       buttons.style.display = 'flex';
       image.style.display = 'block';
       let file = new FileReader();
       file.readAsDataURL(upload.files[0]);
       file.onload = function () {
              image.src = file.result;
              image.onload = function () {
                     canvas.width = image.width;
                     canvas.height = image.height;
                     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                     canvas.style.display = 'block';
                     image.style.display = 'none';
              };
       };
};
reset.onclick = function () {
       stat.value = 100;
       contrast.value = 20;
       bright.value = 100;
       sepia.value = 0;
       gray.value = 0;
       blure.value = 0;
       rotate.value = 0;
       ctx.filter = 'none';
       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};
download.onclick = function () {
       download.href = canvas.toDataURL('image/jpeg');
};
