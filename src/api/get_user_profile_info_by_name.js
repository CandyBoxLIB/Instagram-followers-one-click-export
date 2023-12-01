const {igClient} = require("./login_and_save_session");

module.exports.getUserProfileInfoByName = async function (input) {
    let {userName} = input;
    let data;
    await igClient.request
        .send({url: `/api/v1/users/web_profile_info/?username=${userName}`})
        .then(res => {
            data = res.body.data;
            console.log(data);
        });
    return data;
}
