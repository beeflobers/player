const btn = document.getElementById('botão-controle')
const pauseIcon = btn.querySelector('.Pause')
const playIcon = btn.querySelector('.Play')



const botão = document.getElementById('botão-controle')
const som = document.getElementById("musica")
const barra = document.getElementById('barra-progresso')
const pesquisar = document.getElementById ('pesquisar')
const rotação = document.querySelector('.ativargiro')
const Player = document.querySelector('.FundoPlayer')



 
pesquisar.addEventListener("click", () => {
buscar()
  Player.classList.add('rotacao')
})

window.addEventListener('keypress', () => {
  if (event.key === 'Enter')
    Player.classList.add('rotacao')
})




botão.addEventListener("click", () => { 
    if (som.paused) {
        som.play(); 
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block'
        Player.classList.add('rotacao')
        
    } else {
        som.pause();
        playIcon.style.display = 'inline-block'
        pauseIcon.style.display = 'none'
        Player.classList.remove('rotacao')
        
    }
});

som.addEventListener('ended', () => { 
  playIcon.style.display = 'inline-block';
  pauseIcon.style.display = 'none';
  barra.value = 0;
  Player.classList.remove('rotacao')

});

som.addEventListener('play', () => { 
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline-block'
  Player.classList.add('rotacao')

});

som.addEventListener('timeupdate',() => {

  if (som.duration) { 
    barra.value = (som.currentTime/ som.duration) * 100
  }
  });

  barra.addEventListener("input", () => {
   if (som.duration) {
      som.currentTime =(barra.value/100)*som.duration
   }
  });


const InfoMusic = (musica, icone) => {
          
                const imagem = document.getElementById('capa');
                imagem.src = musica.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");

                const cantor = document.getElementById('Nome-cantor');
                cantor.innerText = musica.artistName

                const melodia = document.getElementById('Nome-musica');
                melodia.innerText = musica.trackName

                const som = document.getElementById('musica');
                som.src = musica.previewUrl;

                som.play();
                icone.classList.replace('fa-play', 'fa-pause');
              }

    function buscar() {
    const buscar = document.getElementById('buscar').value;
    const icone = document.getElementById ('botão-controle');
    const direita = document.querySelector('.Direita')
    const esquerda = document.querySelector('.Esquerda')
    

     $.ajax({ // declara a função da bliblioteca jquery, 
        url: "https://itunes.apple.com/search", // o endpoit ou url do itunes para buscar
        data: { // o objeto data pega/contém os filtros da pesquisa 
            term: buscar, // term é o campo de busca da apple, para buscar o meu valor de busca 
            media: "music", // define oque eu quero na pesquisa, músicas 
            limit: 10 // define um limite de 10 musicas para a pesquisa 
      },
      dataType: "jsonp", // transforma os dados em um script, usa o jsonp // https://itunes.apple.com/search?term=valor_de_busca&media=music&limit=10
      success:function(data) { // caso sucesso recebe os dados de volta e coloca na função  data 
      try {
         if (data.results) {
                let musica = data.results[0];
                InfoMusic(musica, icone)

                let resultados = data.results
                let musicasindex = 0
                let musicas = resultados[musicasindex]

                direita.addEventListener('click', () => {
               if (musicasindex >= resultados.length - 1) {
            } else {
              musicasindex++

            } InfoMusic(resultados[musicasindex], icone)
          })

          esquerda.addEventListener('click', () => {
               if (musicasindex <= resultados.length - 1) {
                musicasindex--
            }  
             InfoMusic(resultados[musicasindex], icone)
          })

            } else {
                console.log("Nenhuma música encontrada.");
            }

        } catch (error) {
            console.log("Ops, algo deu errado:", error);
        }
    },
    error: function(xhr, status, error) {  
        console.log("Erro na requisição:", error);
    }
})
  
 }
     

// A api do itunes não aceita não aceita as requsições do meu localhost da erro de cors, para a função de busca funcionar é preciso usar uma função da bliblioteca do jquery 
// o jsonp que transforma  uma requisição em um script do tipo get, que é as informações na url 


