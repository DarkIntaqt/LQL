const TeemoJS = require("teemojs")

export default async function handlePlayerRequests(name, puuid, method, key, region) {

    let client = TeemoJS(key)

    let summoner;
    if (puuid === false) {

        summoner = await client.get(region, 'summoner.getBySummonerName', name)

    } else {

        summoner = await client.get(region, 'summoner.getByPuuid', name)

    }

    switch (method) {
        case 'profile':

            return summoner
        case 'rank':

            const ranks = await client.get(region, 'league.getLeagueEntriesForSummoner', summoner.id)

            let rankObject = {}

            for (let i = 0; i < ranks.length; i++) {

                let element = ranks[i]


                if (typeof element["miniSeries"] == "undefined") {
                    element["miniSeries"] = undefined
                    element["promos"] = false
                } else {
                    element["promos"] = true
                }

                rankObject[element["queueType"]] = element

            }

            return rankObject


        case 'mastery':

            return await client.get(region, 'championMastery.getAllChampionMasteries', summoner.id)


        case 'matches':
        case 'matchhistory':

            return await client.get("europe", 'match.getMatchIdsByPUUID', summoner.puuid, { count: 100 })

    }

    return {}


}