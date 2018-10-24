# comcast-assignment

## Introduction and Instructions

My project can be divided into three parts.

### Parse data

I parse the data from the websites by two methods under the help of Node.js "cheerio".

* For"www.hotels.com", I parse the data from Website Urls. Code is in the urls folder. 
* For "www.expedia.com", I parse the data from downloaded HTML files. Code is in the htmls folder.

Then I store the json data in two files.

* simpleapi/urls/hotelsData.json
* simpleapi/htmls/expediaData.json

### Set up Node.js API

My server runs on port: localhost:5000.

### Create React web-app

The web-app is bulit by react, and the css style is per-defined by a third party library: "tachyons".

## To start on your machine

First, you need to run the back-end Node.js API.

```
cd simpleapi
npm install
npm run server
```

And next you need open the react application in the browser.

```
cd client
npm install
npm start
```
Now you can choose the website, destination, checkInData and checkOutDate to see the result.
Because of the limit data, you can only choose from belows:

* website: "www.hotels.com" or "www.expedia.com"
* destination: "Las Vegas" or "New York"
* checkInDate: 11/23/2018 or 11/24/2018
* checkOutDate: 11/25/2018 or 11/26/2018
