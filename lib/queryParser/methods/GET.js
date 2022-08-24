//import { Client } from "shieldbow";
import handlePlayerRequests from "./handlePlayerRequests"

export default async function handleMethodGET(parsedQuery, key, region) {

    if (typeof parsedQuery[0] === "undefined") {
        /*
            ERROR 500
            More arguments expected
        */
        throw new Error("(500) More arguments expected")
    }


    // check if input is a player first
    if (parsedQuery[1].type === "quote") {

        let playername = parsedQuery[1].content;
        let isPuuid = false;


        // accept puuid or playername
        // expect playername if length is not exactly 78
        if (playername.length === 78) {

            isPuuid = true;

        }

        let nextStep = 2;

        const allowed_next_steps = [
            "matches", "matchhistory",
            "profile",
            "rank",
            "mastery",
            "challenges",
            "livegame",
            "current"
        ];


        if (
            typeof parsedQuery[nextStep] !== "undefined"
            && parsedQuery[nextStep]["type"] === "text"
            && ["s", "'s"].includes(parsedQuery[nextStep].content)
        ) {
            // skip grammatical word
            nextStep++;
        }

        if (typeof parsedQuery[nextStep] === "undefined") {

            /*
                ERROR 501
                Unexpected end of query
            */
            throw new Error("(501) Unexpected end of query")
        }


        if (parsedQuery[nextStep].type === "quote" || !allowed_next_steps.includes(parsedQuery[nextStep].content.toLowerCase())) {

            /*
                ERROR 502
                Unexpected parameter
            */
            throw new Error(`(502) Unexpected parameter: ${parsedQuery[nextStep].content}`)
        }


        let action = parsedQuery[nextStep].content.toLowerCase()


        if (parsedQuery[nextStep].content === "current") {

            if (parsedQuery[nextStep + 1] !== "undefined"
                && parsedQuery[nextStep + 1].content.toLowerCase() === "game"
                && parsedQuery[nextStep + 1].type === "text"
            ) {

                action = "livegame";
                nextStep++;

            } else {

                /* 
                    ERROR 503
                    'current' only support 'game' as it next parameter
                */
                throw new Error(`(503) 'current' only support 'game' as it next parameter`)
            }

        }


        if (Object.entries(parsedQuery).length !== (nextStep + 1)) {
            /*
                ERROR 504
                More arguments provided than needed. 
            */
            throw new Error(`(504) More arguments provided than needed. Everything after '${parsedQuery[nextStep].content}' is not required. `)
        }



        return await handlePlayerRequests(playername, isPuuid, action, key, region)


    }

    return {}

}