const {igClient} = require("./login_and_save_session");

module.exports._getEdgeById = async function _getEdgeById(prop, input, callback) {
    // necessary input data.
    const {userId} = input;
    let hasNext = input.hasOwnProperty("hasNext") ? input.hasNext : true;
    let after = input.hasOwnProperty("after") ? input.after : null;

    if (!hasNext) return input;

    // other configuration.
    let includeReel = input.hasOwnProperty("includeReel") ? input.includeReel : true;
    let fetchMutual = input.hasOwnProperty("fetchMutual") ? input.fetchMutual : true;
    let first = input.hasOwnProperty("first") ? input.first : 50;

    // prepare.
    const variables = encodeURIComponent(
        JSON.stringify({
            id: userId,
            include_reel: includeReel,
            fetch_mutual: fetchMutual,
            first: first,
            after: after,
        })
    );

    // query and resolve
    await igClient.request.send(
        {url: `/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${variables}`}
    ).then(res => {
        return res.body;
    }).then((res) => {
        hasNext = res.data.user[prop].page_info.has_next_page;
        after = res.data.user[prop].page_info.end_cursor;
        res.data.user[prop].edges.forEach(callback);
    });

    // continue task later.
    input.after = after;
    input.hasNext = hasNext;

    return input;
}
