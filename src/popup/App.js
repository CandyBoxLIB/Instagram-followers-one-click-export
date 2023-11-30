import React, {useRef, useState} from 'react';
import {Button, message} from 'antd';
import Insta from "scraper-instagram";
import axios from "axios";

const App = (props) => {
    const [messageApi, contextHolder] = message.useMessage()
    const {welcomeMsg} = props.values

    const mySuccess = () => {
        messageApi.open({
            type: 'success',
            content: welcomeMsg,
            duration: 3,
        });

    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={'./static/logo.svg'} className="App-logo" alt="logo"/>
                <h1 className="App-title">Instagram followers one click export</h1>
            </header>
            <p className="App-btn">
                <Button type="primary" id={"myBtn"} onClick={mySuccess}>Click me</Button>
            </p>
            {contextHolder}
        </div>
    );
};

export default App;
