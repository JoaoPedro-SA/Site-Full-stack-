const cards = document.querySelectorAll('.button');
cards.forEach(card => {
     card.addEventListener('mouseenter', (e) => {
        //   console.log(e.currentTarget);
          var DivPai = e.currentTarget.parentElement;
        //   console.log(DivPai);
          var play = DivPai.querySelector('.button_play');
          if (play.style.display === 'none'){
               play.style.display = 'block';
          }
          else {
               play.style.display = 'none';
          }
     });

     card.addEventListener('click', (e) => {
        // console.log(e.currentTarget);
        var DivPai = e.currentTarget.parentElement;
        // console.log(DivPai);
        var play = DivPai.querySelector('.button_play');
        if (play.style.display === 'none'){
             play.style.display = 'block';
        }
        else {
             play.style.display = 'none';
        }
   });

});


cards.forEach(card => {
     card.addEventListener('mouseleave', (e) => {
        //   console.log(e.currentTarget);
          var DivPai = e.currentTarget.parentElement;
        //   console.log(DivPai);
          var play = DivPai.querySelector('.button_play');
          if (play.style.display === 'none'){
               play.style.display = 'block';
          }
          else {
               play.style.display = 'none';
          }
     });
});

fechar_music = () => {
const audio = document.querySelectorAll('.audio');
audio.forEach(audio => {
     audio.style.display = 'none';
     
 });
}

document.querySelectorAll('.button_play').forEach(button => {
     button.addEventListener('click', (e) => {
         const elementoPai = e.currentTarget.closest('.flex');
         const audio = elementoPai.querySelector('.audio');
         const canva = document.querySelector('#canvas');
         if (audio.style.display === 'none' || audio.style.display === '') {
             fechar_music();
             audio.style.display = 'block';
             canva.style.display = 'block'
         } else {
             audio.style.display = 'none';
             canva.style.display = 'none'
             audio.pause();
         }
     });
 });


 const audioElements = document.querySelectorAll('audio');
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 
 // canvas.width = window.innerWidth;
 // canvas.height = window.innerHeight;
 
 const audioContext = new (window.AudioContext || window.webkitAudioContext)();
 const analyser = audioContext.createAnalyser();
 analyser.fftSize = 256;
 const bufferLength = analyser.frequencyBinCount;
 const dataArray = new Uint8Array(bufferLength);
 
 audioElements.forEach(audioElement => {
     const audioSource = audioContext.createMediaElementSource(audioElement);
     audioSource.connect(analyser);
     analyser.connect(audioContext.destination);
 
     audioElement.addEventListener('play', () => {
         draw();
     });
 
     audioElement.addEventListener('pause', () => {
         cancelAnimationFrame(draw);
     });
 
     audioElement.addEventListener('ended', () => {
         cancelAnimationFrame(draw);
     });
 });
 
 let hue = 0;
 
 function draw() {
     requestAnimationFrame(draw);
 
     analyser.getByteFrequencyData(dataArray);
    //  let cor = '10, 19, 95';
    // //  ctx.fillStyle = `rgba(${cor}, 0.2)`;
    let cor = '0, 0, 0';
     ctx.fillStyle = `rgba(${cor}, 1)`;
     ctx.fillRect(0, 0, canvas.width, canvas.height);
 
     const barWidth = (canvas.width / bufferLength) * 2.5;
     let barHeight;
     let x = 0;
 
     for (let i = 0; i < bufferLength; i++) {
         barHeight = dataArray[i];
 
         ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
         ctx.fillRect(x, canvas.height - barHeight / 1.8, barWidth, barHeight / 1.8);
 
         x += barWidth + 2;
     }
 
     hue += 1;
     if (hue >= 360) {
         hue = 0;
     }
 }
 


