export const ZundamonVoice = async (text: string) => {
  const response_query = await fetch(`http://localhost:50021/audio_query?text=${text}&speaker=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data_query = await response_query.json();

  const response_audio = await fetch("http://localhost:50021/synthesis?speaker=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_query),
  });
  const audioContext = new AudioContext();
  audioContext.decodeAudioData(await response_audio.arrayBuffer(), (buffer) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
    source.onended = () => {
      return;
    };
  });
};
