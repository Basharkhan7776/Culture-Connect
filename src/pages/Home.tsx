import logo from '../assets/Logo.png';
import { Button } from '../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Waves } from "@/components/ui/waves-background"
import { Footer } from "@/components/ui/large-name-footer"
import { useNavigate } from 'react-router-dom';
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useEffect, useState } from 'react';
import DisplayCards from "@/components/ui/display-cards";
import { Bell, Locate, Sparkles } from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/testimonial";


import { SERVICE_ID, TEMPLATE_ID, USER_ID } from "@/envConfig";
import emailjs from 'emailjs-com';
import { useAuth } from '@/context/AuthContext';





export function Home() {
    const [status, setStatus] = useState<string>('');

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, USER_ID)
            .then(
                (result) => {
                    console.log('Email successfully sent!', result.text);
                    setStatus('Feedback sent successfully!');
                    e.currentTarget.reset(); // clear form fields
                },
                (error) => {
                    console.error('Failed to send email. Error:', error.text);
                    setStatus('Failed to send feedback.');
                }
            );
    };
    console.log(status);



    return <div className="flex flex-row w-full justify-center font-poppins overflow-auto overflow-y-scroll pointer-events-auto scroll-auto touch-auto no-scrollbar">
        <div className="flex flex-col items-center h-full 2xl:w-9/12 xl:w-[90vw] w-full gap-20">
            <HomeNav />
            <div id='home' className="snap-center relative flex justify-center items-center -z-10 w-full h-screen border border-gray-600 bg-background/80 rounded-3xl mt-2 ">
                <div className="absolute inset-0">
                    <Waves
                        lineColor={"rgba(235,89,12,255)"}
                        backgroundColor="transparent"
                        waveSpeedX={0.03}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.01}
                        tension={0.04}
                        maxCursorMove={10}
                        xGap={20}
                        yGap={26}
                    />
                </div>
                <div className='absolute flex m-2 justify-center 2xl:gap-20 items-center  lg:w-2/3 sm:w-[80vw] w-[95%] aspect-video rounded-3xl backdrop-blur-xl shadow-sm shadow-gray-600'>
                    <div className='flex flex-col items-center gap-6 justify-center'>
                        <h1 className='sm:text-3xl text-2xl font-semibold'>Reconnect with Your Roots</h1>
                        <p>Celebrate  the beauty of culture and tradition</p>
                        <Button variant="default" className='text-lg'>Get Started Now</Button>
                    </div>
                    <div className='md:block hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="300" viewBox="0 0 524.67004 520.18759" role="img" ><path d="M524.67004,518.99758c0,.66003-.53003,1.19-1.19006,1.19H1.19c-.65997,0-1.19-.52997-1.19-1.19s.53003-1.19,1.19-1.19H523.47998c.66003,0,1.19006,.53003,1.19006,1.19Z" fill="#3f3d56" /><polygon points="362.54192 461.05879 368.54192 486.05879 350.54192 491.05879 346.54192 464.05879 362.54192 461.05879" fill="#ffb6b6" /><polygon points="391.54192 380.05879 372.54192 396.05879 360.54192 415.05879 377.54192 426.05879 406.54192 393.05879 391.54192 380.05879" fill="#ffb6b6" /><path d="M385.54192,215.05879l16,54s71,62,64,75c-7,13-54,49-54,49,0,0,3.48819,11.51181-6.75591,6.75591-10.24409-4.75591-21.24409-17.75591-21.24409-17.75591,0,0,0-10,5-8,5,2,28-25,28-25l-50-46v153.81496s12,10.49213,0,11.33858c-12,.84646-23,2.84646-23,2.84646,0,0-14-5-9-10l-15-82-11-100,8-52,69-12Z" fill="#2f2e41" /><path d="M353.54192,483.05879s1-4,5-4h12.21654s3.78346,17,2.78346,17,16,22-2,23c-18,1-23-1-23-1l-2-7.8937s-3-5.1063-2-9.1063,9-18,9-18Z" fill="#2f2e41" /><path d="M378.54192,418.05879s11.48556-.1811,8.74278,2.90945c-2.74278,3.09055-7.74278,8.09055-7.74278,8.09055,0,0-11.8942,24-17.4471,19.5-5.5529-4.5-14.5529-54.5-11.5529-60.5s7-6,7-6l18.44907,11.09552s-11.44907,27.90448,2.55093,24.90448Z" fill="#2f2e41" /><polygon points="350.54192 130.05879 354.54192 105.05879 327.54192 94.05879 323.54192 132.05879 350.54192 130.05879" fill="#ffb6b6" /><polygon points="350.54192 130.05879 354.54192 105.05879 327.54192 94.05879 323.54192 132.05879 350.54192 130.05879" opacity=".1" /><path d="M322.04192,126.55879l32-8,34,11s15,42,10,57c-5,15-5,44.29921-5,44.29921,0,0-.5-12.79921-29.5-3.79921-29,9-50,8-50,8l-1-36-12.56231-31.97679c-5.36947-13.66775,.41799-29.18571,13.42611-35.99949l8.6362-4.52372Z" fill="#e6e6e6" /><g><path id="uuid-1b03a630-7e31-41b5-b302-96493ff31189-1421" d="M468.93625,244.36122c4.51538,5.40957,5.38427,12.12429,1.94111,14.99735-3.44316,2.87305-9.89353,.81637-14.40979-4.59574-1.83372-2.13717-3.12896-4.6824-3.77735-7.42276l-18.84239-23.1622,9.17843-7.42782,19.28065,22.56531c2.58106,1.12838,4.85427,2.85861,6.62935,5.04587Z" fill="#ffb6b6" /><polygon points="386.58903 129.87809 380.03103 155.85437 412.12807 207.23315 444.89428 240.16415 455.51447 231.35346 422.46915 190.23683 397.42099 137.25937 386.58903 129.87809" fill="#e6e6e6" /></g><g><ellipse cx="459.12853" cy="52.44806" rx="41.5" ry="52.5" transform="translate(-2.61679 33.98) rotate(-4.22648)" fill="#eb590c" /><rect x="460.12853" y="104.80549" width="2" height="199.43799" fill="#2f2e41" /><polygon points="462.62626 100.59386 462.86623 107.66085 466.05994 114.20304 452.73559 113.52346 458.33644 107.88988 457.70336 101.46854 462.62626 100.59386" fill="#eb590c" /></g><g><circle cx="343.71883" cy="85.56184" r="27.53355" fill="#ffb6b6" /><path d="M341.52141,48.54491c.79671,.46507,1.86389-.23857,2.11935-1.12501s-.04212-1.82761-.33722-2.70165l-1.48558-4.40008c-1.0536-3.12063-2.17183-6.35032-4.45368-8.72552-3.44408-3.58499-8.91753-4.497-13.84474-3.83628-6.3275,.84849-12.57056,4.27476-15.51267,9.94055-2.9421,5.66579-1.68954,13.5716,3.62665,17.10648-7.57673,8.68419-10.21786,18.36242-9.80083,29.87971,.41702,11.51729,12.96805,22.11696,21.153,30.23044,1.82785-1.10801,3.48957-6.30065,2.48442-8.18702s.435-4.07179-.80984-5.80934-2.28631,1.02915-1.0278-.69854c.79414-1.0902-2.30536-3.59827-1.12493-4.25078,5.70958-3.15606,7.60854-10.2728,11.19452-15.72263,4.32536-6.57351,11.72821-11.02516,19.56239-11.76369,4.31558-.40683,8.87377,.33002,12.41109,2.83544,3.53731,2.50542,5.82735,6.98256,5.00708,11.23896,2.12436-2.157,3.18182-5.31809,2.78297-8.31917-.39885-3.00108-2.24525-5.77623-4.85926-7.3035,1.58943-5.25615,.22781-11.30225-3.46132-15.36964s-18.65428-3.37463-24.04014-2.30417" fill="#2f2e41" /><path d="M340.68501,68.64111c-7.1334,.77005-12.28392,6.94917-16.63311,12.65557-2.50677,3.28904-5.13259,6.92124-5.06965,11.05618,.06363,4.18054,2.85874,7.76625,4.19457,11.72813,2.18345,6.47581,.05542,14.18053-5.14218,18.61771,5.13581,.97458,10.68776-2.87625,11.57437-8.02797,1.03212-5.99724-3.51408-11.7855-2.97566-17.84704,.47435-5.34029,4.68273-9.45028,8.26047-13.4432,3.57775-3.99292,6.93788-9.29143,5.29193-14.39384" fill="#2f2e41" /></g><path d="M314.42637,234.55793H108.75752c-23.32296,0-42.22995,18.90699-42.22995,42.22995v199.43289c0,23.32291,18.90695,42.22986,42.22986,42.22986h205.66894c23.32296,0,42.22995-18.90699,42.22995-42.22995v-199.43281c0-23.32296-18.90699-42.22995-42.22995-42.22995Z" fill="#fff" /><path d="M314.42649,519.45019H108.75754c-23.83691,0-43.22998-19.39258-43.22998-43.22949v-199.43262c0-23.83691,19.39307-43.22998,43.22998-43.22998h205.66895c23.83691,0,43.22998,19.39307,43.22998,43.22998v199.43262c0,23.83691-19.39307,43.22949-43.22998,43.22949ZM108.75754,235.5581c-22.73438,0-41.22998,18.49561-41.22998,41.22998v199.43262c0,22.73438,18.49561,41.22949,41.22998,41.22949h205.66895c22.73438,0,41.22998-18.49512,41.22998-41.22949v-199.43262c0-22.73437-18.49561-41.22998-41.22998-41.22998H108.75754Z" fill="#3f3d56" /><circle cx="292.72497" cy="249.4082" r="4.76903" fill="#3f3d56" /><circle cx="305.83981" cy="249.4082" r="4.76903" fill="#3f3d56" /><circle cx="318.95465" cy="249.4082" r="4.76903" fill="#3f3d56" /><path d="M102.01538,448.63094c-1.48165,0-2.68692,1.20526-2.68692,2.68692,0,.72246,.27901,1.39069,.78543,1.88399,.51079,.52304,1.1799,.80293,1.90148,.80293h215.09838c1.48165,0,2.68692-1.20526,2.68692-2.68692,0-.72246-.27901-1.39069-.78543-1.88399-.51079-.52304-1.1799-.80293-1.90148-.80293H102.01538Z" fill="#e6e6e6" /><path d="M217.02966,447.7353v7.16511H102.01538c-.98518,0-1.88082-.39414-2.52565-1.0569-.66287-.64483-1.0569-1.54047-1.0569-2.52565,0-1.97047,1.61219-3.58255,3.58255-3.58255h115.01428Z" fill="#eb590c" /><path d="M312.63557,434.30072h-35.82554c-3.95078,0-7.16511-3.21345-7.16511-7.16511s3.21433-7.16511,7.16511-7.16511h35.82554c3.95078,0,7.16511,3.21345,7.16511,7.16511s-3.21433,7.16511-7.16511,7.16511Z" fill="#e6e6e6" /><g><polyline points="178.04436 439.42158 153.00042 355.27363 151.08342 355.84395 176.03948 439.696" fill="#2f2e41" /><ellipse cx="175.04192" cy="195.55879" rx="41.5" ry="52.5" transform="translate(-13.93649 13.43225) rotate(-4.22648)" fill="#eb590c" /><rect x="176.04192" y="247.91621" width="2" height="199.43799" fill="#2f2e41" /><polygon points="154.12589 352.83568 156.37116 359.54081 161.29787 364.90062 148.33299 368.04891 152.09477 361.05206 149.65683 355.07788 154.12589 352.83568" fill="#eb590c" /><polygon points="178.53965 243.70459 178.77961 250.77158 181.97332 257.31377 168.64898 256.63419 174.24983 251.0006 173.61675 244.57926 178.53965 243.70459" fill="#eb590c" /><ellipse cx="136.04192" cy="305.55879" rx="41.5" ry="52.5" transform="translate(-100.19337 68.77521) rotate(-20.93384)" fill="#eb590c" /></g><path id="uuid-b40723c2-846b-43d4-8d7a-d7be28bdc184-1422" d="M336.50935,224.32158c6.7457,2.0366,11.16281,7.16803,9.866,11.46082-1.29681,4.29279-7.81569,6.12073-14.56352,4.0825-2.70665-.77722-5.18781-2.19132-7.2359-4.12401l-28.47282-8.99009,3.58382-11.25044,28.51078,8.25056c2.77637-.4763,5.62645-.28063,8.31164,.57066Z" fill="#ffb6b6" /><path d="M287.04192,150.55879l30-22-1,42-28,36,30,12-1,17.13379s-38-9.13379-44-10.13379-11-15-11-15l25-60Z" fill="#e6e6e6" /></svg>
                    </div>
                </div>
            </div>
            <div id='about' className='snap-center flex lg:flex-row flex-col-reverse gap-52 justify-evenly items-center'>
                <div className='hidden md:block'><DisplayCardsDemo /></div>
                <div className='flex flex-col gap-5 m-12 lg:m-0'>
                    <Card className='hover:shadow hover:shadow-orange-500 transition-all duration-500'>
                        <CardHeader>
                            <CardTitle className='text-orange-500 hover:shadow'>Focused On</CardTitle>
                            <CardDescription>Culture Connect bridges the gap between generations by promoting local traditions and inspiring involvement. Explore events, discover their significance, and create memories that last a lifetime.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className='hover:shadow hover:shadow-orange-500 transition-all duration-500'>
                        <CardHeader>
                            <CardTitle className='text-orange-500'>Mission</CardTitle>
                            <CardDescription>Our mission is to keep cultural heritage alive by empowering communities to engage with local events. From festivals to workshops, we’re here to connect you to your roots.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className='hover:shadow hover:shadow-orange-500 transition-all duration-500'>
                        <CardHeader>
                            <CardTitle className='text-orange-500'>User</CardTitle>
                            <CardDescription>We believe every community has a story to tell. Culture Connect is your guide to experiencing, sharing, and preserving the vibrancy of local traditions.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className='hover:shadow hover:shadow-orange-500 transition-all duration-500'>
                        <CardHeader>
                            <CardTitle className='text-orange-500'>Call for Action</CardTitle>
                            <CardDescription>Join us in celebrating the beauty of cultural diversity. Explore events, contribute stories, and make connections that matter.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <div id='blogs' className='snap-center h-1/2 w-full md:gap-52 gap-32  flex lg:flex-row flex-col items-center justify-center'>
                <div><InfiniteSliderVertical /></div>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <h1 className='text-3xl font-script text-orange-500'>Testimonials</h1>
                    <TestimonialCard />
                </div>
            </div>
            <div id='contact' className='snap-center w-full flex justify-center items-center'>
                <Card className="md:w-[600px] w-full md:mx-0 mx-4">
                    <CardHeader className='flex flex-col items-center'>
                        <CardTitle className='text-3xl text-orange-500'>Feedback and Contact</CardTitle>
                        <CardDescription>Give your feedback here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={sendEmail}>
                            <div className="grid w-full items-center gap-8">
                                <div className="flex flex-col space-y-1.5 gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your Name" name='name' required />
                                </div>
                                <div className="flex flex-col space-y-1.5 gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type='email' placeholder="Enter your Email" name='email' required />
                                </div>
                                <div className="flex flex-col space-y-1.5 gap-2">
                                    <Label htmlFor="textarea">Message</Label>
                                    <Textarea className='h-24' id="textarea" placeholder="Enter your Message" name='message' required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button className='w-full p-4'>Send</Button>
                    </CardFooter>
                </Card>
            </div>
            <div id='footer' className='snap-center w-full flex justify-center'>
                <Footer />
            </div>
        </div>
    </div>;
}

function HomeNav() {
    const { currentUser, userData } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling down
            setIsVisible(false);
        } else {
            // Scrolling up
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);



    return <div id='navbar' className={`flex lg:gap-40 gap-2 sm:gap-4 backdrop-blur-xl z-10 fixed justify-around p-4 shadow-sm shadow-gray-500 rounded-full mt-4 scroll-smooth transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className='flex text-3xl items-center gap-2 cursor-pointer font-script'>
            <img src={logo} alt="Logo" className="w-12 h-12 p-2" />
            Culture Connect
        </div>
        <div className='gap-9 items-center hidden md:flex'>
            <a href="#home" className='hover:text-orange-600 hover:-translate-y-0.5 hover:scale-110 transition-all duration-200'>Home</a>
            <a href="#about" className='hover:text-orange-600 hover:-translate-y-0.5 hover:scale-110 transition-all duration-200'>About</a>
            <a href="#blogs" className='hover:text-orange-600 hover:-translate-y-0.5 hover:scale-110 transition-all duration-200'>Blogs</a>
        </div>
        <div className='flex items-center gap-4'>
            {(!userData) ? <>
                <Button variant="secondary" size="lg" className='hidden md:block' onClick={() => { navigate('/login') }}>Sign in</Button>
                <Button variant="default" size="lg" onClick={() => { navigate('/signup') }}>Register</Button>
            </>
                : <Button variant="default" size="lg" onClick={() => { navigate('/dashboard') }}>Dashboard</Button>}
        </div>
    </div>
}


const defaultCards = [
    {
        icon: <Locate className="size-4 text-blue-300" />,
        title: "Smart Suggestion",
        description: "Smart recommandation and local",
        date: "Just now",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] hover:-translate-y-16 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Bell className="size-4 text-blue-300" />,
        title: "Smart Notifications",
        description: "Get personalized notifications",
        date: "2 days ago",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Sparkles className="size-4 text-blue-300" />,
        title: "Cultural Blog Hub",
        description: "Explore heritage stories",
        date: "Today",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
];

function DisplayCardsDemo() {
    return (
        <div className="flex min-h-[400px] w-full items-center justify-center py-20">
            <div className="w-full max-w-3xl">
                <DisplayCards cards={defaultCards} />
            </div>
        </div>
    );
}

const imgStyle = 'aspect-square md:w-52 sm:w-36 w-32 rounded-xl mix-blend-darken bg-auto border border-neutral-600 hover:border-orange-500 transition-colours duration-300'

function InfiniteSliderVertical() {
    return (
        <div className='flex h-[600px] space-x-4 md:gap-10 gap-2'>
            <InfiniteSlider direction='vertical'>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2hU6KaE4q9rZuQKA78ocaGcKSC92EIEoJSg&s'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcx_leYJGylcrx2s8xvEFQsHx5iK1XfXHvfw&s'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://media.istockphoto.com/id/613897214/photo/festival-event-party-with-hipster-people-blurred-background.jpg?b=1&s=612x612&w=0&k=20&c=xR4WjQSpamQbShSdKpUJkGrMGslOpyZ5_-Zb1ITprvc='
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://www.wtravelmagazine.com/wp-content/uploads/2022/02/30.190.1-Horseman-performs-with.-a-lance-at-the-Souk-Okaz-in-Taif-July-2017.jpg'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://t3.ftcdn.net/jpg/09/14/76/78/360_F_914767821_0LZZBNodEoqi784hQ1uiHYFmSHlbeq5l.jpg'
                    alt='img'
                    className={imgStyle}
                />
            </InfiniteSlider>
            <InfiniteSlider direction='vertical' reverse>
                <img
                    src='https://media.istockphoto.com/id/1376088706/photo/traditional-muslim-parents-and-their-kids-sharing-pita-bread-during-family-dinner-on-ramadan.jpg?s=612x612&w=0&k=20&c=bPe4dP4sl9D0Zq8rGwrYG5qtUM-ERSt1TTdNpnYglAY='
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://www.shutterstock.com/image-photo/vintage-rosary-beads-on-old-600nw-127973408.jpg'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://img.freepik.com/free-photo/portrait-indian-people-celebrating-baisakhi-festival_23-2151216976.jpg'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://media.istockphoto.com/id/1207062016/photo/audience-applauding-in-the-theater.jpg?s=612x612&w=0&k=20&c=7mqrKAy-f3zsC02dwvg5VHhpGvHYXd8cJMyWfg9C5_Y='
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://c0.wallpaperflare.com/preview/785/642/506/audience-band-bright-celebration.jpg'
                    alt='img'
                    className={imgStyle}
                />
                <img
                    src='https://w0.peakpx.com/wallpaper/553/470/HD-wallpaper-india-culture-best-cultural-india-latest-sadhu-top-thumbnail.jpg'
                    alt='img'
                    className={imgStyle}
                />
            </InfiniteSlider>
        </div>
    );
}

const TESTIMONIAL_DATA = [
    {
        id: 1,
        name: "Alisha Kausheen",
        avatar: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
        description: "Quite an amazing and engaging project Looking forward to see folks using it to share their values and culture with the world"
    },
    {
        id: 2,
        name: "Syed Zakaria Rizvi",
        avatar: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
        description: "This groundbreaking innovation promises to revolutionize how we connect, learn, and grow, fostering a brighter future for all"
    },
    {
        id: 3,
        name: "Apoorv Dixit",
        avatar: "https://pbs.twimg.com/profile_images/1839577437358948352/V81kFLBO_400x400.jpg",
        description: "I'm thrilled to witness the unfolding of this transformative journey, where creativity meets collaboration to spark unprecedented progress."
    }
]

function TestimonialCard() {
    return (
        <TestimonialCarousel
            testimonials={TESTIMONIAL_DATA}
            className="max-w-3xl mx-auto"
        />
    )
}