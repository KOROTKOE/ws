let count = 1;

document.querySelector(".add-passenger").addEventListener("click",()=>{
    if(count>=8)return;
    const form = document.createElement("form");
    form.classList.add("form-content");
    form.append(createLabel("name","Имя"));
    form.append(createInput("name"));
    form.append(createLabel("surname","Фамилия"));
    form.append(createInput("surname"));
    form.append(createLabel("birth-day","Дата рождения"));
    form.append(createInput("birth-day"));
    form.append(createLabel("document-number","Номер документа"));
    form.append(createInput("document-number"));
    const h2 = document.createElement("h4");
    h2.textContent="Пассажир"
    document.querySelector("div.passangers").append(h2);
    document.querySelector("div.passangers").append(form);
    count++;
    totalPrice();
});

function createInput(id){
    const input = document.createElement("input")
    input.setAttribute("type","text");
    input.setAttribute("id",id);
    return input;
}

function createLabel(id,text){
    const label = document.createElement("label");
    label.setAttribute("for",id);
    label.textContent = text;
    return label;
}

function totalPrice(){
    document.querySelector("#total").value = document.querySelector("#price").value*count;
}

document.querySelector(".remove-passenger").addEventListener("click",()=>{
    if(count===1)return;
    document.querySelector("div.passangers").lastChild.remove();
    document.querySelector("div.passangers").lastChild.remove();
    count--;
    totalPrice();
});
