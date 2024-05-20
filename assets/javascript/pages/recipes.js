
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
    document.addEventListener("DOMContentLoaded", function () {
        const audioPlayer = document.getElementById('audioPlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const radioSelectBtn = document.getElementById('radioSelectBtn');
        const currentRadioEl = document.getElementById('currentRadio');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        
        const volumeControl = document.getElementById('volumeControl');
        const radioMenu = document.getElementById('radioMenu');
        const radioCloseBtn = document.getElementById('radioCloseBtn');
        const radioInputs = document.querySelectorAll('input[name="radios"]');
        const musicIcon = document.getElementById('musicIcon');
        const playerContainer = document.getElementById('playerContainer');
    
        playPauseBtn.addEventListener('click', togglePlayPause);
        radioSelectBtn.addEventListener('click', toggleRadioMenu);
        radioCloseBtn.addEventListener('click', closeRadioMenu);
        
        musicIcon.addEventListener('click', togglePlayerVisibility);
    
        volumeControl.addEventListener('input', () => {
            audioPlayer.volume = volumeControl.value;
        });
    
        audioPlayer.addEventListener('timeupdate', updateProgress);
    
        radioInputs.forEach(input => {
            input.addEventListener('change', changeRadio);
            input.style.appearance = 'none'; // Remover a bolinha de seleção padrão
        });
    
        // Set default radio to Hunter Pop without playing automatically
        document.getElementById('Hunter Pop').checked = true;
        audioPlayer.src = document.getElementById('Hunter Pop').value;
        currentRadioEl.textContent = 'Rádio Atual: Hunter Pop';
    
        function togglePlayPause() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.textContent = 'Pause';
                durationEl.textContent = 'AO VIVO';
                durationEl.classList.add('live');
            } else {
                audioPlayer.pause();
                playPauseBtn.textContent = 'Play';
                durationEl.textContent = 'Pausado';
                durationEl.classList.remove('live');
            }
        }
    
        function toggleRadioMenu() {
            radioMenu.style.display = radioMenu.style.display === 'none' ? 'block' : 'none';
        }
    
        function closeRadioMenu() {
            radioMenu.style.display = 'none';
        }
    
        function togglePlayerVisibility() {
            playerContainer.style.display = playerContainer.style.display === 'none' ? 'flex' : 'none';
            // Fechar o menu de seleção de rádio quando o player é exibido
            if (playerContainer.style.display === 'flex') {
                closeRadioMenu();
            }
        }
    
        function seek() {
            const seekTime = (seekBar.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        }
    
        function updateProgress() {
            const currentTime = formatTime(audioPlayer.currentTime);
            currentTimeEl.textContent = currentTime;
            seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        }
    
        function changeRadio() {
            const selectedRadio = document.querySelector('input[name="radios"]:checked');
            audioPlayer.pause();
            audioPlayer.src = selectedRadio.value;
            currentRadioEl.textContent = 'Rádio Atual: ' + selectedRadio.id;
            playPauseBtn.textContent = 'Play';
            durationEl.textContent = 'Pausado';
            durationEl.classList.remove('live');
            closeRadioMenu();
        }
    
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    });