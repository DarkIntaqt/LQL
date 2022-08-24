import handleMethodGET from "./methods/GET";
import handleMethodSET from "./methods/SET";

export default async function parsedQueryObject(parsedQuery, apikey, region) {

    /*
        ERROR 99
        Query should not start with a quote
    */
    if (parsedQuery[0].type !== "text") {
        throw new Error("(99) Query should not start with a quote")
    }

    let keyword = parsedQuery[0].content;

    switch (keyword.toLowerCase()) {
        case 'set':

            return handleMethodSET(parsedQuery, apikey, region)

        case 'get':

            return handleMethodGET(parsedQuery, apikey, region)

        default:
            /*
                ERROR 100
                Undefined keyword
            */
            throw new Error(`(100) Undefined keyword '${keyword}'`)
    }

}