document.addEventListener('DOMContentLoaded', ()=>{
    
    fetchDogs()
    fetchComments()
})
const inputData={}

const apiKey="live_jlIZOBP0ISTIUiSLieLnkitizzhvUo8khqcb1ETiJNR9bJBehqUkfqkl589RUhlT"

const url="https://api.thecatapi.com/v1/breeds?limit=100&page=0"

const reviewurl="http://localhost:3000/review"




// Displaying dogs

function displayDogs(dogii){
    const doggg=document.getElementById("dogs")
    const container=document.createElement("div")
    container.className="container"
    container.innerHTML=`
    <div class="dogsCard">
    <span class="bold">Name:</span><a>${dogii.name}</a><br/><br/>
    <span class="bold">Origin:</span><a>${dogii.origin}</a><br/><br/>
    <span class="bold">Intelligence:</span><a>${dogii.intelligence}</a><br/><br/>
    <span class="bold"> Stranger/Friendly:</span><a>${dogii.stranger_friendly}</a><br/><br/>
    <span class="bold">LifeSpan:</span><a>${dogii.life_span}</a><br/><br/>
    <span class="bold">Health Issues:</span><a>${dogii.health_issues}</a><br/><br/>
    <span class="bold">Energy Level:</span><a>${dogii.energy_level}</a><br/><br/>
    <span class="bold">Altanative Name:</span><a>${dogii.alt_names}</a><br/><br/>
    <span class="bold">Child Friendly:</span><a>${dogii.child_friendly}</a><br/><br/>
    <span class="bold">Grooming:</span><a>${dogii.grooming}</a><br/><br/>
    <span class="bold">Temperament:</span><a>${dogii.temperament}</a><br/><br/>
    <span class="bold">Description:</span><a>${dogii.description}</a><br/><br/>
 
    <button type="button" onClick="onClick()">Likes:<a id="clicks">0</a></button>
    
    </div>


    `


    doggg.appendChild(container)

}

// like button

var clicks = 0;

function onClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
};

// fetching dogs starts here

function fetchDogs(){
    fetch(url,{
        method: 'GET',
        headers:{
            "x-api-key": apiKey,
        }
    })
    .then(res=>res.json())
    .then(dogData=> 
        dogData.forEach(dogD=>{


            displayDogs(dogD)
            console.log(dogD)
        })
        
        )
}



function displayComments(com){
    const comme=document.getElementById("comments")
    const container=document.createElement("div")
    container.className="container"
    container.innerHTML=`
    <span class="output">
    <p>${com.message}</p>
    <button  id="deleteBtn">Delete</button>
    </span>

    `
    container.querySelector('#deleteBtn').addEventListener('click', ()=>{
       
        container.remove()
        deleteComments(com.id)
    })

    comme.appendChild(container);


}


// Fetching review data
function fetchComments(){
    fetch(reviewurl)
    .then(res=>res.json())
    .then(reve => {
        console.log(reve)
        reve.forEach((re) => {
            displayComments(re);
        })
    })
}

// posting review data

const form=document.querySelector('.reviewForm')
form.addEventListener('submit', (e)=>{
     e.preventDefault()

     const messo=document.querySelector("#message").value

     inputData.message=messo

     fetch(reviewurl,{
        method: "POST",
        headers:{
            "content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(inputData)
     })
     .then(res=>res.json())
     .then(datacomment =>console.log(datacomment))
}

)

// deletitng events
function deleteComments(id){
    fetch(`${reviewurl}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json())
    .then(commenti => console.log(commenti))
}
