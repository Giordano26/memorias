document.getElementById('start-button').addEventListener('click', function() {
    var introContainer = document.getElementById('intro-container');
    var mediaContainer = document.getElementById('media-container');
    var infiniteVideo = document.getElementById('infiniteVideo');
    var infiniteAudio = document.getElementById('infiniteAudio');
    
    
    mediaContainer.classList.add('fade-in');
    if (infiniteVideo.paused) {
        infiniteVideo.play();
    }
    
    
     
     setTimeout(function() {
        mediaContainer.classList.add('show');
    }, 500);

    introContainer.style.display = 'none';
    mediaContainer.style.display = 'block';

    // Verifica se o vídeo já foi pausado para evitar reiniciar a reprodução ao clicar várias vezes no botão
    if (infiniteVideo.paused) {
        infiniteVideo.play();
    }

    // Adiciona um listener para pausar o vídeo quando terminar
    infiniteVideo.addEventListener('ended', function() {
        infiniteVideo.currentTime = 0;
        infiniteVideo.pause();
    });

    // Verifica se o áudio já foi pausado e tenta reproduzir
    if (infiniteAudio.paused) {
        // Desliga o som inicialmente
        infiniteAudio.muted = true;

        // Tenta reproduzir o áudio desmutado em resposta à ação do usuário
        document.addEventListener('click', function enableAudio() {
            infiniteAudio.muted = false;
            infiniteAudio.play().catch(function(error) {
                // Se houver um erro ao tentar reproduzir, tentamos novamente desmutando e reproduzindo
                if (error.name === 'NotAllowedError') {
                    infiniteAudio.muted = true;
                    infiniteAudio.play();
                }
            });

            // Remove o listener após a primeira interação
            document.removeEventListener('click', enableAudio);
        });
    }

    // Adiciona um listener para pausar o áudio quando terminar
    infiniteAudio.addEventListener('ended', function() {
        infiniteAudio.currentTime = 0;
        infiniteAudio.pause();
    });
});