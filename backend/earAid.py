import speech_recognition as sr

def convert_audio_to_text(audio_file_path):
   
    recognizer = sr.Recognizer()

  
    with sr.AudioFile(audio_file_path) as audio_file:
    
        recognizer.adjust_for_ambient_noise(audio_file)

        audio_data = recognizer.record(audio_file)

        try:
           
            text = recognizer.recognize_google(audio_data)
            return text
        except sr.UnknownValueError:
            print("Google Web Speech API could not understand audio.")
        except sr.RequestError as e:
            print(f"Could not request results from Google Web Speech API; {e}")

if __name__ == "__main__":
    audio_file_path = '/Users/yogpatel/ai/backend/AudioHelp.wav'
    text_result = convert_audio_to_text(audio_file_path)

    if text_result:
        print("Text from audio: ", text_result)