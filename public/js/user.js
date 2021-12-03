function qs(element) {
    return document.querySelector(element);
}
  
window.addEventListener("load", function () {
    
    /* Validaciones de Email*/
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
                $emailErrors.innerHTML = ''
            break;
        }
    });

    /* Validaciones de Pass*/
    let $pass = qs("#pass");
    let $passErrors = qs("#passErrors");
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

    $pass.addEventListener('blur', function() {

        console.log(regExPass.test($pass.value));

        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio';
                $pass.classList.add('is-invalid')
            break;
            case !regExPass.test($pass.value):
                console.log($pass.value)
                $passErrors.innerHTML = 'Debe ingresar una contraseña válida';
                $pass.classList.add('is-invalid')
            break
            default:
                $pass.classList.remove('is-invalid');
                $pass.classList.add('is-valid');
                $passErrors.innerHTML = ''
            break;
        }
    });

    /* Manejo del formulario */
    let $form = qs("form");
    let submitErrors = qs("#submitErrors");
    console.log($form)

    $form.addEventListener('submit', function(e){

        let error = false;
        e.preventDefault();
        let elementosForm = this.elements;
        console.log(elementosForm);

        for(let index = 0; index < elementosForm.length-1; index++){
            if(elementosForm[index].value == "" && elementosForm[index].name !== "remember"){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error){
            $form.submit();
        }
    })

});