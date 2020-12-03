/* Global Variables */
const apiKey = "6c2b9b331d42c03c3285fac57b9278f6"
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',()=>{
    let zipcode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value
    getTemperature(baseURL, zipcode, apiKey).then((data)=>{
        postAPIData('http://127.0.0.1:8000/data',{
            temperature: data.main.temp,
            date: newDate,
            user_response: feelings
        })
    }).then(updateUI())
})

const getTemperature = async (baseURL, code, apiKey)=>{
    const response = await fetch(baseURL+code+',us&APPID='+apiKey);
    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    }
    catch(error){
        console.log('error',error);
    }
}

const postAPIData = async (url='', data={})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log('error',error);
    }

}

const updateUI = async ()=>{
    const response = await fetch('http://127.0.0.1:8000/all')
    try{
        const resp_json = await response.json()
        document.getElementById('date').innerHTML = resp_json.date;
        document.getElementById('temp').innerHTML = resp_json.temperature;
        document.getElementById('content').innerHTML = resp_json.user_response;
    }
    catch(error){
        console.log('error',error);
    }
}