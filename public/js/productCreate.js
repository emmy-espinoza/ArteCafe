
function qs ( element){
    return document.querySelector(element);
}

window.addEventListener("load",function(){
    let $name = qs("#name");
    let $nameErrors = qs("#nameErrors");
    let regExName = /[0-9a-zA-Z]{5,50}/; 

    $name.addEventListener("blur", function(){
        switch (true) {
            case !$name.value.trim():
              $nameErrors.innerHTML = "El campo nombre es obligatorio";
              $name.classList.add("is-invalid");
              break;
            case !regExName.test($name.value):
                $nameErrors.innerHTML = "El nombre debe contener al menos 5 caracteres";
                $name.classList.add("is-invalid");
                break; 
            default:
              $name.classList.remove("is-invalid");
              $name.classList.add("is-valid");
              $nameErrors.innerHTML = "";
              break;
        }
        
    });

    let $description = qs("#description");
    let $descriptionErrors = qs("#descriptionErrors");
    let regExDescription = /[0-9a-zA-Z,.\sñáéíóúü]{20,200}/;

    $description.addEventListener("blur", function(){
        switch (true){
            case !regExDescription.test($description.value):
                $descriptionErrors.innerHTML = 'Debe ingresar al menos 20 caracteres';
                $description.classList.add('is-invalid');
                break
                default:
                $description.classList.remove('is-invalid');
                    $description.classList.add('is-valid');
                    $descriptionErrors.innerHTML = ''
                    break;
            
                }
                
            });

    let $price = qs("#formPrice");
    let $priceErrors = qs("#priceErrors");

    $price.addEventListener("blur", function(){
        switch (true) {
            case !$price.value.trim():
                $priceErrors.innerHTML = "Debes ingresar el precio del producto";
                $price.classList.add("is-invalid");
                break;
        }
    });
    
    let $file = qs("#formFile");
    let $fileErrors = qs("#fileErrors");
    let $imgPreview = qs("#img-preview");

    $file.addEventListener('change', 
        function fileValidation(){
            let filePath = $file.value, 
                allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
            if(!allowefExtensions.exec(filePath)){ 
                $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                $file.value = '';
                $imgPreview.innerHTML = '';
                return false;
            }else{
                
                console.log($file.files);
                if($file.files && $file.files[0]){
                    let reader = new FileReader();
                    reader.onload = function(e){
                        $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                    };
                    reader.readAsDataURL($file.files[0]);
                    $fileErrors.innerHTML = '';
                    $file.classList.remove('is-invalid')
                }
            }
        })

    /* Validacion de categorías */

    let $categorias = qs("#categorias"); // Agarro el select de categorias
    let $categoriasError = qs("#categoriasError"); // Selecciono el span de errores de categoria

    $categorias.addEventListener("blur", () => { // Agrego el evento "blur"
        let categoriasValue = $categorias.value; // Obtengo el valor de la opcion seleccionada
        let categoriasValueParseada = parseInt(categoriasValue); // Lo convierto a Numero
        switch(true){ // Genero el switch
            case isNaN(categoriasValueParseada): // Verifico si seleccione alguna opcion correcta (Si no es correcta nos da NaN)
                $categoriasError.innerHTML = 'Seleccione una categoría'; // Agrego el texto error
                $categorias.classList.add('is-invalid'); // Agrego la clase "is-invalid"
        }
    });

    let $form = qs("#form");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

    $form.addEventListener('submit', function(event){
        let error = false;
        event.preventDefault();
        let elementosForm = this.elements;
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" && elementosForm[index].name !== "images"){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }
    
        if(!error){
            $form.submit()
        }
    
    });

})