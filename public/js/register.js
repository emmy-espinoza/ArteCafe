function qs(element) {
    return document.querySelector(element);
}
  
window.addEventListener("load", function () {
    
    /* regEx para varios campos */
    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/; //Usado en name y lastname
    let regExName = /[0-9a-zA-Z]{2,50}/; //Usado en name y lastname
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/; //Usado en ambos passwords
    
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

    /* Validaciones del pass */
    let $pass = qs("#pass");
    let $passErrors = qs("#passErrors");

    $pass.addEventListener('blur', function() {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio';
                $pass.classList.add('is-invalid')
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
                $pass.classList.add('is-invalid')
                break
            default:
                $pass.classList.remove('is-invalid');
                $pass.classList.add('is-valid');
                $passErrors.innerHTML = ''
            break;
        }
    });
    
    /* Validacion de verificacion de password */
    let $pass2 = qs("#pass2");
    let $pass2Errors = qs("#pass2Errors");
        
    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = 'Debes reingresar la contraseña';
                $pass2.classList.add('is-invalid')
                break;
            case $pass2.value != $pass.value:
                $pass2Errors.innerHTML = 'Las contraseñas no coinciden';
                $pass2.classList.add('is-invalid')
                break;
            default:
                $pass2.classList.remove('is-invalid');
                $pass2.classList.add('is-valid');
                $pass2Errors.innerHTML = ''
            break;
        }
    })
    
    /* Validaciones del terms */
    let $terms = qs("#check");
    let $termsErrors = qs("#termsErrors");
    
    $terms.addEventListener('click',function(){
        $terms.value = 'on'
        $terms.classList.toggle('is-valid');
        $terms.classList.remove('is-invalid');
        $termsErrors.innerHTML = ""
    });

    /* Validaciones de las imagenes */
    let $file = qs("#formFile");
    let $fileErrors = qs("#fileErrors");
    let $imgPreview = qs("#img-preview");
    
    $file.addEventListener('change', function fileValidation(){
        let filePath = $file.value;
        let allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid');
            }
        }
    }) 
    
    /* Manejo del formulario */
    let $form = qs("form");
    let submitErrors = qs("#submitErrors");
    
    $form.addEventListener('submit',function(event){

        let error = false;
        event.preventDefault();
        let elementosForm = this.elements;
        console.log(elementosForm);

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == "" && elementosForm[index].name !== "avatar"){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }
        
        if(!$terms.checked){
            $terms.classList.add('is-invalid');
            $termsErrors.innerHTML = "Debes aceptar las bases y condiciones";
            error = true;
        }
        
        if(!error){
            $form.submit();
        }
        
    });

    $(".imagen-perfil").click(() => {
        $("#formFile").click();
    })

});


  

   