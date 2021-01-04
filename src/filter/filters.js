import Vue from 'vue'
// let dataFormat = val => {
//   let min = parseInt(val / 1000 / 60);
//   if (min < 10) {
//     min = "0" + min;
//   }
//   let sec = parseInt((val / 1000) % 60);
//   if (sec < 10) {
//     sec = "0" + sec;
//   }
//   return `${min}:${sec}`;
// }


// export { dataFormat }

// Vue.filter("timeFormat", function (val) {
//   let min = parseInt(val / 1000 / 60);
//   if (min < 10) {
//     min = "0" + min;
//   }
//   let sec = parseInt((val / 1000) % 60);
//   if (sec < 10) {
//     sec = "0" + sec;
//   }
//   return `${min}:${sec}`;
// })

// Vue.filter("countFormat", function (val) {
//   if (val > 10000) {
//     val = parseInt(val / 10000) + "万"
//   }
//   return `${val}`
// })

let countFormat = val => {
  if (val > 10000) {
    val = parseInt(val / 10000) + "万"
  }
  return `${val}`
}

let timeFormat = val => {
  let min = parseInt(val / 1000 / 60);
  if (min < 10) {
    min = "0" + min;
  }
  let sec = parseInt((val / 1000) % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return `${min}:${sec}`;
}

let dataFormat = val => {
  let date = new Date(val);
  let year = date.getFullYear();
  // 数字转换为字符串才可以进行拼接
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let min = date.getMinutes().toString().padStart(2, "0");
  let sec = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export {
  countFormat,
  timeFormat,
  dataFormat
}