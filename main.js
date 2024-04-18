document.addEventListener("DOMContentLoaded", function () {
  const OrdenText = document.getElementById("orden");
      
        function leerDatos() {
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
              const ultimo = data[data.length -1];
              console.log('Ultimo Registro en MockAPI', ultimo);

              OrdenText.textContent = ultimo.comando;
            }
              
          })
          .catch(error => console.error('Error al obtener registros del MockAPI:', error));
      }

      setInterval(leerDatos, 2000);
      
    });
