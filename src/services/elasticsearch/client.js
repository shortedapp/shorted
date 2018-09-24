import axios from 'axios';
import {elasticsearchConfig} from 'src/config';

import {searchQuery} from './queries';

export function parseResults(response) {
    if (response.status !== 200) {
        return null;
    }
    console.log(response);
    return {
        hits: response.data.hits.total,
        max_score: response.data.hits.max_score,
        items: response.data.hits.hits,
    };
}
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * [search description]
 * @param  {[string]} searchString text entered into search bar
 * @return {[type]}              response from elasticsearch
 */
export function search(searchString, size = 20) {
    const path = `${elasticsearchConfig.index}/_search`;
    const session = axios.create({
        baseURL: elasticsearchConfig.hostname,
        auth: elasticsearchConfig.authentication,
        headers: {'Content-Type': 'application/json'},
    });

    const body = {
        size: size,
        query: searchQuery(searchString),
    };
    return session
        .post(path, body)
        .then(checkStatus)
        .then(parseResults);
}
