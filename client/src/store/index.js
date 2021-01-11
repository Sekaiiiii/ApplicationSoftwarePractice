import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        //用户登录状态
        is_login: false,
        //用户信息
        user_info: {
            name: ""
        },
        main_page_cache: {
            user_num: "",
            article_num: "",
        }
    },
    mutations: {
        setLoginStatu(state, is_login) {
            state.is_login = is_login
        },
        setUserInfo(state, user_info) {
            state.user_info.name = user_info.name;
        },
        setMainPageCacheUserNum(state, p) {
            state.main_page_cache.user_num = p;
        },
        setMainPageCacheArticleNum(state, p) {
            state.main_page_cache.article_num = p;
        }
    }
})