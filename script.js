const userTab=document.querySelector("[data-userWeather]");
const  searchTab=document.querySelector("[data-searchWeather]");
const  userContainer=document.querySelector(".user-info-container");

const grantAcessContainer=document.querySelector(".grant-location-container");
const searchform=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


// initailayy variable need

let oldTab=userTab;
const API_KEY="efdb7e2381e3870ff6029c755ba5701c";
//bacgound styling greenish
oldTab.classList.add("current-tab");
getfromSessionstorage();//agar phale data vaible hai
//pending?

//jab switch karo to 
//jo visible honuse invisble nd vice versa
 function switchTab(newTab){
    //agar clicked tab hi current tab hai toh no change
    if(newTab!=oldTab){
        //background color hatao
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        // lagao
        oldTab.classList.add("current-tab");
    
      
        if(!searchform.contains("active")){
            //mai pahle search wale tab par tha,ab your tab visible karna h
            userContainer.classList.remove("active");
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

})

userTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter

    switchTab(userTab);


});




//check if coordinates are already present in seasion storage
function getfromSessionstorage(){
    //usser coordinates ki naam se staore kiya hoga
    //kya sesssion storage ke andar user-coordinates ke naam se item hgai
    //agar mil jaigi to aa jaiaga
    const localcoordinates=session.getItem("user-coordinates");
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
        let response= await fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data=await response.json();
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
    const desc=document.querySelector("[data-temp]");
    const weathericon=document.querySelector("[data-watherIcon]");
    const temp=document.querySelector("[data-weatherDesc]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");
    const grantAcessconatiner=document.querySelector("[ data-grantAccess]");




 //fetch values from weatherinfo
 //weatherinfo is the  name of object (json object)
cityname.innerText=weatherinfo?.name;
countryicon.src=`https://flagcdn.com//144x108/${weatherinfo?.sys?.name.toLowerCase()}.png`
desc=weatherinfo?.weather?.[0]?.description;
weathericon.src=
windspeed.innerText=weatherinfo?.wind?.windspeed;
humidity.innerText=weatherinfo?.main?.humidity;
temp.innerText=
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
const searchinpuyt=document.querySelector("[ data-searchInput]");

searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname=searchinpuyt.ariaValueMax;
    if(cityname==="")return;
    else fetchuserweatherinfo(cityname);
})
async function fetchuserweatherinfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");

    try{
  const response=await fetch();
  const data= await response.json();
  loadingScreen.classList.remove("active");
  userInfoContainer.classList.add("active");
  renderweatherinfo(data);

    }
   
    catch{(error)

    }

}





