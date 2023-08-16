import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import MyTeam from "./MyTeam";
import Mykyc from "./Mykyc";
import EditKyc from "./EditKyc";
import MyBackAccount from "./MyBackAccount";
import EditbankAccount from "./EditbankAccount";
import MyPayout from "./MyPayout";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import WelcomeLetter from "./WelcomeLetter";
import ChangePassword from "./ChangePassword";

import {
  VerifiedOutlined,
  DashboardOutlined,
  EditOutlined,
  TeamOutlined,
  UserOutlined,
  FundViewOutlined,
  BankOutlined,
  LogoutOutlined,
  PayCircleOutlined,
  GiftOutlined,
  KeyOutlined
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;


const Home = () => {

  const { SubMenu } = Menu;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('/dashboard');
  const location = useLocation();
  // const payload = location.state?.result;
  const [payload, setPayload] = useState(location.state?.result);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };


  const handleDashboard = ({ key }) => {
    navigate(key);
    setActiveMenuItem(key);

  };

  const custom = {
    span: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '6px',
      marginTop: '-1px', // You can adjust this value as needed
    },
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div>
          <span style={custom.span}>YP</span>

        </div>
        <Menu className="mt-[10px]" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleDashboard}>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/dashboard/team/view" icon={<TeamOutlined />}>
            My Team
          </Menu.Item>

          <SubMenu key="3" icon={<VerifiedOutlined />} title="KYC Details">

            <Menu.Item key="/dashboard/kyc/view" icon={<FundViewOutlined />}>
              View Details
            </Menu.Item>

            <Menu.Item key="/dashboard/kyc/edit" icon={<EditOutlined />}>
              Edit Details
            </Menu.Item>

          </SubMenu>


          <SubMenu key="6" icon={<BankOutlined />} title="Bank Details">

            <Menu.Item key="/dashboard/bank/view" icon={<FundViewOutlined />}>
              View Details
            </Menu.Item>

            <Menu.Item key="/dashboard/bank/edit" icon={<EditOutlined />}>
              Edit Details
            </Menu.Item>

          </SubMenu>


          <Menu.Item key="/dashboard/payout/view" icon={<PayCircleOutlined />}>
            Payout
          </Menu.Item>

          <SubMenu key="10" icon={<UserOutlined />} title="My Account">
            <Menu.Item icon={<FundViewOutlined />} key="/dashboard/profile/view" >My Profile</Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/dashboard/profile/edit" >Edit Profile</Menu.Item>
            {/* <Menu.Item icon={<GiftOutlined />} key="/dashboard/profile/welcome">Welcome Letter</Menu.Item> */}
            <Menu.Item icon={<KeyOutlined />} key="/dashboard/profile/password/change">Change Password</Menu.Item>
          </SubMenu>

          <Menu.Item key="/home" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>

        </Menu>
      </Sider>

      <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="text-white text-2xl mt-2"> Welcome
              <span className="text-green-500"> MR {payload?.name?.toUpperCase()} - {payload?.my_sponcer_id} </span>
            </h3>
            <h3 className="text-white text-2xl mt-2 mr-7">Home / Dashboard</h3>
          </div>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          {activeMenuItem === '/dashboard' && (
            <Dashboard payload={payload} />
          )}
          {activeMenuItem === '/dashboard/team/view' && (
            <MyTeam />
          )}
          {activeMenuItem === '/dashboard/kyc/view' && (
            <Mykyc />
          )}
          {activeMenuItem === '/dashboard/kyc/edit' && (
            <EditKyc />
          )}
          {activeMenuItem === '/dashboard/bank/view' && (
            <MyBackAccount />
          )}
          {activeMenuItem === '/dashboard/bank/edit' && (
            <EditbankAccount />
          )}
          {activeMenuItem === '/dashboard/payout/view' && (
            <MyPayout />
          )}

          {activeMenuItem === '/dashboard/profile/view' && (
            <MyProfile message={payload} />
          )}
          {activeMenuItem === '/dashboard/profile/edit' && (
            <EditProfile message={payload} />
          )}
          {activeMenuItem === '/dashboard/profile/welcome' && (
            <WelcomeLetter message={payload} />
          )}
          {activeMenuItem === '/dashboard/profile/password/change' && (
            <ChangePassword message={payload} />
          )}
          {activeMenuItem === '/home' && (
            navigate('/home')
          )}
        </Content>

        <Footer style={{ textAlign: 'center' }}><span className='text-red-500 font-bold text-xl' >Copyright © 2023 Yuva Pragati. All rights reserved</span></Footer>

      </Layout>
    </Layout>
  );
};

export default Home;

