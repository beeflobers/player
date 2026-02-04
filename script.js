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

  async function realizarBusca () {
   
    const inputElement = document.getElementById('buscar');
    const termoPesquisado = inputElement.value;
    const icone = document.getElementById ('botão-controle');

    try {
      const resposta = await fetch(`https://saavn.sumit.co/api/search?query=${termoPesquisado}`);
      
      if (!resposta.ok) {
        throw new Error('Erro na rede');
      }
      
    const dados = await resposta.json();

    if (dados.data && dados.data.songs && dados.data.songs.results.length > 0) {
    const musica = dados.data.songs.results[0]; 

    
    document.getElementById('capa').src = musica.image[2].url;
    document.getElementById('Nome-musica').innerText = musica.title;
    
    const som = document.getElementById('musica');
    som.src = musica.downloadUrl[0].url;
      som.play();
      icone.classList.replace('fa-play', 'fa-pause');
    }

  }
    catch (error) {
      console.log("Ops, algo deu errado:", error);
    }
  }