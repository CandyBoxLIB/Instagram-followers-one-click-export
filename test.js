require('dotenv').config();
const { IgApiClient, Feed } = require('instagram-private-api');

const ig = new IgApiClient();

ig.state.generateDevice(process.env.IG_USERNAME);

(async () => {
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
    const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);

    const followers = await getAllItemsFromFeed(followersFeed);
    const following = await getAllItemsFromFeed(followingFeed);
    // Making a new map of users username that follow you.
    const followersUsername = new Set(followers.map(({ username }) => username));
    // Filtering through the ones who aren't following you.
    const notFollowingYou = following.filter(({ username }) => !followersUsername.has(username));

    ig.request.send({
        url: `/api/v1/friendships/3673555069/followers/`,
        qs: {
            // max_id: 10000,
            search_surface: "",
            order: 'default',
            query: '',
            enable_groups: true,
        },
    }).then(res => {
        console.log(res);
    });
})();

/**
 * Source: https://github.com/dilame/instagram-private-api/issues/969#issuecomment-551436680
 * @param feed
 * @returns All items from the feed
 */

async function getAllItemsFromFeed(feed) {
    let items = [];
    do {
        items = items.concat(await feed.items());
    } while (feed.isMoreAvailable());
    return items;
}