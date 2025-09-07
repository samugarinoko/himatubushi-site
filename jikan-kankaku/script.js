document.addEventListener('DOMContentLoaded', () => {
    const setupArea = document.getElementById('setup-area');
    const testArea = document.getElementById('test-area');
    const timeButtons = document.querySelectorAll('.time-button');
    const timeDisplay = document.getElementById('time-display');
    const startButton = document.getElementById('start-button');
    const resultDisplay = document.getElementById('result');

    let selectedTime = 0;
    let startTime = 0;

    // 時間選択ボタンのイベントリスナー
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedTime = parseInt(button.getAttribute('data-time'), 10);
            
            // 画面の切り替え
            setupArea.classList.add('hidden');
            testArea.classList.remove('hidden');

            // タイトルとボタンのテキストを更新
            timeDisplay.textContent = `${selectedTime}秒`;
            startButton.textContent = 'スタート';
            resultDisplay.classList.add('hidden');
        });
    });

    // スタートボタンのイベントリスナー
    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'スタート') {
            // スタート処理
            startButton.textContent = `${selectedTime}秒！`;
            startTime = Date.now();
        } else {
            // 測定終了処理
            const endTime = Date.now();
            const elapsedTimeInSeconds = (endTime - startTime) / 1000;
            const deviation = Math.abs(elapsedTimeInSeconds - selectedTime);

            // 結果の表示
            resultDisplay.textContent = `${elapsedTimeInSeconds.toFixed(2)} / ${selectedTime}秒\n誤差：${deviation.toFixed(2)}秒`;
            resultDisplay.classList.remove('hidden');

            // ボタンを元に戻す
            startButton.textContent = '再度スタート';
            startButton.addEventListener('click', resetTest, { once: true });
        }
    });

    function resetTest() {
        setupArea.classList.remove('hidden');
        testArea.classList.add('hidden');
        resultDisplay.classList.add('hidden');
    }
});
