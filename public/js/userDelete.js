function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $buttonDel = qs("#delete-user")
    let $formDel = qs("#formDel")
    
    $buttonDel.addEventListener("click", function(){
        let opcion = confirm("¿Está seguro que desea eliminar?.¡Esta acción no se puede revertir!")
        
        $formDel.addEventListener("submit", function(event){
            event.preventDefault()

            if(opcion === true){
                $formDel.submit()
            } 
        })
    })

})
