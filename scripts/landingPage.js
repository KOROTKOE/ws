document.querySelectorAll(".promo").forEach(promotion=>{
    const button = promotion.querySelector(`input[type="button"]`);
    const textContainer = promotion.querySelector(".short-description");
    const fullText = textContainer.textContent;
    const shortText = fullText.substring(0,100)+String.fromCharCode(8230);
    textContainer.textContent = shortText;
    let isShortedText = true;
    button.addEventListener("click",()=>{
        isShortedText=!isShortedText;
        if(isShortedText){
            textContainer.textContent=shortText;
            button.value="Просмотр"
        }
        else{
            textContainer.textContent = fullText;
            button.value="Отмена"
        }
    })
})