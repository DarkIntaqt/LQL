export default function parseQueryToObject(query) {
    /**
     * The query splitted in quotes
     */
    const splittedQuote = query.split('"')


    let counter = 0;


    /**
     * The query splitted in quotes and spaces
     */
    const splittedSpaces = splittedQuote.map((splits) => {

        counter++;

        if (counter % 2 === 0) {

            return splits

        } else {

            const whiteSpaceSplits = splits.split(" ").map((split) => {

                if (split === "") {

                    // return nothing if string is empty anyways
                    return

                } else {

                    return split

                }

            })


            /* 
                ERROR 41
                detect multiple whitespaces in a row to create a cleaner language base
            */

            for (let i = 0; i < whiteSpaceSplits.length; i++) {

                if (whiteSpaceSplits[i] === undefined && (i > 0 && i < (whiteSpaceSplits.length - 1))) {
                    throw new Error("(41) The use more than one space is not allowed")

                }

            }

            return whiteSpaceSplits.filter(splits => splits !== undefined) // <- remove undefined values from array

        }

    });


    /**
     * the query as an object
     */
    let parsedQuery = [];
    for (let i = 0; i < splittedSpaces.length; i++) {

        const split = splittedSpaces[i];

        switch (typeof split) {
            case 'string':

                parsedQuery.push({
                    "type": "quote",
                    "content": split
                })
                break;

            case 'object':

                for (let i2 = 0; i2 < split.length; i2++) {

                    parsedQuery.push({
                        "type": "text",
                        "content": split[i2]
                    })

                }
                break;

            default:

                /*
                    ERROR 42
                    Unexpected split type
                */
                throw new Error(`(42) Unexpected type of 'split': ${typeof split}`)

        }

    }

    return parsedQuery
}