import moment from 'moment';
import { Button, Card } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';

const MyProfile = ({ message }) => {
    return (
        <div className="justify-center items-center w-[80vh] ml-[400px] mt-[20px] ">
            <Card style={{ boxShadow: "20px", width: "90vh" }}>


                <table style={{ padding: "10px",  marginLeft: "30px", marginBottom: "0px", width:"90vh" }}>
                    <tr>

                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: 'xl', padding: '5px' }}>My Sponcer ID :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.my_sponcer_id}</td>
                        <img
                            className=" shadow-lg   grid row-span-2 md:h-[600px] md:w-[100%]  object-contain h-[100%]  object-cover"
                            src="./image/sonu.jpg"
                            alt="sonu"
                        />
                    </div> */}

                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }}>My Sponsor ID:</td>

                        <td className='font-bold text-blue-800 text-xl'>{message?.my_sponcer_id}</td>

                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }}>Name :</td>

                        <td className='font-bold text-blue-800 text-xl'>{message?.name}</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Father Name :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.father_name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Phone NO :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.phone}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Email : </td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.email}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Gender :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.gender}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Country : </td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.country}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >State : </td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.state}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >City :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.city}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Pincode :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.pincode}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >Address :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.address || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black', fontSize: '20px', padding: '5px' }} >DOB :</td>
                        <td className='font-bold text-blue-800 text-xl'>{message?.date_of_birth}</td>
                    </tr>


                </table>



                {/* </> */}

            </Card>

        </div >
    );
};

export default MyProfile;

// flex-row
