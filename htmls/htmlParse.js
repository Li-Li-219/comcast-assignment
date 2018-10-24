const cheerio = require("cheerio");
const fs = require("fs");

let dataList = [];
const HTML_LIST = [
  "Las Vegas 23_25_Expedia.htm",
  "Las Vegas 23_26_Expedia.htm",
  "Las Vegas 24_25_Expedia.htm",
  "Las Vegas 24_26_Expedia.htm",
  "New York 23_25_Expedia.htm",
  "New York 23_26_Expedia.htm",
  "New York 24_25_Expedia.htm",
  "New York 24_26_Expedia.htm"
];
HTML_LIST.map(el => {
  let html = fs.readFileSync(el);
  let $ = cheerio.load(html);
  
  let startDate = $("#inpStartDate").attr("value").split(''); // 11/23/2018
  startDate.splice(-4, 2); // 11/23/18
  const checkInDate = startDate.join('');
  
  endDate = $("#inpEndDate").attr("value").split('');
  endDate.splice(-4, 2);
  const checkOutDate = endDate.join('');
  
  let des = $(".destinationName").text(); // Las Vegas, NV, USA
  const destination = des.slice(0, des.indexOf(",")); // Las Vegas
  
  $("article > .flex-card").each(function(i, element) {
    const hotelBlock = $(element);
    
    const hotelName = hotelBlock
      .find("[data-automation='hotel-name']")
      .text();
    console.log("hotelName", hotelName);
   
    const hotelAddress = hotelBlock
      .find("ul.hotel-info > .neighborhood")
      .text()
      .trim();
    console.log("hoteladdress",hotelAddress);
    
    const hotelPrice = hotelBlock
      .find("span.actualPrice")
      .text()
      .trim();
    console.log("price", hotelPrice);
    
    let hotelIMG = hotelBlock
      .find(".hotel-thumbnail")
      .attr("style");
    if (hotelIMG) {
      hotelIMG = hotelIMG.replace("background-image: ", "").replace(";",'');
    }
    
    
    const data = {
      Website: "https://www.expedia.com",
      destination: destination,
      CheckIn: checkInDate.replace(/[/]/g, ""), //112318
      Checkout: checkOutDate.replace(/[/]/g, ""), //112518
      data: {
        hotelName: hotelName,
        address: hotelAddress,
        nightlyPrice: hotelPrice,
        hotelIMG: hotelIMG
      }
    };
    dataList.push(data);
  });
  fs.writeFileSync("./expediaData.json", JSON.stringify(dataList, null, 4));
});
