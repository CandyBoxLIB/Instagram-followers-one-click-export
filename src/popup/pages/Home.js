import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Select, Input, List, Typography} from "antd";
import React from "react";

import {_getEdgeById, getUserProfileInfoByName, loginAndSaveSession} from "../../api";
import {igClient} from "../../api/login_and_save_session";

const FOLLOWINGS = 'followings';
const FOLLOWERS = 'followers';
const LOCATION = 'location';
const HASHTAG = 'hashtag';

let currentSelection = FOLLOWINGS;

const handleChange = (value) => {
    switch (value) {
        case FOLLOWINGS:
            break;
        case FOLLOWERS:
            break;
        case LOCATION:
            break;
        case HASHTAG:
            break;
        default:
            console.error("Non-existent value: " + value);
    }
};

let currentUserName = 'yangmimimi912';

const followingsData = [];
let followingsQueryIndex = {};
let stopGettingFollowingsData = false;
const startGetFollowings = async () => {
    stopGettingFollowingsData = false;

    await loginAndSaveSession("amias_thz", "EsMussSein123");
    // await igClient.account.login("amias_thz", "EsMussSein123");
    console.log("Logged in now");

    const id = await igClient.user.getIdByUsername(currentUserName);
    console.log(id);
    followingsQueryIndex.userId = await igClient.user.info(id);
    // followingsQueryIndex.userId = 3673555069;
    followingsQueryIndex.hasNext = true;
    console.log(followingsQueryIndex);

    let l = 0;
    console.log(l++);
    console.log(followingsQueryIndex.hasNext +',' + !stopGettingFollowingsData);
    while (followingsQueryIndex.hasNext && !stopGettingFollowingsData) {
        console.log(l++);
        await _getEdgeById("edge_followed_by", followingsQueryIndex, node => {
            console.log(node);
            followingsData.push({
                name: node.name,
                fullName: node.full_name,
            })
        });
    }


};

const stopGetFollowings = () => {
    stopGettingFollowingsData = true;
}

const onUserNameInputChange = (v) => {
    currentUserName = v;
    followingsData.length = 0;
    followingsQueryIndex = {};
};


const CurrentSelectionConfig = () => {
    switch (currentSelection) {
        case FOLLOWINGS:
            return (<div>
                <label>User Name</label><Input onChange={onUserNameInputChange} placeholder={currentUserName}/>
                <Button type="primary" onClick={startGetFollowings}>Start</Button>
                <Button type="primary" onClick={stopGetFollowings}>Stop</Button>
                <List
                    header={<p>Fetched followings:</p>}
                    bordered
                    dataSource={followingsData}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item.name} {item.fullName}
                        </List.Item>
                    )}
                />
            </div>);
        case FOLLOWERS:
            return (<p>FOLLOWERS</p>);

        case LOCATION:
            return (<p>LOCATION</p>);

        case HASHTAG:
            return (<p>HASHTAG</p>);

        default:
            return (<p>Non-existent page : {currentSelection}</p>);
    }
}

const Home = () => {
    return (
        <div>
            <Select
                defaultValue={FOLLOWINGS}
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: FOLLOWERS,
                        label: FOLLOWERS,
                    },
                    {
                        value: FOLLOWINGS,
                        label: FOLLOWINGS,
                    },
                    {
                        value: LOCATION,
                        label: LOCATION,
                    },
                    {
                        value: HASHTAG,
                        label: HASHTAG,
                    }
                ]}
            />
            <CurrentSelectionConfig/>
        </div>);
}

export default Home;


// https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables={"tag_name":"travel","after":"","first":50,"show_ranked":false}
// https://www.instagram.com/graphql/query/?query_hash=36bd0f2bf5911908de389b8ceaa3be6d&variables={"id":"244712104","after":"","first":50}

