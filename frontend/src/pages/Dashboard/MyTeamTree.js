import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

const TreeView = ({ message }) => {

    const rows = [];
    function power(base, exponent) {
        return Math.pow(base, exponent);
    }

    const _get_left_right = (position,sponcer_id) => {

        // let _d = [
        //     {
        //         //   _id: ObjectId("64cab8ad083f8fc7c5d5c086"),
        //         my_sponcer_id: 'AD123',
        //         refer_sponcer_id: 'AD123',
        //         position: 'MAIN',
        //         name: 'Ramesh Maurya',
        //         phone: '7830360293',
        //         email: 'ramesh271002@gmail.com',
        //         gender: 'MALE',
        //         country: 'India',
        //         state: 'UP',
        //         city: 'Gonda',
        //         pincode: '271002',
        //         date_of_birth: '03-07-2000',
        //         password: '181818',
        //         is_deleted: false,
        //         createdAt: "2023-08-02T20:12:29.764Z",
        //         updatedAt: "2023-09-02T17:51:34.263Z",
        //         __v: 0,
        //         parent_refer_sponcer_id: 'AD123',
        //         father_name: 'Pateshwari Prashad',
        //         address: 'Sony Gumty',
        //         right_count: 0,
        //         left_count: 2,
        //         right_side: null,
        //         left_side: 'QE362'
        //     },
        //     {
        //         //   _id: ObjectId("64f376043b3ae20acfab50d9"),
        //         my_sponcer_id: 'QE362',
        //         refer_sponcer_id: 'AD123',
        //         left_side: null,
        //         right_side: 'JY608',
        //         parent_refer_sponcer_id: 'AD123',
        //         position: 'LEFT',
        //         name: 'sonu verma',
        //         father_name: 'Rajitrem verma',
        //         phone: '6387713231',
        //         email: 'sonu@gmail.com',
        //         gender: 'MALE',
        //         country: 'india',
        //         state: 'up',
        //         city: 'gonda',
        //         pincode: '271604',
        //         address: '',
        //         left_count: 1,
        //         right_count: 0,
        //         date_of_birth: '03-07-2000',
        //         password: 'AD123',
        //         is_deleted: false,
        //         createdAt: "2023-09-02T17:51:00.826Z",
        //         updatedAt: "2023-09-02T17:51:33.492Z",
        //         __v: 0
        //     },
        //     {
        //         //   _id: ObjectId("64f376243b3ae20acfab5110"),
        //         my_sponcer_id: 'JY608',
        //         refer_sponcer_id: 'QE362',
        //         left_side: null,
        //         right_side: null,
        //         parent_refer_sponcer_id: 'AD123',
        //         position: 'LEFT',
        //         name: 'sonu verma',
        //         father_name: 'Rajitrem verma',
        //         phone: '6387713231',
        //         email: 'sonu@gmail.com',
        //         gender: 'MALE',
        //         country: 'india',
        //         state: 'up',
        //         city: 'gonda',
        //         pincode: '271604',
        //         address: '',
        //         left_count: 0,
        //         right_count: 0,
        //         date_of_birth: '03-07-2000',
        //         password: 'AD123',
        //         is_deleted: false,
        //         createdAt: "2023-09-02T17:51:32.713Z",
        //         updatedAt: "2023-09-02T17:51:32.713Z",
        //         __v: 0
        //     }
        // ]

        let _d = message?.payload_tree || []

        let data = _d.filter(obj => obj.my_sponcer_id == sponcer_id)
        if(position == 0){
            return data?.[0]?.left_side
        }
        if(position == 1){
            return data?.[0]?.right_side
        }
        
    };

    let members = [`P-${message?.payload?.my_sponcer_id}`]
    const totalRows = 4;
    const defaultIconSrc = '/image/mlm user.png';
    let check_mem = [message.my_sponcer_id]

    for (let i = 0; i < totalRows; i++) {
        
        if (members.length == 0) {
                break
            }


        let print_member = ""
        let temp_member_index = 0
        let temp_members = []
        if (i < 3) {
            let row_divide = power(2, i);

            const columnSize = `col-${parseInt(12 / row_divide) == 0 ? 1 : parseInt(12 / row_divide)}`;

            const columns = [];

            for (let j = 0; j < row_divide; j++) {
                print_member = members[j]
                columns.push(
                   
                    <div key={j} className={`${columnSize} p-2 text-center`}>
                        <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} alt="User Icon" />
                        <br/>
                        <p className="">{print_member}</p>
                    </div>

                );
                
                for (let k = 0; k < 2; k++) {
                    let le_ri = _get_left_right(k,print_member?.split("-")?.[1])
                
                    if(k == 0 && le_ri){
                        temp_members[temp_member_index] = `L-${le_ri}`
                    }


                    if(k == 1 && le_ri){
                        temp_members[temp_member_index] = `R-${le_ri}`
                    }

                    
                    
                    temp_member_index = temp_member_index + 1
                    check_mem.push(le_ri)
                }
            }

            rows.push(
                <div key={i} className="row p-2">
                    {columns}
                </div>
            );
        }
      
        if (i == 3) {
            let row_divide = power(2, i);


            const columnSize = `col-${parseInt(12 / row_divide) == 0 ? 1 : parseInt(12 / row_divide)}`;

            const columns = [];

            for (let j = 0; j < row_divide; j++) {
                print_member = members[j]
                columns.push(
                    <div key={j} className={`${columnSize} mr-[53px] p-2`}>
                        <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
                        <br/>
                        <p className="">{print_member}</p>
                    </div>
                );

                for (let k = 0; k < 2; k++) {
                    let le_ri = _get_left_right(k,print_member?.split("-")?.[1])
                
                    if(k == 0 && le_ri){
                        temp_members[temp_member_index] = `L-${le_ri}`
                    }


                    if(k == 1 && le_ri){
                        temp_members[temp_member_index] = `R-${le_ri}`
                    }

                    
                    
                    temp_member_index = temp_member_index + 1
                    check_mem.push(le_ri)
                }

            }

            rows.push(
                <div key={i} className="row p-2 ml-[22px] ">
                    {columns}
                </div>
            );
        }
        if (i == 4) {
            let row_divide = power(2, i);

            const columns = [];

            for (let j = 0; j < row_divide; j++) {
                columns.push(
                    <div key={j} className={`col-1 p-2 w-12`}>
                        <img className="w-9 h-9 rounded-full mx-auto" src={defaultIconSrc} />
                        <br></br>
                        <p>{members[0]}</p>
                    </div>
                );
            }

            rows.push(
                <div key={i} className="row p-2" >
                    {columns}
                </div>
            );
        }
        members = temp_members
        // console.log(members, "members")


    }

   

    return (
        <div>
         {rows} 
        </div>
    );
};

export default TreeView;


















// // // import React, { useEffect, useState } from 'react';

// // // const TreeView = ({ message }) => {
// // //     const [rows, setRows] = useState([]);
// // //     const [is_done, setIs_done] = useState(false);
// // //     function power(base, exponent) {
// // //         return Math.pow(base, exponent);
// // //     }

// // //     const get_left_right = async (sponcer_id) => {
// // //         console.log(sponcer_id, "yyyyyyyyyyyyyyyy");
// // //         const resp = await axios.get(
// // //             `${BASE_URL}/api/user/my-team/tree/${sponcer_id}`
// // //         );
// // //         return resp.data.result;
// // //     };

// // //     let members = [message?.my_sponcer_id];
// // //     const totalRows = 6;
// // //     const defaultIconSrc = '/image/mlm user.png';

// // //     let asyncTasks = [];

// // //     for (let i = 0; i < totalRows; i++) {
// // //         if (members.every(ele => ele == null)) {
// // //             break
// // //         }
// // //         let print_member = '';
// // //         let temp_members = [];

// // //         if (i < 3) {
// // //             let row_divide = power(2, i);

// // //             const columnSize = `col-${parseInt(12 / row_divide) == 0 ? 1 : parseInt(12 / row_divide)}`;

// // //             const columns = [];

// // //             for (let j = 0; j < row_divide; j++) {
// // //                 print_member = members[j];

// // //                 if (print_member) {
// // //                     const task = get_left_right(print_member)
// // //                         .then(dumy => {
// // //                             console.log(dumy, "dumy");

// // //                             if (dumy && dumy.left_side) {
// // //                                 temp_members.push(dumy.left_side);
// // //                             } else {
// // //                                 // temp_members.push("L-N/A");
// // //                                 temp_members.push(null);
// // //                             }

// // //                             if (dumy && dumy.right_side) {
// // //                                 temp_members.push(dumy.right_side);
// // //                             } else {
// // //                                 // temp_members.push("R-N/A");
// // //                                 temp_members.push(null);
// // //                             }
// // //                         })
// // //                         .catch(error => {
// // //                             console.error(error);
// // //                         });


// // //                     asyncTasks.push(task);
// // //                     // asyncTasks = []
// // //                 }

// // //                 columns.push(
// // //                     <div key={j} className={`${columnSize} p-2`}>
// // //                         <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
// // //                         <br></br>
// // //                         <p>{print_member}</p>
// // //                     </div>
// // //                 );
// // //             }

// // //             rows.push(
// // //                 <div key={i} className="row p-2">
// // //                     {columns}
// // //                 </div>
// // //             );
// // //         }

// // //         members = temp_members;
// // //         console.log(members, "members");
// // //     }

    // useEffect(() => {
    //     Promise.all(asyncTasks).then(() => {
    //         setRows(rows);
    //         setIs_done(true);
    //     });
    // }, []);

    // return (
    //     <div>
    //         {is_done ? rows : <div>
    //             <p>
    //                 loading...
    //             </p>

    //         </div>}
    //     </div>
    // );
// // // };

// // // export default TreeView;

























// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { BASE_URL } from '../../config/config';

// // // const TreeView = ({ message }) => {
// // //     const [rows, setRows] = useState([]);
// // //     const [is_done, setIs_done] = useState(false);

// // //     useEffect(() => {
// // //         let is_already = new Set();
// // //         let members = [message?.my_sponcer_id];
// // //         const totalRows = 6;
// // //         const defaultIconSrc = '/image/mlm user.png';

// // //         const power = (base, exponent) => {
// // //             return Math.pow(base, exponent);
// // //         };

// // //         const get_left_right = async (sponcer_id) => {
// // //             console.log(sponcer_id, 'yyyyyyyyyyyyyyyy');
// // //             const resp = await axios.get(
// // //                 `${BASE_URL}/api/user/my-team/tree/${sponcer_id}`
// // //             );
// // //             return resp.data.result;
// // //         };

// // //         const _get_left_right = (sponcer_id) => {
// // //             let _d = [
// // //                 {
// // //                     my_sponcer_id: 'AD123',
// // //                     refer_sponcer_id: 'AD123',
// // //                     position: 'MAIN',
// // //                     name: 'Ramesh Maurya',
// // //                     // Rest of your data...
// // //                 },
// // //                 {
// // //                     my_sponcer_id: 'QE362',
// // //                     refer_sponcer_id: 'AD123',
// // //                     left_side: null,
// // //                     right_side: 'JY608',
// // //                     // Rest of your data...
// // //                 },
// // //                 {
// // //                     my_sponcer_id: 'JY608',
// // //                     refer_sponcer_id: 'QE362',
// // //                     left_side: null,
// // //                     right_side: null,
// // //                     // Rest of your data...
// // //                 }
// // //                 // Add more data as needed...
// // //             ];

// // //             let data = _d.filter((obj) => obj.my_sponcer_id === sponcer_id);
// // //             return data;
// // //         };

// // //         (() => {
// // //             const newRows = [];

// // //             for (let i = 0; i < totalRows; i++) {
// // //                 if (members.every((ele) => ele === 'L-NA' || ele === 'R-NA')) {
// // //                     break;
// // //                 }

// // //                 let print_member = '';
// // //                 let temp_members = [];

// // //                 if (i < 3) {
// // //                     let row_divide = power(2, i);

// // //                     const columnSize = `col-${parseInt(12 / row_divide) === 0 ? 1 : parseInt(12 / row_divide)
// // //                         }`;

// // //                     const columns = [];

// // //                     for (let j = 0; j < row_divide; j++) {
// // //                         print_member = members[j];

// // //                         // if (
// // //                         //     is_already.has(print_member) ||
// // //                         //     !print_member ||
// // //                         //     print_member === 'L-NA' ||
// // //                         //     print_member === 'R-NA'
// // //                         // ) {
// // //                         // } else {
// // //                         //     const dumy = _get_left_right(print_member);
// // //                         //     console.log(dumy, 'dumy');

// // //                         //     if (dumy && dumy.left_side) {
// // //                         //         if (!is_already.has(dumy.left_side)) {
// // //                         //             temp_members.push(dumy.left_side);
// // //                         //         }
// // //                         //     } else {
// // //                         //         temp_members.push('L-NA');
// // //                         //     }

// // //                         //     if (dumy && dumy.right_side) {
// // //                         //         if (!is_already.has(dumy.right_side)) {
// // //                         //             temp_members.push(dumy.right_side);
// // //                         //         }
// // //                         //     } else {
// // //                         //         temp_members.push('R-NA');
// // //                         //     }
// // //                         // }

// // //                         columns.push(
// // //                             <div key={j} className={`${columnSize} p-2`}>
// // //                                 <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
// // //                                 <br />
// // //                                 <p>{print_member}</p>
// // //                             </div>
// // //                         );
// // //                     }

// // //                     newRows.push(
// // //                         <div key={i} className="row p-2">
// // //                             {columns}
// // //                         </div>
// // //                     );
// // //                 }

// // //                 // if (i === 3) {
// // //                 //     let row_divide = power(2, i);

// // //                 //     const columnSize = `col-${parseInt(12 / row_divide) === 0 ? 1 : parseInt(12 / row_divide)
// // //                 //         }`;

// // //                 //     const columns = [];

// // //                 //     for (let j = 0; j < row_divide; j++) {
// // //                 //         print_member = members[j];

// // //                 //         if (
// // //                 //             is_already.has(print_member) ||
// // //                 //             !print_member ||
// // //                 //             print_member === 'L-NA' ||
// // //                 //             print_member === 'R-NA'
// // //                 //         ) {
// // //                 //         } else {
// // //                 //             const dumy = _get_left_right(print_member);
// // //                 //             console.log(dumy, 'dumy');

// // //                 //             if (dumy && dumy.left_side) {
// // //                 //                 if (!is_already.has(dumy.left_side)) {
// // //                 //                     temp_members.push(dumy.left_side);
// // //                 //                 }
// // //                 //             } else {
// // //                 //                 temp_members.push('L-NA');
// // //                 //             }

// // //                 //             if (dumy && dumy.right_side) {
// // //                 //                 if (!is_already.has(dumy.right_side)) {
// // //                 //                     temp_members.push(dumy.right_side);
// // //                 //                 }
// // //                 //             } else {
// // //                 //                 temp_members.push('R-NA');
// // //                 //             }
// // //                 //         }
// // //                 //         columns.push(
// // //                 //             <div key={j} className={`${columnSize} mr-[54px] p-2`}>
// // //                 //                 <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
// // //                 //                 <br />
// // //                 //                 <p>{print_member}</p>
// // //                 //             </div>
// // //                 //         );
// // //                 //     }

// // //                 //     newRows.push(
// // //                 //         <div key={i} className="row p-2 ">
// // //                 //             {columns}
// // //                 //         </div>
// // //                 //     );
// // //                 // }

// // //                 // if (i === 4) {
// // //                 //     let row_divide = power(2, i);

// // //                 //     const columns = [];

// // //                 //     for (let j = 0; j < row_divide; j++) {
// // //                 //         print_member = members[j];

// // //                 //         if (
// // //                 //             is_already.has(print_member) ||
// // //                 //             !print_member ||
// // //                 //             print_member === 'L-NA' ||
// // //                 //             print_member === 'R-NA'
// // //                 //         ) {
// // //                 //         } else {
// // //                 //             const dumy = _get_left_right(print_member);
// // //                 //             console.log(dumy, 'dumy');

// // //                 //             if (dumy && dumy.left_side) {
// // //                 //                 if (!is_already.has(dumy.left_side)) {
// // //                 //                     temp_members.push(dumy.left_side);
// // //                 //                 }
// // //                 //             } else {
// // //                 //                 temp_members.push('L-NA');
// // //                 //             }

// // //                 //             if (dumy && dumy.right_side) {
// // //                 //                 if (!is_already.has(dumy.right_side)) {
// // //                 //                     temp_members.push(dumy.right_side);
// // //                 //                 }
// // //                 //             } else {
// // //                 //                 temp_members.push('R-NA');
// // //                 //             }
// // //                 //         }
// // //                 //         columns.push(
// // //                 //             <div key={j} className={`col-1 p-2`}>
// // //                 //                 <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
// // //                 //                 <br />
// // //                 //                 <p>{print_member}</p>
// // //                 //             </div>
// // //                 //         );
// // //                 //     }

// // //                 //     newRows.push(
// // //                 //         <div key={i} className="row p-2">
// // //                 //             {columns}
// // //                 //         </div>
// // //                 //     );
// // //                 // }

// // //                 members = temp_members;
// // //                 console.log(members, 'members');
// // //             }

// // //             setRows(newRows);
// // //             setIs_done(true);
// // //         })();
// // //     }, [message]);

// // //     return (
// // //         <div>
// // //             {is_done ? (
// // //                 rows
// // //             ) : (
// // //                 <div>
// // //                     <p>loading...</p>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default TreeView;




// import "./MyTeamTree.css";
// import {
//     Button,
//     Card,
//     Form,
//     Input,
//     Radio,
//     Select,
//     Modal
// } from "antd";
// import axios from "axios";
// import { BASE_URL } from '../../config/config'

// import React, { useEffect, useState } from 'react';

// const TreeView = ({ message }) => {
//     let is_already = new Set()
//     const [rows, setRows] = useState([]);
//     const [is_done, setIs_done] = useState(true);

//     function power(base, exponent) {
//         return Math.pow(base, exponent);
//     }

    // const get_left_right = async (sponcer_id) => {
    //     console.log(sponcer_id, "yyyyyyyyyyyyyyyy");
    //     const resp = await axios.get(
    //         `${BASE_URL}/api/user/my-team/tree/${sponcer_id}`
    //     );
    //     return resp.data.result;
    // };
    // const _get_left_right = (sponcer_id) => {
    //     let _d = [
    //         {
    //             //   _id: ObjectId("64cab8ad083f8fc7c5d5c086"),
    //             my_sponcer_id: 'AD123',
    //             refer_sponcer_id: 'AD123',
    //             position: 'MAIN',
    //             name: 'Ramesh Maurya',
    //             phone: '7830360293',
    //             email: 'ramesh271002@gmail.com',
    //             gender: 'MALE',
    //             country: 'India',
    //             state: 'UP',
    //             city: 'Gonda',
    //             pincode: '271002',
    //             date_of_birth: '03-07-2000',
    //             password: '181818',
    //             is_deleted: false,
    //             createdAt: "2023-08-02T20:12:29.764Z",
    //             updatedAt: "2023-09-02T17:51:34.263Z",
    //             __v: 0,
    //             parent_refer_sponcer_id: 'AD123',
    //             father_name: 'Pateshwari Prashad',
    //             address: 'Sony Gumty',
    //             right_count: 0,
    //             left_count: 2,
    //             right_side: null,
    //             left_side: 'QE362'
    //         },
    //         {
    //             //   _id: ObjectId("64f376043b3ae20acfab50d9"),
    //             my_sponcer_id: 'QE362',
    //             refer_sponcer_id: 'AD123',
    //             left_side: null,
    //             right_side: 'JY608',
    //             parent_refer_sponcer_id: 'AD123',
    //             position: 'LEFT',
    //             name: 'sonu verma',
    //             father_name: 'Rajitrem verma',
    //             phone: '6387713231',
    //             email: 'sonu@gmail.com',
    //             gender: 'MALE',
    //             country: 'india',
    //             state: 'up',
    //             city: 'gonda',
    //             pincode: '271604',
    //             address: '',
    //             left_count: 1,
    //             right_count: 0,
    //             date_of_birth: '03-07-2000',
    //             password: 'AD123',
    //             is_deleted: false,
    //             createdAt: "2023-09-02T17:51:00.826Z",
    //             updatedAt: "2023-09-02T17:51:33.492Z",
    //             __v: 0
    //         },
    //         {
    //             //   _id: ObjectId("64f376243b3ae20acfab5110"),
    //             my_sponcer_id: 'JY608',
    //             refer_sponcer_id: 'QE362',
    //             left_side: null,
    //             right_side: null,
    //             parent_refer_sponcer_id: 'AD123',
    //             position: 'LEFT',
    //             name: 'sonu verma',
    //             father_name: 'Rajitrem verma',
    //             phone: '6387713231',
    //             email: 'sonu@gmail.com',
    //             gender: 'MALE',
    //             country: 'india',
    //             state: 'up',
    //             city: 'gonda',
    //             pincode: '271604',
    //             address: '',
    //             left_count: 0,
    //             right_count: 0,
    //             date_of_birth: '03-07-2000',
    //             password: 'AD123',
    //             is_deleted: false,
    //             createdAt: "2023-09-02T17:51:32.713Z",
    //             updatedAt: "2023-09-02T17:51:32.713Z",
    //             __v: 0
    //         }
    //     ]

    //     let data = _d.filter(obj => obj.my_sponcer_id == sponcer_id)
    //     return data
    // };

//     let members = [message?.my_sponcer_id];
//     const totalRows = 6;
//     const defaultIconSrc = '/image/mlm user.png';

   
//     for (let i = 0; i < totalRows; i++) {
//         if (members.every((ele) => ele == "L-NA" && ele == "R-NA")) {
//             break;
//         }
//         let print_member = '';
//         let temp_members = [];

//         if (i < 3) {
//             let row_divide = power(2, i);

//             const columnSize = `col-${parseInt(12 / row_divide) == 0 ? 1 : parseInt(12 / row_divide)}`;

//             const columns = [];

//             for (let j = 0; j < row_divide; j++) {
//                 // print_member = members[j];

//                 // if (is_already.has(print_member) || !print_member || print_member == "L-NA" || print_member == "R-NA") {

//                 // } else {
//                 //     // const dumy = await get_left_right(print_member);
//                 //     const dumy = _get_left_right(print_member);
//                 //     console.log(dumy, "dumy");

//                 //     if (dumy && dumy.left_side) {

//                 //         if (!is_already.has(dumy.left_side)) {
//                 //             temp_members.push(dumy.left_side);
//                 //         }
//                 //     } else {
//                 //         temp_members.push("L-NA");
//                 //         // temp_members.push(null);
//                 //     }

//                 //     if (dumy && dumy.right_side) {
//                 //         if (!is_already.has(dumy.right_side)) {
//                 //             temp_members.push(dumy.right_side);
//                 //         }
//                 //     } else {
//                 //         temp_members.push("R-NA");
//                 //         // temp_members.push(null);
//                 //     }
//                 // }

//                 columns.push(
//                     <div key={j} className={`${columnSize} p-2`}>
//                         <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
//                         <br></br>
//                         {/* <p>{print_member}</p> */}
//                     </div>
//                 );
//             }

//             rows.push(
//                 <div key={i} className="row p-2">
//                     {columns}
//                 </div>
//             );
//         }

//         if (i == 3) {
//             let row_divide = power(2, i);


//             const columnSize = `col-${parseInt(12 / row_divide) == 0 ? 1 : parseInt(12 / row_divide)}`;

//             const columns = [];

//             for (let j = 0; j < row_divide; j++) {
//                 // print_member = members[j];

//                 // if (is_already.has(print_member) || !print_member || print_member == "L-NA" || print_member == "R-NA") {

//                 // } else {
//                 //     // const dumy = await get_left_right(print_member);
//                 //     const dumy = _get_left_right(print_member);
//                 //     console.log(dumy, "dumy");

//                 //     if (dumy && dumy.left_side) {
//                 //         if (!is_already.has(dumy.left_side)) {
//                 //             temp_members.push(dumy.left_side);
//                 //         }
//                 //     } else {
//                 //         temp_members.push("L-NA");
//                 //         // temp_members.push(null);
//                 //     }

//                 //     if (dumy && dumy.right_side) {
//                 //         if (!is_already.has(dumy.right_side)) {
//                 //             temp_members.push(dumy.right_side);
//                 //         }
//                 //     } else {
//                 //         temp_members.push("R-NA");
//                 //         // temp_members.push(null);
//                 //     }
//                 // }
//                 columns.push(
//                     <div key={j} className={`${columnSize} mr-[54px] p-2`}>
//                         <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
//                         <br></br>
//                         {/* <p>{print_member}</p> */}
//                     </div>
//                 );
//             }

//             rows.push(
//                 <div key={i} className="row p-2 ">
//                     {columns}
//                 </div>
//             );
//         }




//         if (i == 4) {
//             let row_divide = power(2, i);

//             const columns = [];

//             for (let j = 0; j < row_divide; j++) {
//                 // print_member = members[j];

//                 // if (is_already.has(print_member) || !print_member || print_member == "L-NA" || print_member == "R-NA") {

//                 // } else {
//                 //     // const dumy = await get_left_right(print_member);
//                 //     const dumy = _get_left_right(print_member);
//                 //     console.log(dumy, "dumy");

//                 //     if (dumy && dumy.left_side) {
//                 //         if (!is_already.has(dumy.left_side)) {
//                 //             temp_members.push(dumy.left_side);
//                 //         }
//                 //     } else {

//                 //         temp_members.push("L-NA");
//                 //         // temp_members.push(null);
//                 //     }

//                 //     if (dumy && dumy.right_side) {
//                 //         if (!is_already.has(dumy.right_side)) {
//                 //             temp_members.push(dumy.right_side);
//                 //         }

//                 //     } else {
//                 //         temp_members.push("R-NA");
//                 //         // temp_members.push(null);
//                 //     }
//                 // }
//                 columns.push(
//                     <div key={j} className={`col-1 p-2`}>
//                         <img className="w-10 h-10 rounded-full mx-auto" src={defaultIconSrc} />
//                         <br></br>
//                         {/* <p>{print_member}</p> */}
//                     </div>
//                 );
//             }

//             rows.push(
//                 <div key={i} className="row p-2" >
//                     {columns}
//                 </div>
//             );
//         }

//         members = temp_members;
//         console.log(members, "members");
//     }

//     return (
//         <div>
//             {is_done ? rows : <div>
//                 <p>
//                     loading...
//                 </p>
//             </div>}
//         </div>
//     );
// };

// export default TreeView;



// // my code


// // error is Uncaught Error: Too many re - renders.React limits the number of renders to prevent an infinite loop.
