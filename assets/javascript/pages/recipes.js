
        function toggleIngredient(element) {
        const checkbox = element.querySelector('.checkbox');
        const ingredientName = element.querySelector('span');

        // Alternar marcação no checkbox
        checkbox.checked = !checkbox.checked;

        // Adicionar/remover classe de corte no nome do ingrediente
        if (checkbox.checked) {
            ingredientName.classList.add('cut');
        } else {
            ingredientName.classList.remove('cut');
        }
    }
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentMusicIndex = 0;

    const musicList = [
        '/assets/sound/R5.mp3',
        '/assets/sound/R4.mp3',
        '/assets/sound/R1.mp3'
    ];

    function loadMusic(index) {
        audioPlayer.src = musicList[index];
    }

    function playMusic() {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseMusic() {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    function prevMusic() {
        currentMusicIndex = (currentMusicIndex - 1 + musicList.length) % musicList.length;
        loadMusic(currentMusicIndex);
        playMusic();
    }

    function nextMusic() {
        currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
        loadMusic(currentMusicIndex);
        playMusic();
    }

    function toggleMusicPlayer() {
        const musicPlayer = document.querySelector('.music-player');
        musicPlayer.classList.toggle('active');
    }

    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    prevBtn.addEventListener('click', prevMusic);
    nextBtn.addEventListener('click', nextMusic);

    loadMusic(currentMusicIndex);