function qsa(elemento){
    return document.querySelectorAll(elemento); // Selecciono todos los elementos con un identificador
}

window.addEventListener("load", () => {

    let formsDelete = qsa(".categoryDelete"); // Selecciono todos los elementos con clase(".") formDelete

    formsDelete.forEach(form => { // Por cada form ejecuto lo suguiente
        form.addEventListener("submit", function(event){ // Le agrego un evento en submit
            event.preventDefault(); // Cancelo que se envie automaticamente
            let confirmar = confirm("¿Está seguro que desea eliminar la categoría?"); // Consulto si quiero eliminar el producto
            if(confirmar){ // Confirma la eliminacion???
                form.submit(); // Envio el formulario
            }
        })
    })

});