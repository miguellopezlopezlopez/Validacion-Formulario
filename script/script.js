document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const dniInput = document.getElementById("dni");
    const errorDNI = document.getElementById("error-dni");
    const botonLimpiar = document.getElementById("limpiar");
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellidos");
    const errorNombre = document.getElementById("error-nombre");
    const errorApellido = document.getElementById("error-apellidos");
    const correoInput = document.getElementById("email");
    const errorCorreo = document.getElementById("error-email");

    // URL del Webhook
  const webhookURL = "https://webhook.site/db860d64-d58a-4b10-b265-5b577ed19186";
  
    // Validar DNI
    function validarDNI(dni) {
      const dniFormato = /^\d{8}[A-Za-z]$/;
      const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
  
      if (!dniFormato.test(dni)) {
        errorDNI.textContent = "El DNI no cumple con el algoritmo de validación o formato (8 dígitos y una letra).";
        errorDNI.style.display = "block";
        return false;
      }
  
      const numero = parseInt(dni.slice(0, 8), 10);
      const letra = dni.charAt(8).toUpperCase();
  
      if (letrasValidas[numero % 23] !== letra) {
        errorDNI.textContent = "La letra no coincide con el número del DNI.";
        errorDNI.style.display = "block";
        return false;
      }
  
      errorDNI.textContent = "";
      errorDNI.style.display = "none";
      return true;
    }
  
    // Validar Nombre
    function validarNombre(nombre) {
      nombre = nombre.trim();
      const formato = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  
      if (nombre.length < 3 || nombre.length > 20) {
        errorNombre.textContent = "El nombre debe tener entre 3 y 20 caracteres.";
        errorNombre.style.display = "block";
        return false;
      }
  
      if (!formato.test(nombre)) {
        errorNombre.textContent = "Debes introducir valores alfabéticos.";
        errorNombre.style.display = "block";
        return false;
      }
  
      errorNombre.textContent = "";
      errorNombre.style.display = "none";
      return true;
    }
  
    // Validar Apellido
    function validarApellido(apellido) {
      apellido = apellido.trim();
      const formato = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  
      if (apellido.length < 3 || apellido.length > 20) {
        errorApellido.textContent = "El apellido debe tener entre 3 y 20 caracteres.";
        errorApellido.style.display = "block";
        return false;
      }
  
      if (!formato.test(apellido)) {
        errorApellido.textContent = "Debes introducir valores alfabéticos.";
        errorApellido.style.display = "block";
        return false;
      }
  
      errorApellido.textContent = "";
      errorApellido.style.display = "none";
      return true;
    }
  
    // Validar Correo
    function validarCorreo(correo) {
      correo = correo.trim();
      const correoFormato = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!correoFormato.test(correo)) {
        errorCorreo.textContent = "Debes introducir un correo válido (ejemplo: usuario@dominio.com).";
        errorCorreo.style.display = "block";
        return false;
      }
  
      errorCorreo.textContent = "";
      errorCorreo.style.display = "none";
      return true;
    }
  
    // Eventos al perder el foco (blur)
    dniInput.addEventListener("blur", () => {
      validarDNI(dniInput.value);
    });
  
    nombreInput.addEventListener("blur", () => {
      validarNombre(nombreInput.value);
    });
  
    apellidoInput.addEventListener("blur", () => {
      validarApellido(apellidoInput.value);
    });
  
    correoInput.addEventListener("blur", () => {
      validarCorreo(correoInput.value);
    });
    // Validar formulario completo
function validarFormulario() {
    let esValido = true;
  
    if (!validarDNI(dniInput.value)) esValido = false;
    if (!validarNombre(nombreInput.value)) esValido = false;
    if (!validarApellido(apellidoInput.value)) esValido = false;
    if (!validarCorreo(correoInput.value)) esValido = false;
  
    return esValido; 
  }
  
    
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();
      
        if (!validarFormulario()) {
          return; // Si hay algún error para el envío
        }
      
        // Preparar los datos a enviar
        const datos = {
          dni: dniInput.value,
          nombre: nombreInput.value,
          apellidos: apellidoInput.value,
          correo: correoInput.value,
          fechaHora: document.getElementById("fecha_hora").value,
          sexo: document.getElementById("sexo").value,
          motivo: document.getElementById("motivo").value,
        };
      
        try {
          // Enviar los datos al webhook
          const respuesta = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
          });
      
          // Revisar el estado de la respuesta
          if (respuesta.ok) {
            alert("Formulario enviado correctamente.");
            formulario.reset(); // Reinicia el formulario después del envío exitoso
          } else {
            // Si el servidor devuelve un error (no HTTP 2xx)
            alert(`Error al enviar el formulario: ${respuesta.status} ${respuesta.statusText}`);
          }
        } catch (error) {
          // Captura errores de red u otros problemas
          console.error("Error al enviar los datos:", error);
          alert("Ocurrió un error al intentar enviar los datos.");
        }
      });
      
  
    // Botón de limpiar
    botonLimpiar.addEventListener("click", () => {
      formulario.reset();
  
      const mensajes = document.querySelectorAll(".error-message");
      mensajes.forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
      });
    });
  });
  