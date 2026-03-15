import { useState, useEffect, useRef } from 'react';
import camera from './camera';

const noop = () => {};
export default function Scanner({ onScan = noop, onError = noop, Loading }) {
  const videoEl = useRef(null);
  const pollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const el = videoEl.current;
    function poll() {
      camera.scan(el).then(uris => {
        if (!uris || uris.length <= 0) return;
        setIsAvailable(false)
        clearInterval(pollRef.current);
        onScan(uris);
      });
    }
    function startPolling() {
      pollRef.current = setInterval(poll, 250);
    };

    camera.open(el).then(() => {
      setIsLoading(false);
      startPolling();
    }).catch(() => {
      setIsLoading(false);
      onError();
      setIsAvailable(false)
    });

    return () => {
      clearInterval(pollRef.current);

      if (!el || !el.srcObject) return;
      el.srcObject.getTracks().forEach(t => t.stop());
      el.srcObject = null;
    }
  }, [onScan, onError, videoEl]);

  const isReady = !isLoading && isAvailable;

  return (
    <>
      {isLoading && <Loading />}
      <video 
        className={`${isReady ? '': 'is-hidden'}`}
        ref={videoEl}
        autoPlay
        playsInline
      />
    </>
  );
}
