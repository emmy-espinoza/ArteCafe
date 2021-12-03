function qs(element){
    return document.querySelector(element);
}

window.addEventListener("load",function(){

    /* regEx para varios campos */
    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
    let regExName = /[0-9a-zA-Z]{2,50}/; //Usado en name y lastname

    /* Validaciones del name */ 
    let $inputName = qs("#name");
    let $nameErrors = qs("#nameErrors");

    $inputName.addEventListener("blur", function () {
      switch (true) {
        case !$inputName.value.trim():
          $nameErrors.innerHTML = "El campo nombre es obligatorio";
          $inputName.classList.add("is-invalid");
        break;
        case !regExName.test($inputName.value):
          $nameErrors.innerHTML = "Debes ingresar al menos 2 caracteres";
          $inputName.classList.add("is-invalid");
        break;
        case !regExAlpha.test($inputName.value):
          $nameErrors.innerHTML = "Debes ingresar un nombre válido";
          $inputName.classList.add("is-invalid");
          break;  
        default:
          $inputName.classList.remove("is-invalid");
          $inputName.classList.add("is-valid");
          $nameErrors.innerHTML = "";
        break;
      }
    });

    /* Validaciones del lastName */
    let $inputLastname = qs("#lastname");
    let $lastnameErrors = qs("#lastnameErrors");

    $inputLastname.addEventListener("blur", function () {
        switch (true) {
            case !$inputLastname.value.trim():
                $lastnameErrors.innerHTML = "El campo apellido es obligatorio";
                $inputLastname.classList.add("is-invalid");
            break;
                case !regExName.test($inputLastname.value):
                $lastnameErrors.innerHTML = "Debes ingresar al menos 2 caracteres";
                $inputLastname.classList.add("is-invalid");
            break;
            case !regExAlpha.test($inputLastname.value):
                $lastnameErrors.innerHTML = "Debes ingresar un apellido válido";
                $inputLastname.classList.add("is-invalid");
            break;
            default:
                $inputLastname.classList.remove("is-invalid");
                $inputLastname.classList.add("is-valid");
                $lastnameErrors.innerHTML = "";
            break;
        }
    }); 

    /* Validaciones del phone */
    let $phone = qs("#phone");
    let $phoneErrors = qs("#phoneErrors");
    let regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

    $phone.addEventListener("blur", function () {
        switch (true) {
            case !$phone.value.trim():
                $phoneErrors.innerHTML = 'Ingrese un número de telefono';
                $phone.classList.add('is-invalid')
            break;
            case !regExPhone.test($phone.value):
                $phoneErrors.innerHTML = 'Debe ingresar un télefono válido';
                $phone.classList.add('is-invalid');
                $phoneErrors.innerHTML = '';
            break;
            default:
                $phone.classList.remove('is-invalid');
                $phone.classList.add('is-valid');
                $phoneErrors.innerHTML = '';
            break;
        }
    });

    /* Validaciones email */
    let $email = qs("#email");
    let $emailErrors = qs("#emailErrors");
    let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    $email.addEventListener('blur', function() {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio';
                $email.classList.add('is-invalid')
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid')
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = '';
            break;
        }
    });

    /* Validaciones de las imágenes */
    let $file = qs("#formFile");
    let $fileErrors = qs("#fileErrors");
    let $imgPreview = qs("#img-preview");

    $file.addEventListener('change', function fileValidation(){
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
                    $imgPreview.innerHTML = '<img class="imagenPerfil" src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        }
    });
    
    /* Manejo del formulario */

    let $form = qs("#form");

    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        console.log($form.elements)
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" && elementosForm[index].name !== "avatar"){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }
    
        if(!error){
            console.log('Todo bien');
            $form.submit()
        }
    
    })

    /* Manejo del cambio de imagen de perfil */

    $("#img-preview").click(() => {
        $("#formFile").click();
    })

    /* Manejo de eliminar perfil */

    $("#deleteForm").submit(function (event) {
        event.preventDefault();
        let confirmacion = confirm("Esta seguro que desea eliminar su perfil?");
        if(confirmacion){
            this.submit();
        }
    });

})