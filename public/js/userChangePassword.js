function qs(element) {
    return document.querySelector(element);
}
  
window.addEventListener("load", function () {
    
    /* regEx para varios campos */
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/; //Usado en ambos passwords

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
    
    /* Manejo del formulario */
    let $form = qs("form");
    let submitErrors = qs("#submitErrors");
    
    $form.addEventListener('submit',function(event){

        let error = false;
        event.preventDefault();
        let elementosForm = this.elements;
        console.log(elementosForm);

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }
        
        if(!error){
            $form.submit();
        }
        
    });

});


  

   