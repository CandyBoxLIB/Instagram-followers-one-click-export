const {getAllItemsFromFeed} = require("./get_all_items_from_feed");
const {igClient} = require("./login_and_save_session");

/**
 *
 * @returns {Promise<void>}
 */
module.exports.getAllFollowersOfCurrentUser = async function () {
    // Get all followers.
    const followersFeed = igClient.feed.accountFollowers()
    let allFollowers = getAllItemsFromFeed(followersFeed);

    const usernames = allFollowers.map((follower) => `https://www.instagram.com/${follower.username}`)
    // await storeJSON("other/followers.json", usernames)
}