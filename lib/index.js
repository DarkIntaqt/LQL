// Lol Query Language by DarkIntaqt
import queryParser from "./queryParser/parse"


class LQL {

    apikey = ""

    constructor(apikey) {

        if (typeof apikey !== "undefined") {

            this.apikey = apikey

        }
    }

    query(query) {

        if (typeof query !== "string") {

            throw new Error(`query should be string, ${typeof query} given`)

        }

        const parsedQuery = queryParser(query, this.apikey)

        console.log(parsedQuery);

    }

}

module.exports = LQL