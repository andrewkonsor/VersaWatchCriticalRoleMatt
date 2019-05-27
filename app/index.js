import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import {HeartRateSensor} from "heart-rate";
import {battery} from "power"
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { today } from "user-activity";


// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const myMonth= document.getElementById("myMonth");
const myDay = document.getElementById("myDay");
const myHR = document.getElementById("myHR");
const mySteps = document.getElementById("mySteps")

console.log(preferences.clockDisplay);
      if (appbit.permissions.granted("access_activity")) {
            console.log(`${today.adjusted.steps} Steps`);
            mySteps.text = `${today.adjusted.steps}`; 
    if (today.local.elevationGain !== undefined) {
     console.log(`${today.adjusted.elevationGain} Floor(s)`);
    }
    }


if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     myHR.text=`${hrm.heartRate}`;
   });
   hrm.start();
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}



// Update the clock every minute
clock.granularity = "minutes";



// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let monthnum = today.getMonth();
  let day = today.getDate();


  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
    
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";  
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  
  let monthname = month[monthnum];
  
  myMonth.text = `${monthname}`;
  myDay.text = `${day}`; 
  
}

console.log(Math.floor(battery.chargeLevel) + "%");



