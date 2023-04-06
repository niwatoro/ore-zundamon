export const generateVoicevoxVoice = async (text: string) => {
  const response_query = await fetch(`http://127.0.0.1:50021/audio_query?text=${text}&speaker=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data_query = await response_query.json();

  const response_audio = await fetch("http://127.0.0.1:50021/synthesis?speaker=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_query),
  });
  const audioContext = new AudioContext();
  audioContext.decodeAudioData(await response_audio.arrayBuffer(), (buffer) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 5;
    gainNode.connect(audioContext.destination);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    source.start();
  });
};
