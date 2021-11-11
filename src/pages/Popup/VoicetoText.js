import React, { useEffect, useState, useRef } from 'react';
const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const VoicetoText = () => {
  const [islistening, Setislistening] = useState(false);
  const [Trans, SetTranscirpt] = useState('');
  const isFirstRender = useRef(true);

  const handleListen = () => {
    console.log('listening?', islistening);

    if (islistening) {
      recognition.start();
      recognition.onend = () => {
        console.log('...continue listening...');
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log('Stopped listening per click');
      };
    }
    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error);
    };

    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else finalTranscript += transcript;
      }

      SetTranscirpt(finalTranscript);
      recognition.onstart = () => {
        console.log('Listening!');
      };
    };
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
    } else handleListen();
  }, [islistening]);
  const toggleListen = () => {
    Setislistening(!islistening);
  };
};

export default VoicetoText;
