const userTab=document.querySelector("[data-userWeather]");
const  searchTab=document.querySelector("[data-searchWeather]");
const  userContainer=document.querySelector(".weather-container");

const grantAcessContainer=document.querySelector(".grant-location-container");
const searchform=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


// initailayy variable need

let oldTab=userTab;
const API_key="efdb7e2381e3870ff6029c755ba5701c";
//bacgound styling greenish
oldTab.classList.add("current-tab");
getfromSessionstorage();//agar phale data avaible hai
//

//jab switch karo to 
//jo visible honuse invisble nd vice versa
 function switchTab(newTab){
    //agar clicked tab hi current tab hai toh no change
    if(newTab!==oldTab){
        //background color hatao
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        // lagao
        oldTab.classList.add("current-tab");
    
      
        if(!searchform.classList.contains("active")){
            //mai pahle search wale tab par tha,ab your tab visible karna h
            userInfoContainer.classList.remove("active");
            grantAcessContainer.classList.remove("active");
            searchform.classList.add("active");
        }
        else{
 
            //main pahle seach wale tab pe tha ,ab your weather tab visible karna hai
            searchform.classList.remove("active");
            userInfoContainer.classList.remove("active");

            //ab main your qeather tab me aagaya hu,toh weather bhi display
            //karana padega,so lets check local strorage firdt
            //for ccordinates,if we have saved them there
            //un coordinates ki hissab se weather show kardo

            getfromSessionstorage();

        }

    }
   ;

}


searchTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter
     switchTab(searchTab);
});

userTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter
    switchTab(userTab);
});




//check if coordinates are already present in seasion storage
function getfromSessionstorage(){
    //usser coordinates ki naam se staore kiya hoga
    //kya sesssion storage ke andar user-coordinates ke naam se item hgai
    //agar mil jaigi to aa jaiaga
    const localcoordinates=sessionStorage.getItem("user-coordinates");//user-coordinates is just a key where you store data(lat,lon)//always accept string only

    if(!localcoordinates){//nahi mele l.c
        grantAcessContainer.classList.add("active");// show kardo
    }
    else{ 
        //parse jasom string ko jason object me conver kr raha hota hai
        // agar local.c pade hue hai toh,
        //lat logi ka use karke api call kro
        const coordinates=JSON.parse(localcoordinates);

        //lat longi kim adhaarvprvdata leke aana hai
        fetchuserweatherinfo(coordinates);
    }
}

async function fetchuserweatherinfo(coordinates){
    const{lat,lon}=coordinates;
    //make grantcontainer invisible
    grantAcessContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    // API CALL
    try{
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        
        const weatherinfo=await response.json();

        //data aa chuka hai loader hata do
        loadingScreen.classList.remove("active");

        //sirf visible 
        userInfoContainer.classList.add("active");

        //data rdr karoge ui me
        renderweatherinfo(weatherinfo);
        

    }
    catch(errr){
//h.w

//loader ko remove karna hoga
    }

}

function renderweatherinfo(weatherinfo){

    //firstly ,we have to fetch the elemets
    const cityname=document.querySelector("[data-cityname]");
    const countryicon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weathericon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");




 //fetch values from weatherinfo
 //weatherinfo is the  name of object (json object)
cityname.innerText=weatherinfo?.name;
countryicon.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
desc.innerText=weatherinfo?.weather?.[0]?.description;
weathericon.src = `https://openweathermap.org/img/wn/${weatherinfo?.weather?.[0]?.icon}@2x.png`;
windspeed.innerText=weatherinfo?.wind?.speed;
temp.innerText = `${(weatherinfo.main.temp - 273.15).toFixed(1)}°C`;
humidity.innerText = weatherinfo?.main?.humidity;  
cloudiness.innerText=weatherinfo?.clouds?.all;

}

function getLocation(){
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        //created an object 
      const usercoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
      }
      sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinates));
      //ui 
      fetchuserweatherinfo(usercoordinates);
        
    });

   }
   else{
    //show an alret for no geoloaction support avalaible

   }
}

const grantAcessButton=document.querySelector("[data-grantAccess]");
grantAcessButton.addEventListener("click",getLocation);



//search fo
const searchInput=document.querySelector("[data-searchInput]");

searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname=searchInput.value;
    if(cityname==="")return;
    else fetchCityweatherInfo(cityname);
});
async function fetchCityweatherInfo(cityname){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");

    try{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}`);
  const data= await response.json();
  loadingScreen.classList.remove("active");
  userInfoContainer.classList.add("active");
  renderweatherinfo(data);

    }
   
    catch(error){
        //

    }

}





