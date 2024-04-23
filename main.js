document.addEventListener("DOMContentLoaded", function () {
  const startRecognitionButton = document.getElementById("startRecognition");
  const resultOutput = document.getElementById("orden");
  const vozElement = document.getElementById("IHC");
  let nuevaVentana;

  let textC = ''; //Variable que guardará el comando detectado
  let lastProcessedCommand = ''; // Variable para almacenar el último comando procesado

  const leerDatos = () => {
      const apiUrl = "https://6614d0222fc47b4cf27d170b.mockapi.io/comandos";

      fetch(apiUrl, {
          method: 'GET', // Método HTTP GET para LEER los datos
          headers: {
              'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
          }
      })
      .then(response => response.json())
      .then(data => {
          if (data && data.length > 0){
              const ultimo = data[data.length - 1];
              console.log('Ultimo Registro en MockAPI', ultimo);
              
              // Mostrar el resultado en la página
              resultOutput.textContent = "La orden detectada es " + ultimo.comando;
                textC = ultimo.comando.toLowerCase();

              // Verificar si el nuevo comando es diferente al último comando procesado
              if (ultimo.comando !== lastProcessedCommand) {
                  // Actualizar el último comando procesado
                  lastProcessedCommand = ultimo.comando;

                  // Procesar diferentes comandos según el texto reconocido
                  if (ultimo.comando.includes("aumentar tamaño")) {
                      let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
                      vozElement.style.fontSize = (currentSize + 5) + "px";
                      console.log("Tamaño aumentado.");
                  } else if (ultimo.comando.includes("disminuir tamaño")) {
                      let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
                      vozElement.style.fontSize = (currentSize - 5) + "px";
                      console.log("Tamaño disminuido.");
                  } else if (ultimo.comando.includes("nueva ventana")) {
                      nuevaVentana = window.open("https://online.kadasofsolutions.com/my/courses.php", "_blank");
                      console.log("Nueva ventana abierta.");
                  } else if (ultimo.comando.includes("cerrar ventana")) {
                      nuevaVentana && nuevaVentana.close();
                      console.log("Ventana cerrada.");
                  } else if (ultimo.comando.includes("cerrar navegador")) {
                      window.close();
                      console.log("Navegador cerrado.");
                  } else if (ultimo.comando.includes("aumentar tamaño IHC")) {
                      let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
                      vozElement.style.fontSize = (currentSize + 5) + "px";
                      console.log("Tamaño de IHC aumentado.");
                  } else if (ultimo.comando.includes("disminuir tamaño IHC")) {
                      let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
                      vozElement.style.fontSize = (currentSize - 5) + "px";
                      console.log("Tamaño de IHC disminuido.");
                  }
              }
          }
      })
      .catch(error => console.error('Error al obtener registros del MockAPI:', error));
  };

  setInterval(leerDatos, 2000);
});

