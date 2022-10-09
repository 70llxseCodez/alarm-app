const selectMenu = document.querySelectorAll("select")
const currentTime = document.querySelector('h1')
const btnAlarm = document.querySelector('button')
const content = document.querySelector('.content')

let alarmTime ,isAlarm = false;
let ringtone = new Audio("./audio/alarmClock.mp3")


for(let i = 12; i > 0; i--){
    i = i < 10 ? '0' + i : i 
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option)
}
for(let i = 59; i >= 0; i--){
    i = i < 10 ? '0' + i : i 
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option)
}
for(let i = 2; i > 0; i--){
    let amp = i == 1 ? "AM" : "PM"
    let option = `<option value="${amp}">${amp}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option)
}

setInterval(() => {
    let date = new Date()
    h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()

    if(h >= 12){
        h = h - 12;
        ampm = "PM"
    }

    // if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;

    // adding 0 before hr, min, sev if this value is less than 10
    
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;


    currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`

    if(alarmTime == `${h}:${m} ${ampm}`){
        ringtone.play()
        ringtone.loop = true
       
    }
},1000)

const setAlarm = () => {
    if(isAlarm){
        alarmTime = ""
        content.classList.remove("disable")
        btnAlarm.innerText = 'Set Alarm'
        ringtone.pause()
        content.classList.remove("disable")
        btnAlarm.innerText = 'Set Alarm'
        return isAlarm = false

    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    if(time.includes('Hour') || time.includes('Minute') ||time.includes('AM/PM')){
        return alert('please, select a valid time to set Alarm')
    }
    isAlarm = true 
    alarmTime = time;
    content.classList.add("disable")
    btnAlarm.innerText = 'Clear Alarm'
    

}
 
btnAlarm.addEventListener('click',setAlarm)

