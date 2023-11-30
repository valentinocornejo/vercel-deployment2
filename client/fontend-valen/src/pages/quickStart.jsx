import "./styles/quickStart.css";
import React, { useState } from "react";
import axios from "axios";

export const MultiStepForm = () => {
  const { setUserData } = useUser();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Edad: "",
    Alergias: "",
    // Add more form fields here
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Verificar si el campo es "Edad" y asegurarse de que sea un número entero
    if (name === "Edad") {
      const intValue = parseInt(value);
      if (!isNaN(intValue)) {
        // Si es un número válido, actualizar el estado
        setFormData({ ...formData, [name]: intValue });
      }
    } else {
      // Para otros campos, simplemente actualizar el estado
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/quickStart",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Para enviar las cookies
        }
      );

      if (response.status === 200) {
        // Registro exitoso
        console.log(response.data.message);
        window.location.href = "/homepage";
      } else {
        // Registro fallido
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  return (
    <div className="content">
      <div className="Remarco">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div>
              <h1>
                Paso 1:
                <br />
                Ingresa tu nombre
              </h1>{" "}
              <hr />
              <input
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleInputChange}
                placeholder="Nombre..."
                required
              />
              <br />
              <input
                type="text"
                name="Apellido"
                value={formData.Apellido}
                onChange={handleInputChange}
                placeholder="Apellido..."
                required
              />{" "}
              <br />
              <button type="button" onClick={handleNextStep}>
                Siguiente
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1>
                Paso 2: <br />
                Ingresa tus Alergias
              </h1>{" "}
              <hr />
              <input
                type="text"
                name="Alergias"
                value={formData.Alergias}
                onChange={handleInputChange}
                placeholder="Alergias..."
                required
              />{" "}
              <br />
              <div className="flex">
                <button
                  type="button"
                  className="paso2y3boton"
                  onClick={handlePreviousStep}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="paso2y3boton"
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1>
                Paso 3: <br />
                Ingresa tu Edad
              </h1>{" "}
              <hr />
              <input
                type="number"
                name="Edad"
                value={formData.Edad}
                onChange={handleInputChange}
                placeholder="Edad..."
                required
              />{" "}
              <br />
              <div className="flex">
                <button
                  type="button"
                  className="paso2y3boton"
                  onClick={handlePreviousStep}
                >
                  Anterior
                </button>
                <button type="submit" className="paso2y3boton">
                  Entregar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
