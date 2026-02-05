const btn = document.getElementById('botão-controle');
const playIcon = btn.querySelector('.Play');
const pauseIcon = btn.querySelector('.Pause');

btn.addEventListener('click', () => {
  if (playIcon.style.display === 'none') {
    // Se o play está escondido, mostra o play e esconde o pause
    playIcon.style.display = 'inline-block';
    pauseIcon.style.display = 'none';
    console.log("Música pausada"); // Aqui você colocaria musica.pause()
  } else {
    // Se o play está visível, esconde ele e mostra o pause
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline-block';
    console.log("Música tocando"); // Aqui você colocaria musica.play()
  }
});

const botão = document.getElementById('botão-controle'); 
const som = document.getElementById("musica");

botão.addEventListener("click", () => { 
    if (som.paused) {
        som.play();   // Se estiver parado, toca
    } else {
        som.pause();  // Se estiver tocando, pausa
    }
});


const barra = document.getElementById('barra-progresso');

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

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const urlApple = `https://itunes.apple.com/search?term=${encodeURIComponent(buscar)}&entity=song&limit=1`;

     try {
      const resposta = await fetch (proxy + urlApple);
      
      if (!resposta.ok) {
        throw new Error('Erro na rede');
      }

    const dados = await resposta.json();
    const musica = dados.results[0];
    

    const imagem = document.getElementById('capa');
    imagem.src = musica.artworkUrl100;

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
