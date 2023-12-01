const {getUserProfileInfoByName} = require("./get_user_profile_info_by_name");
const {getAllFollowersOfCurrentUser} = require("./get_all_followers_of_current_user");
const {getAllItemsFromFeed} = require("./get_all_items_from_feed");
const {getFollowingsById} = require("./get_followings_by_id");
const {getFollowersById} = require("./get_followers_by_id");
const {loginAndSaveSession} = require("./login_and_save_session");
const {logout} = require("./logout");
const {_getEdgeById} = require("./_get_edge_by_id");

module.exports = {
    _getEdgeById: _getEdgeById,
    getAllFollowersOfCurrentUser: getAllFollowersOfCurrentUser,
    getAllItemsFromFeed: getAllItemsFromFeed,
    getFollowingsById: getFollowingsById,
    getFollowersById: getFollowersById,
    getUserProfileInfoByName: getUserProfileInfoByName,
    loginAndSaveSession: loginAndSaveSession,
    logout: logout,
}