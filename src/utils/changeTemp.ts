export const handleChangeTemp=(temp:number):number=>{
    return Math.floor(temp-273.15)
}
export const handleChoiceAir=(test:number):string[]=>{
    const airLevel=[
        ["Tốt", "Không khí sạch, không gây ảnh hưởng đến sức khỏe."],
 ["Khá", "Không khí tương đối sạch, chỉ một số nhóm người nhạy cảm có thể bị ảnh hưởng."],
 ["Trung bình", "Không khí bắt đầu ô nhiễm, có thể gây ảnh hưởng đến sức khỏe của một số người, đặc biệt là người già, trẻ em và người mắc bệnh hô hấp."],
 ["Kém", "Không khí ô nhiễm, mọi người có thể cảm thấy khó chịu và có các vấn đề về sức khỏe."],
 ["Rất kém", "Không khí ô nhiễm nặng, gây ảnh hưởng nghiêm trọng đến sức khỏe, mọi người nên hạn chế ra ngoài."]
    ]
    return airLevel[test-1]
}
export const handleChangeBorderColorAir=(test:number):string=>{
    const color=['border-success',"border-info",'border-warning','border-danger','border-primary']
    return color[test-1]
}
export const capitalizeFirstLetter=(str:string):string=>{
    if(str=='') return "";
    return str.charAt(0).toUpperCase()+str.slice(1)
}
export const handleChangekm=(speed:number):number=>{
    return Math.floor(speed*3.6)
}
export const handleChangeColorAir=(test:number):string=>{
    const color=['success',"info",'warning','danger','primary']
    return color[test-1]
}
export const  handleChangeDateTime=(date:Date):string=>{
    const day=date.getDate().toString().padStart(2,"0");
    const month=date.getMonth().toString().padStart(2,"0");
    const hour=date.getHours().toString().padStart(2,"0");
    const minute=date.getMinutes().toString().padStart(2,"0");
    return `${day}/${month} ${hour}:${minute}`
}
export const handleGetNowHour=():string=>{
    const nowTime = new Date();
    const hour = nowTime.getHours().toString().padStart(2, "0");
    const minute = nowTime.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`
}
export const handleConvertMtoKm=(km:number):number=>{
    return km/1000
}
export const handleDegWind=(deg:number):string=>{
    let vector=""
    if(deg===0||deg===380){
        vector="Hướng bắc";
    }else if(deg<=89){
        vector="Hướng bắc đông";
    }else if(deg===90){
        vector="Hướng đông";
    }else if(deg<=179){
        vector="Hướng đông nam";
    }else if(deg===180){
        vector="Hướng Nam"
    }else if(deg<=269){
        vector="Hướng nam tây"
    }else if(deg===270){
        vector="Hương tây"
    }else if(deg<=379){
        vector="Tây Bắc"
    }
    return vector
}
export const removeDiacritics=(str:string)=> {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
// conver UNIX
export const handleConvertUNIX=(date:Date)=>{
    return Math.floor(date.getTime()/1000)
}