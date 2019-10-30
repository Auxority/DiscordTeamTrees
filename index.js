"use strict";

const ttApi = require("teamtrees");
const DiscordRPC = require("discord-rpc");
const config = require("./config.json");
const clientId = config.clientId;
DiscordRPC.register(clientId);

const richPresenceClient = new DiscordRPC.Client({
    "transport": "ipc"
});

function adjustRange(oldValue, oldMin, oldMax, newMin, newMax) {
    return (((oldValue - oldMin) * newMax) / oldMax) + newMin
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const numFormat = new Intl.NumberFormat("en-IN", {maximumSignificantDigits: 8});
function formatAmount(v) {
    return numFormat.format(v);
}

async function updatePresence() {
    const data = await ttApi(true, false, false);
    if (data) {
        let days = clamp(daysIntoYear(new Date()), 0, 366);
        let daysInYear = days < 365 ? 365 : 366; 
        let now = new Date();
        let currentTimestamp = Math.floor(now.getTime() / 1000);
        let startOfDay = new Date(now.getUTCFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        let secondsDifference = Math.floor((now.getTime() - startOfDay.getTime()) / 1000);

        richPresenceClient.setActivity({
            "details": `${formatAmount(data.trees)} trees`,
            "state": "Days",
            "largeImageKey" : "largeicon",
            "largeImageText" : `${Math.floor(data.trees / 200000 * 1000) / 1000}%`,
            "smallImageKey" : "smallicon",
            "smallImageText" : "#TeamTrees",
            "startTimestamp" : currentTimestamp,
            "endTimestamp" : currentTimestamp + 24 * 3600 - secondsDifference,
            "instance": 0,
            "partyId" : "Pine",
            "partySize" :  days,
            "partyMax" : daysInYear,
            "matchSecret" : "4b2fdce12f639de8bfa7e3591b71a0d679d7c93f",
            "spectateSecret" : "4b2fdce12f639de8bfa7e3591b71a0d679d7c93e",
        }).then(() => {
            setTimeout(() => {
                updatePresence();
            }, 1000 * 2);
        }).catch(err => {
            console.error(err);
        });
    }
}

richPresenceClient.on("ready", () => {
    updatePresence();
});

richPresenceClient.login({clientId}).then(response => {
    console.log("Client authenticated!");
}).catch(err => {
    console.error(err);
});