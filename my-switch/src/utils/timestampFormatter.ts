export const timeStampFormatter = (timeStamp: string)=>{
    const date= new Date(parseInt(timeStamp));
    let amOrPm = (date.getHours() < 12) ? "AM" : "PM";
    let hour = (date.getHours() < 12) ? date.getHours() : date.getHours() - 12;
   let dateFormat = date.toDateString()+ ", " + hour + ":" + date.getMinutes() + ' ' + amOrPm;
   return dateFormat;
}

export const timeStampForDate = (timeStamp: string)=>{
    const date= new Date(parseInt(timeStamp));
    let [week, month, day, year] = date.toDateString().split(' ');
let dateFormat = `${month} ${day}`
   return dateFormat;
}

