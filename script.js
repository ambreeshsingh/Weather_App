const userTab=document.querySelector("[data-userWeather]");
const  searchTab=document.querySelector("[data-searchWeather]");
const  userConatiner=document.querySelector(".user-info-container");

const grantAcessconatiner=document.querySelector(".grant-location-container");
const searchform=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoConatiner=document.querySelector(".user-info-container");


// initailayy variable need

let oldTab=userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
//bacgound styling greenish
oldTab.classList.add("current-tab");
//pending?

//jab switch karo to 
//jo visible honuse invisble nd vice versa
 function switchTab(newTab){
    //agar clicked tab hi current tab hai toh no change
    if(newTab!=currentTab){
        //background color hatao
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!searchform.contains("active")){
            //mai pahle search wale tab par tha,ab your tab visible karna h
            userInfoConatiner.classList.remove("active");
            grantAcessconatiner.classList.remove("active");
            searchform.classList.add("active");


        }
        else{
            //main pahle seach wale tab pe tha ,ab your weather tab visible karna hai
            searchform.classList.remove("active");
            userInfoConatiner.classList.remove("active");

            //ab main your qeather tab me aagaya hu,toh weather bhi display
            //karana padega,so lets check local strorage firdt
            //for ccordinates,if we have saved them there

            getfromSessioStorage();

        }

    }
   ;

}

searchTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter
    switchTab(searchTab);

})

userTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter

    switchTab(userTab);


});


//check if coordinates are lready presbt in seasion storage
function getfromSessionstorage(){
    const localcooordinates=session.getItem("user-coordiates");
    if(!localcooordinates){
        grantAcessconatiner.classList.add("active");
    }
    else{
        //parse jasom string ko jason object me conver kr raha hota hai
        const coordiates=JSON.parse(localcooordinates);

        fetchuserweatherinfo(coordiates);
    }
}

async function fetchuserweatherinfo(coordiates){
    const{lat,lon}=coordiates;
    //make grantcontainer invisible
    grantAcessconatiner.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    // API CALL
    try{
        let response= await fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoConatiner.classList.add("active");

        renderweatherinfo(weatherinfo);

    }
    catch(errr){
//h.w

//loader ko remove karna hoga
    }

}

function renderweatherinfo(){
    //firstly ,we have to fetch the elemets
    const cityname=document.querySelector("[data-cityname]");
    const countryicon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-temp]");
    const weathericon=document.querySelector("[data-watherIcon]");
    const temp=document.querySelector("[data-weatherDesc]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cludiness=document.querySelector("[data-cloudiness]");

    //fetch values from weather



    // const grantAcessconatiner=document.querySelector("[data-gra]");
// countryicon
// desc
// weathericon
// tempwindspeed
// humidity
// cloudines



}

