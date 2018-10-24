const request = require("request");
const cheerio = require("cheerio");
const urls = require("./urls.config");
const fs = require("fs");
const dataList = [];
for (let key of Object.keys(urls)) {
  console.log(key);
  
  if (key === "HOTELS") {
    urls[key].map(url => {
      console.log(url);
      request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          const checkInDate = $("[name = q-localised-check-in]").attr("value");
          const checkOutDate = $("[name = q-localised-check-out]").attr(
            "value"
          );
          const str = $("[name = q-destination]").attr("value");
          const destination = str.slice(0, str.indexOf(","));
          console.log(destination);
          console.log(checkInDate);
          $(".hotel-wrap").each(function(i, element) {
            const hotelBlock = $(element);
            const hotelName = hotelBlock.find("h3.p-name").text();
            const hotelAddress = hotelBlock.find("p.p-adr").text();
            const hotelPrice = hotelBlock
              .find(".price")
              .find("ins")
              .text();
            
            let hotelIMG = hotelBlock
              .find(".u-photo, .use-bgimage, .featured-img-desktop")
              .attr("style");
              if (hotelIMG) {
                hotelIMG = hotelIMG.replace("background-image:", "").replace(";",'');
              }
              console.log(hotelIMG)
            const data = {
              Website: "www.hotels.com",
              destination: destination,
              CheckIn: checkInDate.replace(/[/]/g, ""),
              Checkout: checkOutDate.replace(/[/]/g, ""),
              data: {
                hotelName: hotelName,
                address: hotelAddress,
                nightlyPrice: hotelPrice,
                hotelIMG: hotelIMG
              }
            };
            dataList.push(data);
          });
          fs.writeFileSync(
            "./hotelsData.json",
            JSON.stringify(dataList, null, 4)
          );
        }
      });
    });
  }
  // else if (key === "EXPEDIA") {
  //   urls[key].map(url => {
  //     console.log(url);
  //     request(url, function(error, response, html) {
  //       if (!error && response.statusCode == 200) {
  //         console.log('in expida');
  //         var $ = cheerio.load(html);
  //         const checkInDate = $("#inpStartDate").attr("value");
  //         const checkOutDate = $("#inpEndDate").attr("value");
  //         const destination = $("[name = q-destination]").attr("value");
  //         console.log(destination);
  //         console.log(checkInDate);
  //         $(".hotel-wrap").each(function(i, element) {
  //           const hotelBlock = $(element);
  //           const hotelName = hotelBlock.find("h3.p-name").text();
  //           const hotelAddress = hotelBlock.find("p.p-adr").text();
  //           const hotelPrice = hotelBlock
  //             .find(".price")
  //             .find("ins")
  //             .text();
  //           const hotelIMG = hotelBlock
  //             .find(".u-photo, .use-bgimage, .featured-img-desktop")
  //             .attr("style")
  //             .replace("background-image:url('", "")
  //             .replace("')", "");
  //           const data = {
  //             Website: "www.hotels.com",
  //             destination: destination,
  //             CheckIn: checkInDate.replace(/[/]/g, ""),
  //             Checkout: checkOutDate.replace(/[/]/g, ""),
  //             data: [
  //               {
  //                 hotelName: hotelName,
  //                 address: hotelAddress,
  //                 nightlyPrice: hotelPrice,
  //                 hotelIMG: hotelIMG
  //               }
  //             ]
  //           };
  //           dataList.push(data);
  //         });
  //         fs.writeFileSync("./expdiadata.json", JSON.stringify(dataList, null, 4));
  //       } else {
  //         console.log(error);
  //         console.log(response.statusCode);
  //       }
  //     });
  //   });
  // }
}
