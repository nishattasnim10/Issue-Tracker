function homePage() {

    const userName = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    if (userName === 'admin' && pass === 'admin123') {
        window.location.href = "home.html";
    } else {
        alert("Incorrect username or password!");
    }
    
   
}

const dataContainer = document.getElementById("data-container")
async function loadDataAll() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data= await res.json()
    // console.log(data.data);
    display(data.data);


    
}
 function display(card){
    // console.log(tab);
    card.forEach((element)=>{
        //  console.log(element);

        const cardDiv = document.createElement("div")
        cardDiv.className = "card bg-base-100 w-full   shadow-sm border-t-4 border-green-500"
         cardDiv.innerHTML=`
         
                
                <div class="card-body">
                    <div class="flex justify-between"><img class="card-title" src="./assets/Open-Status.png">
                        <div class="badge bg-red-100 text-red-600 rounded-xl">Heigh</div>
                    </div>
                        
                      <h2 class="font-bold text-[16px] text-[#1F2937] ">${element.title}</h2>  
                    
                    <p class="text-gray-500 line-clamp-2 text-sm">${element.description}</p>
                    <div class="flex gap-3 mt-2 mb-2">
                        <div class="px-2 bg-red-100 text-red-500 rounded-xl border border-red-400"><i class="fa-solid fa-bug" style="color: rgb(red/500);"></i>BUG</div>
                        <div class="border border-yellow-300 bg-red-100 text-yellow-600 bg-yellow-100 rounded-xl"><i class="fa-solid fa-life-ring" style="color: rgb(255, 212, 59);"></i>HELP WANTED</div>
                    </div>
                    <div class="w-full mx-auto h-[1px]  bg-gray-200"></div>
                   <div class="text-gray-500 text-sm">
                    <p >#1 by john_doe</p>
                    <p>date</p>
                   </div>
                    
                </div>
            
         
         `
       
       
       
       
       
          dataContainer.appendChild(cardDiv); 
    });


}


loadDataAll();

// click btn-open , change total issue number
const totalNum = document.getElementById("total-issue")
function btnOpen(){
    totalNum.innerText="30 Issues"

}
function btnClose() {
    totalNum.innerText = "20 Issues"

}