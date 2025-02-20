import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();


  return (
    <footer className=" py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <a className="flex items-center gap-2 cursor-pointer" >
              <img className="icon-class w-8" src={logo} alt="Logo" />
              <h2 className="text-2xl font-bold font-script">Culture Connect</h2>
            </a>

            <h1 className="dark:text-gray-300 mt-4">
              Build by{" "}
              <span className="dark:text-[#039ee4]">
                <a href="https://x.com/_Bashar_khan_">@_Bashar_khan_</a>
              </span>
            </h1>
            <div className="mt-2">
              <a href="https://x.com/_Bashar_khan_">
                <Button variant='secondary'>
                  Share Your Thoughts On
                  <Icons.twitter className="icon-class ml-1 w-3.5" />
                </Button>
              </a>
            </div>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#blogs" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/Basharkhan7776" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/bashar-khan-ba2564291/" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://x.com/_Bashar_khan_" className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate("privacy-policy"); }} className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/tos" onClick={(e) => { e.preventDefault(); navigate("tos"); }} className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white">
                    Terms of Service
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <div className=" w-full flex mt-4 items-center justify-center   ">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-script font-bold opacity-45 bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-400 select-none">
            Culture Connect
          </h1>
        </div>

      </div>
    </footer>
  );
}

export { Footer };
