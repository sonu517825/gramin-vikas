import { useState, React, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config'
import { Table, Tooltip, Typography, Card, Popover } from 'antd';


import moment from 'moment'

const { Text } = Typography;

const MyTeam = ({ message }) => {
    let [dataArray, setResHandler] = useState([]);
    const [detailsArray, setDetailsArray] = useState([]);
    const [countDetails, setCountDetails] = useState({
        "total": 0,
        "direct": 0,
        "refer": 0,
        "paired": 0
    });

    const [currentPage, setCurrentPage] = useState(1);




    // dataArray = [
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78c2a6af61833529d6dee",
    //         "my_sponcer_id": "RF139",
    //         "refer_sponcer_id": "AD123",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT - ROOT",
    //         "name": "Shobhit",
    //         "father_name": "Neevar",
    //         "phone": "8082294399",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "MALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-06",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T16:58:18.616Z",
    //         "updatedAt": "2023-08-24T16:58:18.616Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78cf96af61833529d6e02",
    //         "my_sponcer_id": "SJ007",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "AD123",
    //         "position": "LEFT",
    //         "name": "Pusha",
    //         "father_name": "Neevar",
    //         "phone": "08429073512",
    //         "email": "rnsharma888755@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "India",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271403",
    //         "address": "Pras Patti Purwar, Gonda",
    //         "date_of_birth": "2023-08-24",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:01:45.765Z",
    //         "updatedAt": "2023-08-24T17:01:45.765Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78da86af61833529d6e12",
    //         "my_sponcer_id": "TG604",
    //         "refer_sponcer_id": "RF139",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:40.968Z",
    //         "updatedAt": "2023-08-24T17:04:40.968Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64e78daa6af61833529d6e18",
    //         "my_sponcer_id": "RC946",
    //         "refer_sponcer_id": "TG604",
    //         "parent_refer_sponcer_id": "RF139",
    //         "position": "RIGHT",
    //         "name": "Goga",
    //         "father_name": "Fago",
    //         "phone": "7830360293",
    //         "email": "ramesh271002@gmail.com",
    //         "gender": "FEMALE",
    //         "country": "United States",
    //         "state": "Uttar Pradesh",
    //         "city": "Gonda",
    //         "pincode": "271002",
    //         "address": "117, Dhanoli, Gonda",
    //         "date_of_birth": "2023-08-30",
    //         "password": "12345",
    //         "is_deleted": false,
    //         "createdAt": "2023-08-24T17:04:42.227Z",
    //         "updatedAt": "2023-08-24T17:04:42.227Z",
    //         "__v": 0
    //     }
    // ]




    const generatePopoverContent = (id, arr) => {
        let record = {}

        let fil = arr.filter(obj => obj.my_sponcer_id == id)

        if (fil.length > 0) {
            record = fil[0]
        }

        return (
            <div>
                <p><strong>Name:</strong> {record.name}</p>
                <p><strong>Father Name:</strong> {record.father_name}</p>
                <p><strong>Phone:</strong> {record.phone}</p>
                <p><strong>Email:</strong> {record.email}</p>
                <p><strong>Gender:</strong> {record.gender}</p>
                <p><strong>Country:</strong> {record.country}</p>
                <p><strong>State:</strong> {record.state}</p>
                <p><strong>City:</strong> {record.city}</p>
                <p><strong>Pincode:</strong> {record.pincode}</p>
                <p><strong>Date of Birth:</strong>  {record.date_of_birth && moment(record.date_of_birth).format('D MMM YYYY')}</p>
            </div>
        )
    }


    useEffect(() => {
        axios.get(
            `${BASE_URL}/api/user/my-team/count/${message?.my_sponcer_id || 0}`,
        )
            .then((result) => {
                setCountDetails(result.data.result || {
                    "total": 0,
                    "direct": 0,
                    "refer": 0,
                    "paired": 0
                })
            })
            .catch((error) => {
            });
        axios.get(
            `${BASE_URL}/api/user/my-team/table/${message?.my_sponcer_id || 0}`,
        )
            .then((result) => {
                setResHandler(result.data.result || []);
                setDetailsArray(result.data.details || []);
            })
            .catch((error) => {
            });
    }, []);


    const itemsPerPage = 5;


    const startIndex = (currentPage - 1) * itemsPerPage;



    const calculateSerialNumber = (index) => index + startIndex;


    const columns = [
        {
            title: 'Serial Number',
            key: 'serialNumber',
            render: (text, record, index) => (
                <span>{calculateSerialNumber(index)}</span>
            ),
        },
        {
            title: 'Sponcer Id',
            dataIndex: 'my_sponcer_id',
            key: 'my_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, detailsArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: <span className="bold-title">Name</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span className="bold-title">Phone</span>,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Place Id',
            dataIndex: 'refer_sponcer_id',
            key: 'refer_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, detailsArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: 'Direct',
            dataIndex: 'parent_refer_sponcer_id',
            key: 'parent_refer_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, detailsArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: 'Joining Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('D MMM YYYY HH:mm:ss')
        },
    ];

    return (

        <div style={{ overflow: "hidden", maxHeight: "calc(81vh - 6px)", }} >
            <Card style={{ overflow: "hidden", backgroundColor: '#10B981', }}>
                <div style={{ overflow: "hidden", display: 'flex', justifyContent: 'space-between', width: "100%", alignItems: "start", }}>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '205px',
                        height: '140px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Total</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.total}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '205px',
                        height: '140px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Direct</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '205px',
                        height: '140px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Refer</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.refer}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '205px',
                        height: '140px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Paired</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.paired}</Text>
                        </div>
                    </Card>
                </div>
            </Card >
            <div style={{ marginBottom: "10px", maxHeight: "calc(100vh - 330px)", overflow: "hidden" }}>
                <Table dataSource={dataArray} columns={columns} pagination={{
                    current: currentPage,
                    pageSize: 5,
                    total: dataArray.length,
                    onChange: (page) => setCurrentPage(page),
                }} />

            </div>
        </div>


    );

}
export default MyTeam;
