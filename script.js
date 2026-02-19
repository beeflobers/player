const btn = document.getElementById('botão-controle');
const playIcon = btn.querySelector('.Play');
const pauseIcon = btn.querySelector('.Pause');



const botão = document.getElementById('botão-controle'); 
const som = document.getElementById("musica");
const barra = document.getElementById('barra-progresso');
const pesquisar = document.getElementById ('pesquisar')


pesquisar.addEventListener("click", () => {
  buscar();
  });

botão.addEventListener("click", () => { 
    if (som.paused) {
        som.play(); 
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
    } else {
        som.pause();
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    }
});

som.addEventListener('ended', () => { 
  playIcon.style.display = 'inline-block';
  pauseIcon.style.display = 'none';
  barra.value = 0;

});

som.addEventListener('play', () => { 
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline-block';

});

som.addEventListener('timeupdate',() => {

  if (som.duration) { 
    barra.value = (som.currentTime/ som.duration) * 100;
  }
  });

  barra.addEventListener("input", () => {
   if (som.duration) {
      som.currentTime =(barra.value/100)*som.duration;
   }
  });





    async function buscar() {
    const buscar = document.getElementById('buscar').value;
    const icone = document.getElementById ('botão-controle');

    const urllamba = 'https://bmkfldnlyu7arv5swreozju5ne0wlmlw.lambda-url.us-east-1.on.aws/'

     try {
      const resposta = await fetch (`${urllamba}?artist=${encodeURIComponent(buscar)}`);
      
      if (!resposta.ok) {
        throw new Error('Erro na rede');
      }

    const dados = await resposta.json();
    const musica = dados.results[0];
    

    const imagem = document.getElementById('capa'); 
    imagem.src = musica.artworkUrl100.replace("100x100bb.jpg","600x600bb.jpg");
  

    const titulo = document.getElementById('Nome-musica');
    titulo.innerText = musica.trackName;

    const som = document.getElementById('musica')
    som.src = musica.previewUrl;

    som.play();
    icone.classList.replace('fa-play', 'fa-pause ');
    }

    catch (error) {
      console.log("Ops, algo deu errado:", error);
    }
  }
