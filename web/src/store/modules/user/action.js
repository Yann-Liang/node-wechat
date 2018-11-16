import apiService from "@/services/API-servies";

export const userAction = {
    getUserInfo({ commit, state },code) {
        apiService.user
            .getUserInfo({ code:code })
            .then(({ code, data }) => {
                if (code == 0) {
                    commit('UPDATE_USER_INFO', data)
                } else {
                    //todo
                }
            });
    }
}