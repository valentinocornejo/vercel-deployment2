import React, { useState, useEffect } from "react";
import Quagga from "quagga/dist/quagga.js";

export const Homepage = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const activateQuagga = async () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 640,
            height: 480,
          },
        },
        decoder: {
          readers: ["code_128_reader", "upc_reader"],
        },
      },
      async function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Register a callback for the detected event
        Quagga.onDetected((result) => {
          const code = result.codeResult.code;
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          console.log("Barcode detected:", code);
          Quagga.stop();
          sendBarcodeToBackend(code);
          // Add any additional logic you want to perform when a barcode is detected
        });

        // Register a callback for the processed event
        Quagga.onProcessed((result) => {
          const drawingCtx = Quagga.canvas.ctx.overlay;
          const drawingCanvas = Quagga.canvas.dom.overlay;

          if (result) {
            if (result.boxes) {
              drawingCtx.clearRect(
                0,
                0,
                parseInt(drawingCanvas.getAttribute("width")),
                parseInt(drawingCanvas.getAttribute("height"))
              );
              result.boxes
                .filter((box) => box !== result.box)
                .forEach((box) => {
                  Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                    color: "green",
                    lineWidth: 2,
                  });
                });
            }

            if (result.box) {
              Quagga.ImageDebug.drawPath(
                result.box,
                { x: 0, y: 1 },
                drawingCtx,
                {
                  color: "blue",
                  lineWidth: 2,
                }
              );
            }

            if (result.codeResult && result.codeResult.code) {
              Quagga.ImageDebug.drawPath(
                result.line,
                { x: "start", y: "start" },
                drawingCtx,
                { color: "red", lineWidth: 2 }
              );
            }
          }
        });
      }
    );
  };

  const sendBarcodeToBackend = async (code) => {
    console.log("Enviando código de barras al backend:", code);

    try {
      console.log(code);
      const response = await fetch(
        "http://localhost:3002/products/scanbarcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ barcode: code }),
        }
      );

      if (response.ok) {
        console.log("Respuesta del backend:", await response.json());
      } else {
        console.error("Error al enviar el código de barras al backend");
      }
    } catch (error) {
      console.error("Error al enviar el código de barras al backend:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/borrarcookies", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setLogoutSuccess(true);
        setTimeout(() => (window.location.href = "/login"), 1000);
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenido a la Página de Inicio</h1>
      <div id="scanner-container" style={{ width: 640, height: 480 }}></div>
      <button onClick={activateQuagga}>Start Quagga</button>
      {logoutSuccess && (
        <p style={{ color: "green" }}>Sesión cerrada con éxito.</p>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};
