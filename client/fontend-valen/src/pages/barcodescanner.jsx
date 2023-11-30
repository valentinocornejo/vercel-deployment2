import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

export const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  let quaggaInstance;

  useEffect(() => {
    const initializeQuagga = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        quaggaInstance = Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector('#barcode-scanner'),
            },
            decoder: {
              readers: ['ean_reader', 'upc_reader', 'code128_reader'],
            },
          },
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Initialization finished. Ready to start');
            Quagga.start();
          }
        );

        Quagga.onDetected((result) => {
          const barcodeData = result.codeResult.code;
          setBarcode(barcodeData);
          console.log('Barcode detected:', barcodeData);
        });

        return () => {
          if (quaggaInstance && quaggaInstance.started) {
            Quagga.stop();
            stream.getTracks().forEach((track) => track.stop());
          }
        };
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    if (scannerActive) {
      initializeQuagga();
    } else {
      if (quaggaInstance && quaggaInstance.started) {
        Quagga.stop();
        setBarcode(null);
      }
    }

    // Cleanup on component unmount
    return () => {
      if (quaggaInstance && quaggaInstance.started) {
        Quagga.stop();
      }
    };
  }, [scannerActive]);

  const toggleScanner = () => {
    setScannerActive((prevScannerActive) => !prevScannerActive);
    setBarcode(null);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <button onClick={toggleScanner}>
        {scannerActive ? 'Deactivate Scanner' : 'Activate Scanner'}
      </button>
      <div id="barcode-scanner" style={{ width: '100%', height: '100%' }}></div>
      {barcode && <p>Barcode Detected: {barcode}</p>}
    </div>
  );
};



