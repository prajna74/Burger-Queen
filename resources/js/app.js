import axios from "axios";
import noty from "noty";
import {initAdmin} from "./admin";
import moment from "moment";
const addbtn=document.querySelectorAll(".add-to-cart");
const cartValue=document.getElementById("cartQt");

function updateCart(burger)
{
    axios.post("/update-cart",burger).then((res)=>{
        const cQt=res.data.totalqt;
        cartValue.innerText=cQt;
    });
}
if(addbtn){
addbtn.forEach((addB)=>{
      addB.addEventListener("click",()=>{
          const burger=JSON.parse(addB.dataset.burger);
          updateCart(burger);
      })
})
}

const alertMsg=document.getElementById("success-alert");
if(alertMsg){
setTimeout(() => {
    alertMsg.remove();
}, 2000)
};

let statuses=document.querySelectorAll(".status-line");
let hiddenInput=document.getElementById("status");
let order=hiddenInput?hiddenInput.value:"";
if(order){
order=JSON.parse(order);
}
let timee=document.createElement("small");

function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove("completed");
        status.classList.remove("current");
    });
    let flag=true;
     statuses.forEach((status)=>{
         let dataProp=status.dataset.status;
         if(flag)
         {
             status.classList.add("completed");
         }
         if(order.status==dataProp)
         {
            timee.innerText=moment(order.updatedAt).format("hh:mm A");
             if(status.nextElementSibling){
            flag=false;
            status.nextElementSibling.classList.add("current");
             }
         }
     })
}

updateStatus(order);


const socket=io();
if(order){
    socket.emit("room",`order_${order._id}`);
}

socket.on("orderstatus",(data)=>{
    //console.log(data);
    updateStatus(data);
})