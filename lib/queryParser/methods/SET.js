export default function handleMethodSET(parsedQuery) {

    if (Object.entries(parsedQuery).length !== 4) {

        /*
            ERROR 200
            SET requires exactly 3 more expressions
        */
        throw new Error(`(200) SET requires exactly 4 expressions, ${Object.entries(parsedQuery).length} given`)
    }


    if (parsedQuery[1]["type"] === "quote" || parsedQuery[2]["type"] === "quote") {

        /*
            ERROR 201
            Expression does not require a quote
        */
        throw new Error("(201) Expressions does not require a quote")
    }


    const valid_modifiable_parameters = ["region", "key"]

    if (!valid_modifiable_parameters.includes(parsedQuery[1]["content"].toLowerCase())) {

        /*
            ERROR 202
            Unknown parameter to modify
        */
        throw new Error(`(202) Unknown parameter to modify: '${parsedQuery[1]["content"]}'`)
    }


    if (!["to", "="].includes(parsedQuery[2]["content"].toLowerCase())) {
        /*
            ERROR 203
            Unknown expression
        */
        throw new Error(`(203) Unknown expression: '${parsedQuery[2]["content"]}'. Valid expressions are 'TO' or '='`)
    }


    if (parsedQuery[3]["type"] === "quote") {

        let response = {};

        response["set" + parsedQuery[1]["content"].toLowerCase()] = parsedQuery[3]["content"]

        return response
    }


    /*
        ERROR 204
        Unknown type of value
    */
    throw new Error(`(204) The passed value should be in quotes: "${parsedQuery[3]["content"]}"`)


}