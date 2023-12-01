import React, {useState} from 'react';
import {Menu} from 'antd';
import {
    InfoCircleFilled,
    HomeFilled,
    SettingFilled,
} from '@ant-design/icons';

import Home from "./pages/Home.js";

const componentsSwitch = (key) => {
    switch (key) {
        case 'Home':
            return <Home/>;
        case 'Settings':
            return (<h1>Settings</h1>);
        case 'Info':
            return (<h3>Info</h3>);
        default:
            break;
    }
};

const App = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('item1');

    return (
        <div className="App">
            <Menu
                selectedKeys={selectedMenuItem} mode="horizontal" onClick={(e) => setSelectedMenuItem(e.key)}>
                <Menu.Item key="Home" icon={<HomeFilled/>}>Home</Menu.Item>
                <Menu.Item key="Settings" icon={<SettingFilled/>}>Settings</Menu.Item>
                <Menu.Item key="Info" icon={<InfoCircleFilled/>}>Information</Menu.Item>
            </Menu>
            <div>
                {componentsSwitch(selectedMenuItem)}
            </div>
        </div>)
};

export default App;
