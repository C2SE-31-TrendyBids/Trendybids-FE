import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch, IoIosSettings, IoMdLogOut } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import {
    FaUserCircle,
    FaUserEdit,
    FaLock,
    FaProductHunt,
    FaHome,
} from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
} from "@material-tailwind/react";
import { MdDashboard } from "react-icons/md";

export default function SidebarUser() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem]  shadow-none ">
            <div className="mb-2 flex items-center justify-center p-4">
                <Link to="/">
                    <h2 className="text-4xl font-extrabold text-white">
                        <span className="text-black inline-block">Trendy</span>
                        <span className="text-blue-500 inline-block">Bids</span>
                    </h2>
                </Link>
            </div>

            <div className="p-2">
                <div className="flex xl:w-full max-xl:w-full bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#007bff]">
                    <input
                        type="text"
                        placeholder="Search something..."
                        className="w-full text-sm bg-transparent rounded outline-none pr-2"
                    />
                    <IoIosSearch className="w-6 h-6" />
                </div>
            </div>
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <FaChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                }`}
                        />
                    }
                >
                    <Accordion>
                        <Link to="/dashboard">
                            <ListItem className="p-0">
                                <AccordionHeader className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <MdDashboard className="h-5 w-5 font-bold" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto font-normal"
                                    >
                                        DashBoard
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                        </Link>
                    </Accordion>
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <FaUserCircle className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                Profile
                            </Typography>
                        </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1 ml-8">
                        <List className="p-0">
                            <Link to="/profile">
                                <ListItem>
                                    <ListItemPrefix>
                                        <FaUserEdit
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Edit Profile
                                </ListItem>
                            </Link>
                            <Link to="/changepassword">
                                <ListItem>
                                    <ListItemPrefix>
                                        <FaLock
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Change Password
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <Link to="/register-censor">
                        <ListItem className="p-0">
                            <AccordionHeader className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaWpforms className="h-5 w-5 font-bold" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Register Censor
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                    </Link>
                </Accordion>
                <Accordion>
                    <Link to="/profile/management-post">
                        <ListItem className="p-0">
                            <AccordionHeader className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaProductHunt className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Management Post
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                    </Link>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                <Link to="/">
                    <ListItem>
                        <ListItemPrefix>
                            <FaHome className="h-5 w-5" />
                        </ListItemPrefix>
                        Home
                    </ListItem>
                </Link>
                <ListItem>
                    <ListItemPrefix>
                        <IoIosSettings className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <Link>
                    <ListItem>
                        <ListItemPrefix>
                            <IoMdLogOut className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>
            </List>
            {/* <Alert
        open={openAlert}
        className="mt-auto"
        onClose={() => setOpenAlert(false)}
      >
        <Tb3DCubeSphere className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Trendy Bird and get even more components,
          plugins, advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert> */}
        </Card>
    );
}
