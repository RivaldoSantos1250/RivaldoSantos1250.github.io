document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const radioSelectBtn = document.getElementById('radioSelectBtn');
    const currentRadioEl = document.getElementById('currentRadio');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const seekBar = document.getElementById('seekBar');
    const volumeControl = document.getElementById('volumeControl');
    const radioMenu = document.getElementById('radioMenu');
    const radioCloseBtn = document.getElementById('radioCloseBtn');
    const radioInputs = document.querySelectorAll('input[name="radios"]');

    playPauseBtn.addEventListener('click', togglePlayPause);
    radioSelectBtn.addEventListener('click', toggleRadioMenu);
    radioCloseBtn.addEventListener('click', closeRadioMenu);
    seekBar.addEventListener('input', seek);

    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value;
    });

    audioPlayer.addEventListener('timeupdate', updateProgress);

    radioInputs.forEach(input => {
        input.addEventListener('change', changeRadio);
        // Remover a bolinha de seleção padrão dos botões de rádio
        input.style.appearance = 'none';
        input.style.webkitAppearance = 'none';
        input.style.mozAppearance = 'none';
    });

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
        radioMenu.classList.toggle('show');
    }

    function closeRadioMenu() {
        radioMenu.classList.remove('show');
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
        if (!audioPlayer.paused) {
            audioPlayer.pause(); // Pausar automaticamente ao selecionar outra rádio
            playPauseBtn.textContent = 'Play';
            durationEl.textContent = 'Pausado';
            durationEl.classList.remove('live');
        }
        audioPlayer.src = selectedRadio.value;
        currentRadioEl.textContent = 'Rádio Atual: ' + selectedRadio.id;
        closeRadioMenu();
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
