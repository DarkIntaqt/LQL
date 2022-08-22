import parseQueryToObject from "./parseQueryToObject";

/**
 * Parse the string-query into machine readable code
 * @param {string} query 
 * @param {string} key 
 * @returns parsedQueryObject
 */
export default function queryParser(query, key) {

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

    console.log(parsedQuery);


    return 0;

}