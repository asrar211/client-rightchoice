import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => {
    return (
        <>
         <div className='w-full h-5 bg-gradient-to-b from-white to-gray-100'></div>
        <div className="bg-gray-100">
            <div className="mx-5">
                <h1 className="font-bold grot text-xl mb-2">RIGHT CHOICE</h1>
                <p className="text-sm opacity-70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga adipisci quidem.</p>
            </div>
            <div className='flex gap-5 mx-5 mt-5'>
                <span className='rounded-full'><FacebookIcon/></span>
                <span><InstagramIcon/></span>
                <span><YouTubeIcon/></span>
            </div>

            <div className="grid grid-cols-2 mt-5 mx-5">
                <div>
                    <h4 className=" grot">COMPANY</h4>
                    <ul>
                        <li className="font-light">About</li>
                    </ul>
                </div>
                <div>
                <h4 className="grot">HELP</h4>
                    <ul>
                        <li className="font-light">Customer Support</li>
                        <li className="font-light">Terms & Conditions</li>
                        <li className="font-light">Privacy Policy</li>
                    </ul>
                </div>
                <div>
                <h4 className="grot">FAQ</h4>
                    <ul>
                        <li className="font-light">Account</li>
                        <li className="font-light">Orders</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className='text-center opacity-70 py-5'>Right Choice &copy; 2025, All Rights Reserved</div>
        </div>
        </>
    )
}