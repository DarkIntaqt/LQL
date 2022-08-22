// Lol Query Language by DarkIntaqt
import queryParser from "./queryParser/parse"


class LQL {

    apikey = ""
    region = "NA"

    constructor(apikey) {

        if (typeof apikey !== "undefined") {

            this.apikey = apikey

        }
    }

    async query(query) {

        if (typeof query !== "string") {

            throw new Error(`query should be string, ${typeof query} given`)

        }

        const parsedQuery = await queryParser(query, this.apikey)

        if (typeof parsedQuery["apikey"] !== undefined) {

            this.apikey = parsedQuery.apikey

            return parsedQuery

        }

        if (typeof parsedQuery["region"] !== undefined) {

            this.region = parsedQuery.region

            return parsedQuery

        }



    }

}

module.exports = LQL