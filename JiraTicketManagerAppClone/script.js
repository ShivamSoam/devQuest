
let filters = document.querySelectorAll(".filter");

let ticketsContainer = document.querySelector(".tickets-container");

let openModalButton = document.querySelector(".open-modal");

let closeModalButton = document.querySelector(".close-ticket");

let modal = document.querySelector(".modal");

let textBox = document.querySelector(".text-area");

let modalFilters = document.querySelectorAll(".modal-filter");

let trashButton = document.querySelector(".trashicon i");

let ticketsDB = [];

for(let i = 0;i<filters.length;i++)
{
        let  currFilterColour = filters[i].classList[1]; 
        //console.log(currFilterColour);
    filters[i].addEventListener("click",function(e){
        console.log(currFilterColour+"clicked");
        //console.log(ticketsDB);
            let filteredDB = ticketsDB.filter((obj)=>{
                return currFilterColour == obj.colour;
            });
            console.log("filteredDB" , filteredDB);
        // let allTickets = document.querySelectorAll(".ticket");
        // for(let j = 0;j<allTickets.length;j++)
        // {
        //     allTickets[i].remove();
        // }
        ticketsContainer.innerHTML = "";
        for(let j = 0;j<filteredDB.length;j++)
        {
            addTicket(filteredDB[j].colour,filteredDB[j].value,filteredDB[j].id);
        }
    });
    filters[i].addEventListener("dblclick",function(e){
        ticketsContainer.innerHTML = "";
        for(let j = 0;j<ticketsDB.length;j++)
        {
            addTicket(ticketsDB[j].colour,ticketsDB[j].value,ticketsDB[j].id);
        }
    });
}

let activeFilterColour = "black"; 
for(let i = 0;i<modalFilters.length;i++)
{
    modalFilters[i].addEventListener("click",function(e){
        for(let j = 0;j<modalFilters.length;j++)
        {
            modalFilters[j].classList.remove("active");
        }
        let allModFilterClasses = modalFilters[i].classList;
        activeFilterColour = allModFilterClasses[1];
        modalFilters[i].classList.add("active");
    })
}

textBox.addEventListener("keydown",function(e){
    let key = "Shift";
    if(e.key == key)
    {
        console.log("ModalFilterColour",activeFilterColour);
        addTicket(activeFilterColour,textBox.value);
    }
   
})

let modalFlag = false;


closeModalButton.addEventListener("click",function(e){
    openModalButton.classList.remove("deactive");
    closeModalButton.classList.remove("active");
    if(modalFlag)
    {
        
        modal.style.display = "none";
        modalFlag = false;
    }
    else
    {
        return;
    }
});

openModalButton.addEventListener("click",function(e){
    openModalButton.classList.add("deactive");
    closeModalButton.classList.add("active");
    if(modalFlag)
    {
        return;
    }
    else
    {
        modalFlag = true;
        modal.style.display = "flex";           
    }
    console.log("clicked!!");
})


function addTicket(colour,value,ticketId){
    let id = ticketId || shortid();
    let ticket = document.createElement("div");
    ticket.classList.add("ticket");
    ticket.innerHTML = `
    <div class="ticket-colour ${colour}"></div>
    <div class="ticket-id">ID:${id}</div>
    <div class="ticket-text">${value}</div>
    <div class = "trashicon">
        <i class="fas fa-trash-alt"></i>
    </div>`;
    ticketsContainer.append(ticket);
    let ticketObj = {colour,id,value};
    if(!ticketId)
    {
        ticketsDB.push(ticketObj);
        console.log("ticketsdb",ticketsDB);
    }
    
    
    closeModalButton.classList.remove("active");
    openModalButton.classList.remove("deactive");
    modal.style.display = "none";
    modalFlag = false;
    textBox.value = "";
    let trashIcon = ticket.querySelector(".trashicon i");
    trashIcon.addEventListener("click",function(e){
        ticketsDB = ticketsDB.filter((obj)=>{
            return !(obj.colour ==  ticketObj.colour);
        })
        ticket.remove();
    })
    
}