import parseQueryToObject from "./parseQueryToObject";
import parsedObjectToRequests from "./parsedObjectToRequests"

/**
 * Parse the string-query into machine readable code
 * @param {string} query 
 * @param {string} key 
 * @returns parsedQueryObject
 */
export default async function queryParser(query, key, region) {

    /*
        ERROR 40
        Query is empty
    */
    if (query.length === 0) {
        throw new Error("(40) Query is empty")
    }

    /*
        ERROR 41
        Query starts with space
    */
    if (query.substring(0, 1) === " ") {
        throw new Error("(41) Query should not start with a space")
    }


    const parsedQuery = parseQueryToObject(query);


    const returnPromise = new Promise(async function (resolve, reject) {

        let response = await parsedObjectToRequests(parsedQuery, key, region);

        if (typeof response["setkey"] !== "undefined") {
            resolve({
                setKey: response.setkey
            })
            return
        }

        if (typeof response["setregion"] !== "undefined") {
            resolve({
                setRegion: response.setregion
            })
            return
        }


        resolve(response)

    });

    return returnPromise

}