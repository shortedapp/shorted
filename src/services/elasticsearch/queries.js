export function searchQuery(searchString) {
    return {
        bool: {
            should: [
                {
                    match_phrase_prefix: {
                        name: {
                            query: searchString,
                            max_expansions: 10,
                            slop: 10,
                        },
                    },
                },
                {
                    match: {
                        name: {
                            query: searchString,
                            fuzziness: 'AUTO',
                            operator: 'and',
                            prefix_length: 1,
                        },
                    },
                },
                {
                    term: {
                        'code.raw': {
                            value: searchString,
                            boost: 2.0,
                        },
                    },
                },
            ],
        },
    };
}
