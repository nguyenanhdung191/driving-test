const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const jsonfile = require('jsonfile');
const fetch = require("node-fetch");
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const app = express();
app.use(express.static('web'));
app.use(bodyParser.json());
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.get('/api/offer', function (req, res) {
    res.json(jsonfile.readFileSync("./server/offer.json"));
});

app.post('/api/comment', function (req, res) {
    let comment = req.body;
    let commentFile = jsonfile.readFileSync("./server/comment.json");
    commentFile.comments.push(comment);
    jsonfile.writeFileSync("./server/comment.json", commentFile);
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
let offers = {};


const getOffer = () => {
    return new Promise((resolve, reject) => {
        fetch("https://lazada.api.hasoffers.com/Apiv3/json?api_key=f23cb7b387e3c9e2e19ba69d0173bc915c6430aeea21d14fb0624fd5a6b2322a&Target=Affiliate_Offer&Method=findAll&filters[currency]=VND")
            .then(res => res.json())
            .then(json => {
                Object.keys(json.response.data).forEach(offer => {
                    if (offer !== "269" && offer !== "289") {
                        offers[offer] = {
                            image: "",
                            trackingLink: ""
                        };
                    }
                });
                console.log("complete get offer");
                resolve();
            });
    });
};

const getOfferImage = () => {
    return new Promise((resolve, reject) => {
        fetch("https://lazada.api.hasoffers.com/Apiv3/json?api_key=f23cb7b387e3c9e2e19ba69d0173bc915c6430aeea21d14fb0624fd5a6b2322a&Target=Affiliate_OfferFile&Method=findAll")
            .then(res => res.json())
            .then(json => {
                Object.keys(json.response.data.data).forEach(file => {
                    let offerId = json.response.data.data[file]["OfferFile"]["offer_id"];
                    if (offers.hasOwnProperty(offerId)) {
                        if (offers[offerId].image === "") {
                            let width = parseInt(json.response.data.data[file]["OfferFile"]["width"]);
                            let height = parseInt(json.response.data.data[file]["OfferFile"]["height"]);
                            if ((width / height) >= 1 && (width / height) <= 1.5) {
                                offers[offerId].image = json.response.data.data[file]["OfferFile"]["url"]
                            }
                        }
                    }
                });
                jsonfile.writeFileSync("./server/offer-list.json", offers);
                console.log("complete get image");
                resolve();
            });
    });
};

const getTrackingLink = () => {
    let maximum = 0;
    let ads = {};
    while (true) {
        let offerList = require("./server/offer-list.json");
        let randomIndex = Math.floor(Math.random() * (Object.keys(offerList).length - 1));
        let key = Object.keys(offerList)[randomIndex];
        if (offerList[key].image !== "") {
            ads[key] = JSON.parse(JSON.stringify(offerList[key]));
            maximum += 1;
        }
        if (maximum === 200) {
            break;
        }
    }

    Promise.all(Object.keys(ads).map(offer => {
        return fetch(`https://lazada.api.hasoffers.com/Apiv3/json?api_key=f23cb7b387e3c9e2e19ba69d0173bc915c6430aeea21d14fb0624fd5a6b2322a&Target=Affiliate_Offer&Method=generateTrackingLink&offer_id=${offer}`)
            .then(res => res.json())
            .then(json => json);
    })).then(trackingLinks => {
        trackingLinks.forEach(trackingLink => {
            let offerId = trackingLink.response.data["offer_id"];
            ads[offerId].trackingLink = trackingLink.response.data["click_url"];
        });
        jsonfile.writeFileSync("./server/offer.json", ads);
    });
};

setInterval(() => {
    getOffer()
        .then(() => {
            getOfferImage();
        });
}, 86400000);


setInterval(() => {
    getTrackingLink();
}, 43200000);


app.listen(7777);