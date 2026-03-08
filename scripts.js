function homePage(){
    const userName= document.getElementById('username').value;
    const pass= document.getElementById('password').value;
  
    if(userName==='admin' && pass=== 'admin123') {
        window.location.href="home.html";
    } 
    else{
        alert("Incorrect username or password!");
    }
    
   
}


// -------------Dashboard-------------

// spinner
const loadingSpinner = document.getElementById("loading-spinner");
function showLoading(){
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.classList.add("flex");

}
function hideLoading(){
    loadingSpinner.classList.add("hidden");

}
// load all data
const dataContainer= document.getElementById("data-container")
// modal
const issueDetailsModal = document.getElementById("issue-details-modal")
// const labelDetails = labelsHTML


let allData= [];
async function loadDataAll() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data= await res.json()
    hideLoading();
    // console.log(data.data);
    // display(data.data);
    allData=data.data
    display(allData);
    
}
 function display(card){
     dataContainer.innerHTML="";
    // console.log(tab);
    card.forEach((element)=>{
        //  console.log(element);

        const cardDiv =document.createElement("div")
        const borderColor =element.status === 'closed' 
            ? 'border-purple-500' 
            : 'border-green-500';
        const statusImage = element.status === 'closed' 
            ? './assets/Closed- Status .png'
            : './assets/Open-Status.png';
        let priorityColor = "";
        if (element.priority === 'high') priorityColor = "bg-red-100 text-red-600";
        else if (element.priority === 'medium') priorityColor = "bg-yellow-100 text-yellow-600";
        else priorityColor = "bg-gray-200 text-gray-500";

        // labels
        const labelsHTML = element.labels.map(label=>{
            if (label.toLowerCase()=== 'bug') {
                return `<div class="px-2 bg-red-50 text-red-500 rounded-xl border border-red-700 text-[8px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-bug"></i> BUG
                        </div>`;
            } else if (label.toLowerCase()=== 'help wanted'){
                return `<div class="px-2 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-700 text-[9px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-life-ring" style="color: rgb(255, 212, 59);"></i> HELP WANTED
                        </div>`;
            } else if (label.toLowerCase()=== 'enhancement'){
                return `<div class="flex flex-row">
                <div class="px-2 bg-green-50 text-green-600 rounded-xl border border-green-700 text-[8px] font-bold flex items-center gap-1">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
                        </div>
                        </div>`;
            } else if (label.toLowerCase()=== 'good first issue'){
                return `<div class="flex flex-row">
                <div class="px-2 bg-pink-50 text-pink-400 rounded-xl border border-pink-500 text-[8px] font-bold flex items-center gap-1">
                             GOOD FIRST ISSUE
                        </div>
                        </div>`;            
                        
            } else{
                return `<div class="px-2 bg-blue-50 text-blue-500 rounded-xl border border-blue-600 text-[8px] font-bold">
                            ${label.toUpperCase()}
                        </div>`;
            }
        }).join('');



        cardDiv.className = `card bg-base-100 w-full   shadow-sm border-t-4 border-green-500 ${borderColor}`
         cardDiv.innerHTML=`
         
                
                <div class="card-body" onclick="openDetailsModal(${element.id})">
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
// open modal
async function openDetailsModal(elementId){
    // console.log(elementId);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${elementId}`)
    const data= await res.json();
    const issueDetails = data.data
    // console.log(issueDetails);

    document.getElementById('modal-title').innerText= issueDetails.title;
    document.getElementById('modal-author').innerText=`Opened by ${issueDetails.author}`;
    document.getElementById('modal-date').innerText= new Date(issueDetails.createdAt).toLocaleDateString();
    document.getElementById('modal-description').innerText= issueDetails.description;
    document.getElementById('modal-assignee').innerText= issueDetails.assignee || "Not Found!";
    document.getElementById('modal-priority').innerText= issueDetails.priority;

    // status
    const statusBadge = document.getElementById('modal-status');
    statusBadge.innerText = issueDetails.status=== 'open' ? 'Opened' : 'Closed';
    statusBadge.className = issueDetails.status=== 'open'
        ? 'bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium'
        : 'bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium';

    // lables
    const modalLabelsHTML = issueDetails.labels.map(label => {
        if(label.toLowerCase()=== 'bug'){
            return `<div class="px-2 bg-red-50 text-red-500 rounded-xl border border-red-700 text-[8px] font-bold flex items-center gap-1">
                        <i class="fa-solid fa-bug"></i> BUG
                    </div>`;
        }else if(label.toLowerCase() === 'help wanted'){
            return `<div class="px-2 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-700 text-[9px] font-bold flex items-center gap-1">
                        <i class="fa-solid fa-life-ring"></i> HELP WANTED
                    </div>`;
        }else if(label.toLowerCase() === 'enhancement'){
            return `<div class="px-2 bg-green-50 text-green-600 rounded-xl border border-green-700 text-[8px] font-bold flex items-center gap-1">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
                    </div>`;
        }else if(label.toLowerCase() === 'good first issue'){
            return `<div class="px-2 bg-pink-50 text-pink-400 rounded-xl border border-pink-500 text-[8px] font-bold flex items-center gap-1">
                         GOOD FIRST ISSUE
                    </div>`;
        } else{
            return `<div class="px-2 bg-blue-50 text-blue-500 rounded-xl border border-blue-600 text-[8px] font-bold">
                        ${label.toUpperCase()}
                    </div>`;
        }
    }).join('');
    document.getElementById('modal-labels').innerHTML = modalLabelsHTML;

    // priority badge
    const priorityBadge= document.getElementById('modal-priority');
    if (issueDetails.priority=== 'high') priorityBadge.className = "bg-red-100 text-red-600 px-4 py-1 rounded-lg text-xs font-bold uppercase";
    else if (issueDetails.priority=== 'medium') priorityBadge.className = "bg-yellow-100 text-yellow-600 px-4 py-1 rounded-lg text-xs font-bold uppercase";
    else priorityBadge.className= "bg-gray-200 text-gray-600 px-4 py-1 rounded-lg text-xs font-bold uppercase";

    issueDetailsModal.showModal();

}


loadDataAll();

// click btn chg color , change total issue number
const totalNum =document.getElementById("total-issue");
const btnAll = document.getElementById("btn-all");
const btnOpenElement = document.getElementById("btn-open");
const btnCloseElement = document.getElementById("btn-close");

function handleBtnColor(activeBtn) {
    const allButtons= [btnAll, btnOpenElement, btnCloseElement];

    allButtons.forEach(btn => {
        btn.classList.remove("bg-[#4A00FF]","text-white");
        btn.classList.add("bg-white","text-gray-400","border","border-gray-400");
    });
 
    activeBtn.classList.remove("text-gray-400","bg-white","border","border-gray-400");
    activeBtn.classList.add("bg-[#4A00FF]","text-white");
    
}

function btnnAll() {
    totalNum.innerText ="50 Issues";
    handleBtnColor(btnAll);
    // showLoading();
    // // loadDataAll(); 
    // display(allData);
    // hideLoading();
    showLoading();
    dataContainer.innerHTML="";

    setTimeout(()=>{
        display(allData);
        hideLoading();
    },500);
}

function btnOpen() {
    totalNum.innerText="44 Issues";
    handleBtnColor(btnOpenElement);
    
    const openIssues=allData.filter(item=>item.status=== 'open');
    
    // display(openIssues);
    //  hideLoading();
    showLoading();
    dataContainer.innerHTML="";
    
    setTimeout(()=>{
        display(openIssues);
        hideLoading();
    },500);
}

function btnClose() {
    totalNum.innerText ="6 Issues";
    handleBtnColor(btnCloseElement);
    
    const closedIssues=allData.filter(item => item.status === 'closed');
    showLoading();
    dataContainer.innerHTML="";

    // display(closedIssues);
    // hideLoading();
    setTimeout(()=>{
        display(closedIssues);
        hideLoading();
    },500);
}

async function handleSearch() {
    const searchText = document.getElementById("search-input").value;
    if(searchText === "") {
        display(allData);
        return;
    }

    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await res.json();
    hideLoading();

    if (data.data && data.data.length > 0){
        display(data.data);
        totalNum.innerText = `${data.data.length} Issues`;
    } 
    else{
        dataContainer.innerHTML = `
        <div class=" w-2/3 md:w-1/3 mx-auto col-span-full text-center  p-10 shadow-md rounded-sm bg-gray-50">
              <p class="text-center text-lg font-bold col-span-full  text-gray-600">No issues found!</p>
        </div>`;
        
        totalNum.innerText =`0 Issues`;
    }
}
