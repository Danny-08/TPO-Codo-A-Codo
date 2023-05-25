/* ===Lista de Busqueda=== */ 
function buscar(event) {
    event.preventDefault();
  
    var recetas = document.getElementById("recetas");
    var seleccion = recetas.options[recetas.selectedIndex].value;
    var destino = document.getElementById(seleccion);
   console.log(destino)
   destino.scrollIntoView();
  }
  
   
  // Validar Formulario
  function validarFormulario() {
    // Obtener los valores ingresados por el usuario y recortar
    // los posibles espacios en blanco al principio y al final.
    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value;
   const mensaje = document.querySelector('#mensaje');
    const mensaje1 = document.querySelector("#mensaje1");
    const mensaje2 = document.querySelector("#mensaje2");
    const mensaje3 = document.querySelector("#mensaje3");
  
  
    // Verificar si algún campo está en blanco
    if (nombre === "" || correo === "") {
      mensaje3.textContent = 'Por favor, complete todos los campos del formulario.';
      return false;
    } else {
      mensaje3.textContent = '';
    }
  
    // Verificar si el nombre contiene solo caracteres alfabéticos y espacios
    for (var i = 0; i < nombre.length; i++) {
      var charCode = nombre.charCodeAt(i);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        mensaje1.textContent = "El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.";
        return false;
      } else {
        mensaje1.textContent = '';
      }
    }
  
    // Verificar si el correo electrónico es correcto
    function validarCorreo(correo) {
      if (correo.indexOf('@') < 1) {
        return false; // verificar que el correo contenega al menos un carácter antes del @
      }
      if (correo.lastIndexOf('.') <= correo.indexOf('@') + 1) {
        return false; // verificar que haya al menos un carácter entre el @ y el punto final
      }
      if (correo.lastIndexOf('.') === correo.length - 1) {
        return false; // verificar que el punto final no sea el último carácter del correo
      }
      return true; // si no se cumple ninguna de las condiciones anteriores, el correo es válido
    }
  
    if (!validarCorreo(correo)) {
      mensaje2.textContent = "Por favor, ingrese un correo electrónico válido.";
      return false;
    } else {
      mensaje2.textContent = '';
    }
    // Si todas las validaciones son exitosas, enviar el formulario
    mensaje.textContent = 'Formulario enviado correctamente';
    mensaje1.textContent = '';
    mensaje2.textContent = '';
    return true;

  }

  
  
  /* === Modo Oscuro=== */
  
  const cambiarModoOscuro = () => {
    document.body.classList.toggle('modo-oscuro');
  };
  
  const darkModeToggle = document.querySelector('#cambiar-tema');
  darkModeToggle.addEventListener('click', cambiarModoOscuro);
  
  
  //menú
  const nav = document.querySelector("#nav")
  const abrir = document.querySelector("#abrir")
  const cerrar = document.querySelector("#cerrar")
  const hamburgerMenu = document.querySelector("#hamburger-menu");
  abrir.addEventListener("click", () => {
    nav.classList.add("visible");
  })
  
  cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
  })
  
  hamburgerMenu.addEventListener("click", () => {
    nav.classList.add("visible");
  });
  
  //Integracion de la API nutricional de Edamam
  
  const API_URL = 'https://api.edamam.com/api/food-database/v2/parser?app_id=5f50e472&app_key=9b96026701646fa6e35f665e2162f745';
  
  document.getElementById('food-form').addEventListener('submit', async (event) => {
    event.preventDefault();
   
    const food = document.getElementById('food').value;
    const quantity = document.getElementById('quantity').value;
   
    try {
      const response = await axios.get(`${API_URL}&ingr=${food}`);
   
      if (response.data.hints.length > 0) {
        const foodInfo = response.data.hints[0].food;
        const nutritions = foodInfo.nutrients;
        const calories = (nutritions.ENERC_KCAL * quantity) / 100;
        const protein = (nutritions.PROCNT * quantity) / 100;
        const fat = (nutritions.FAT * quantity) / 100;
        const carbs = (nutritions.CHOCDF * quantity) / 100;
   
        document.getElementById('nutrition-info').innerHTML = `
          <h3>Información nutricional para ${quantity}g de ${food}</h3>
          <table>
              <tr>
                  <th>Calorías</th>
                  <th>Proteína</th>
                  <th>Grasa</th>
                  <th>Carbohidratos</th>
              </tr>
              <tr>
                  <td>${calories.toFixed(2)} kcal</td>
                  <td>${protein.toFixed(2)} g</td>
                  <td>${fat.toFixed(2)} g</td>
                  <td>${carbs.toFixed(2)} g</td>
              </tr>
          </table>
      
          
        `;
      } else {
        document.getElementById('nutrition-info').innerHTML = `
          <p>No se encontró información nutricional para el alimento ingresado.</p>
        `;
      }
    } catch (error) {
      console.error(error);
      document.getElementById('nutrition-info').innerHTML = `
        <p>Ocurrió un error al consultar la información nutricional. Por favor, inténtalo de nuevo.</p>
      `;
    }
   });

  
  
  