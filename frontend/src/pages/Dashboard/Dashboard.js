
import {
    Button,
    Card,
    Form,
    Input,
    Radio,
    Select,
    Modal
} from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config'


const Dashboard = ({ message }) => {
   console.log(message)
    return (
        <div>
            <h1>Dashboard Comming Soon...!!!</h1>

        </div >
    );
};
export default Dashboard;