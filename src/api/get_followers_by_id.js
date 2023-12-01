const {igClient} = require("./login_and_save_session");
const {_getEdgeById} = require("./_get_edge_by_id");

module.exports.getFollowersById = async function (input, callback) {
    return _getEdgeById("edge_followed_by", input, callback);
}
