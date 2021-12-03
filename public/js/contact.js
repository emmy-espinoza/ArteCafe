const $form = document.querySelector("#form");
const $buttonMailto = document.querySelector("#artecafe");

$form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {

    event.preventDefault();

    
    const form = new FormData(this);
    
    $buttonMailto.setAttribute(
        "href",
        `mailto:arte.cafe.c8@gmail.com?subject=${form.get("asunto")} - ${form.get("name")} - ${form.get("email")}
        &body=${form.get("message")}`
        );
        
        $buttonMailto.click();
        
        $("input[name]").val("");
        $("input[email]").val("");
        $("input[asunto]").val("");
        $("textarea").val("");

}