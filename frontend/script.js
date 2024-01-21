document.addEventListener('DOMContentLoaded', function () {
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const outputDiv = document.getElementById('output');
    const languageSelector = document.getElementById('languageSelector');
    const translateBtn = document.getElementById('translate');
    const translationOutputDiv = document.getElementById('translationOutput');

    let recognition;
    let isRecording = false;

    try {
        recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    } catch (e) {
        console.error('Speech recognition not supported.');
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en';

    recognition.onresult = function (event) {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        outputDiv.textContent = finalTranscript;

        // Check for the trigger word "help"
        checkForHelpTrigger(finalTranscript.toLowerCase());
    };

    recognition.onend = function () {
        isRecording = false;
    };

    startRecordingBtn.addEventListener('click', function () {
        if (!isRecording) {
            recognition.start();
            isRecording = true;
            document.body.style.backgroundColor = 'green'; // Change color to green
        }
    });

    stopRecordingBtn.addEventListener('click', function () {
        if (isRecording) {
            recognition.stop();
            isRecording = false;
        }
    });

    translateBtn.addEventListener('click', function () {
        const textToTranslate = outputDiv.textContent;
        const selectedLanguage = languageSelector.value;

        // This is a simplified example, you would need to replace this with actual translation API calls
        const translatedText = translate(textToTranslate, selectedLanguage);
        translationOutputDiv.textContent = translatedText;
    });


    function checkForHelpTrigger(transcript) {
        if (transcript.includes('help')) {//..............
            // Triggered action for help command
            document.body.style.backgroundColor = 'red';
            alert('Emergency! Calling 911...');
            // Add additional actions or API calls as needed
        }
    }
});
