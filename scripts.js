function homePage() {

    const userName = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    if (userName === 'admin' && pass === 'admin123') {
        window.location.href = "home.html";
    } else {
        alert("Incorrect username or password!");
    }
    
   
}
const loadingSpinner = document.getElementById("loading-spinner");
function showLoading() {
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.classList.add("flex");

}
function hideLoading() {
    loadingSpinner.classList.add("hidden");

}

const dataContainer = document.getElementById("data-container")
async function loadDataAll() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data= await res.json()
    hideLoading();
    // console.log(data.data);
    display(data.data);


    
}
 function display(card){
     dataContainer.innerHTML = "";
    // console.log(tab);
    card.forEach((element)=>{
        //  console.log(element);

        const cardDiv = document.createElement("div")
        const borderColor = element.status === 'open' 
        ? 'border-green-500' 
        : 'border-purple-500';
        const statusImage = element.status === 'open' 
        ? './assets/Open-Status.png' 
        : './assets/Closed- Status .png';
        let priorityColor = "";
        if (element.priority === 'high') priorityColor = "bg-red-100 text-red-600";
        else if (element.priority === 'medium') priorityColor = "bg-yellow-100 text-yellow-600";
        else priorityColor = "bg-gray-200 text-gray-500";

        // labels
        const labelsHTML = element.labels.map(label => {
            if (label.toLowerCase() === 'bug') {
                return `<div class="px-2 bg-red-50 text-red-500 rounded-xl border border-red-700 text-[8px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-bug"></i> BUG
                        </div>`;
            } else if (label.toLowerCase() === 'help wanted') {
                return `<div class="px-2 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-700 text-[9px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-life-ring" style="color: rgb(255, 212, 59);"></i> HELP WANTED
                        </div>`;
            } else if (label.toLowerCase() === 'enhancement') {
                return `<div class="flex flex-row">
                <div class="px-2 bg-green-50 text-green-600 rounded-xl border border-green-700 text-[8px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
                        </div>
                        </div>`;
            } else if (label.toLowerCase() === 'good first issue') {
                return `<div class="flex flex-row">
                <div class="px-2 bg-pink-50 text-pink-400 rounded-xl border border-pink-500 text-[8px] font-bold flex items-center gap-1">
                             GOOD FIRST ISSUE
                        </div>
                        </div>`;            
                        
            } else {
                return `<div class="px-2 bg-blue-50 text-blue-500 rounded-xl border border-blue-600 text-[8px] font-bold">
                            ${label.toUpperCase()}
                        </div>`;
            }
        }).join('');



        cardDiv.className = `card bg-base-100 w-full   shadow-sm border-t-4 border-green-500 ${borderColor}`
         cardDiv.innerHTML=`
         
                
                <div class="card-body">
                    <div class="flex justify-between"><img class="card-title" src="${statusImage}">
                        <div class="badge px-4 ${priorityColor} rounded-xl">${element.priority}</div>
                    </div>
                        
                      <h2 class="font-bold text-[16px] text-[#1F2937] ">${element.title}</h2>  
                    
                    <p class="text-gray-500 line-clamp-2 overflow-hidden text-sm">${element.description}</p>
                    <div class="flex gap-3 mt-2 mb-2">
                        
                        ${labelsHTML}
                    </div>
                    <div class="w-full mx-auto h-[1px]  bg-gray-200"></div>
                   <div class="text-gray-500 text-sm">
                    <p >#${element.id} by ${element.author}</p>
                    <p>${new Date(element.createdAt).toLocaleDateString()}</p>
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