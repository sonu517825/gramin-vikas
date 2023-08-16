import moment from 'moment';
import { Button, Modal } from "antd";

const SuccessRegister = ({ message }) => {
    return (
        <div>
            <span className="bg-black flex flex-col justify-center items-center w-full h-full">
                <img
                    className="mx-auto w-60 h-60 mb-[20px]"
                    src="/image/logo1.png"
                    alt="logo"
                />
            </span>
            <p className="mt-0 font-bold text-xl text-center mx-2 text-green-800">
                Dear <span className="font-bold text-[18px] text-pink-500">{message.name.toUpperCase()}</span> , Congratulations on successful registration.
            </p>

            <table className='assoc-table'>
                <tr>
                    <td className='font-bold italic text-white text-xl'>Associate Name :</td>
                    <td className='font-bold text-blue-800 text-xl w-fit'>{message.name}</td>
                </tr>
                <tr>
                    <td className='font-bold italic text-white text-xl'>Associate ID :</td>
                    <td className='font-bold text-blue-800 text-xl'>{message.sponcer_id}</td>
                </tr>
                <tr>
                    <td className='font-bold italic text-white text-xl' >Associate Password :</td>
                    <td className='font-bold text-blue-800 text-xl'>{message.password}</td>
                </tr>
            </table>
            <div>
                <div>
                    <span className='font-bold ml-[15px] text-white'>Registerd On</span>
                    <span className='ml-[200px] font-bold text-white'>Best regards</span>
                    <p>
                        <span className='font-bold text-xl text-blue-800'>{moment().format('DD-MMM-YYYY')}</span>
                        <span className='ml-[120px] font-bold text-xl text-blue-800'>Yuva Pragati Pvt Ltd.</span>
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px" }}>
                <Button
                    style={{ backgroundColor: '#0074E4', color: 'white', marginLeft: '20px' }}
                    htmlType="submit"
                    href="/verify"
                >
                    New Registration
                </Button>
                <Button
                    style={{ backgroundColor: '#0074E4', color: 'white', marginLeft: '20px' }}
                    htmlType="submit"
                    href="/login"
                >
                    Login
                </Button>
                <Button
                    style={{ backgroundColor: '#0074E4', color: 'white', marginLeft: '20px' }}
                    htmlType="submit"
                    href="/home"
                >
                    Home
                </Button>
            </div>

        </div>
    )




};

export default SuccessRegister;








