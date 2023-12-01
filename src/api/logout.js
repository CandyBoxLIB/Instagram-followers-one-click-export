const {StatusResponse} = require('instagram-private-api'); // only for intellisense
const {igClient} = require("./login_and_save_session");

/**
 *
 * @returns {Promise<StatusResponse>}
 */
module.exports.logout = function () {
    return igClient.account.logout();
}