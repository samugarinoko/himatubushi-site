document.addEventListener('DOMContentLoaded', () => {
    const setupArea = document.getElementById('setup-area');
    const testArea = document.getElementById('test-area');
    const timeButtons = document.querySelectorAll('.time-button');
    const timeDisplay = document.getElementById('time-display');
    const startButton = document.getElementById('start-button');
    const resultDisplay = document.getElementById('result');
    const bestRecordDisplay = document.getElementById('best-record'); // 追加

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
            bestRecordDisplay.classList.add('hidden');
            
            // 自己ベストを表示
            loadBestRecord();
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

            // 自己ベストの更新をチェック
            checkAndUpdateBestRecord(deviation);

            // ボタンを元に戻す
            startButton.textContent = '再度スタート';
        }
    });

    // 自己ベストをlocalStorageから読み込む関数
    function loadBestRecord() {
        const bestDeviation = localStorage.getItem(`best-${selectedTime}`);
        if (bestDeviation !== null) {
            bestRecordDisplay.textContent = `自己ベスト：誤差 ${parseFloat(bestDeviation).toFixed(2)}秒`;
            bestRecordDisplay.classList.remove('hidden');
        } else {
            bestRecordDisplay.textContent = `まだ記録はありません`;
            bestRecordDisplay.classList.remove('hidden');
        }
    }

    // 自己ベストをチェックし、必要なら更新する関数
    function checkAndUpdateBestRecord(currentDeviation) {
        const key = `best-${selectedTime}`;
        const bestDeviation = localStorage.getItem(key);

        if (bestDeviation === null || currentDeviation < parseFloat(bestDeviation)) {
            localStorage.setItem(key, currentDeviation);
            alert('自己ベストを更新しました！');
            loadBestRecord(); // 表示を更新
        }
    }

    // 「再度スタート」ボタンのイベントリスナー（前のイベントリスナーを削除し、新しいものを設定）
    startButton.addEventListener('click', () => {
        if (startButton.textContent === '再度スタート') {
            setupArea.classList.remove('hidden');
            testArea.classList.add('hidden');
        }
    });
});
