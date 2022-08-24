// Lol Query Language by DarkIntaqt
import queryParser from "./queryParser/parse"


class LQL {

    apikey = ""
    region = "NA"

    constructor(apikey, region) {

        if (typeof apikey !== "undefined") {

            this.apikey = apikey

        }


        if (typeof region !== "undefined") {

            this.region = region

        }
    }

    async query(query) {

        if (typeof query !== "string") {

            throw new Error(`query should be string, ${typeof query} given`)

        }

        const parsedQuery = await queryParser(query, this.apikey, this.region)

        if (await typeof parsedQuery["setKey"] !== undefined) {

            this.apikey = parsedQuery.setKey

            return parsedQuery

        }

        if (typeof parsedQuery["setRegion"] !== undefined) {

            this.region = parsedQuery.setRegion

            return parsedQuery

        }

        return parsedQuery

    }

}

module.exports = LQL