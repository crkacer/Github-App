/**
 * @module AuthService
 *  Apis must need auth details to trigger url
 */
/* eslint-disable */

import axios from 'axios';

export default {
    
    /**
     * Get Repos by languages and sort by stars
     */
    searchByLanguages(query) {
        const { q, langs, sort, order} = query;
        const url = `https://api.github.com/search/repositories?q=${q}+language:${langs}&sort=${sort}&order=${order}`;
        return axios.get(url);
    }
};
