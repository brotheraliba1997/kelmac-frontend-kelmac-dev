"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { IconArrowRight } from "@tabler/icons-react";

import Link from "next/link";
import Button from "@/components/ui/button/Button";
import AboutMegaMenu from "./AboutMegaMenu";
import CoursesMegaMenu from "./CoursesMegaMenu";
import CorporateMegaMenu from "./CorporateMegaMenu";
import ResourcesMegaMenu from "./ResourcesMegaMenu";
import { useSelector, useDispatch } from "react-redux";
import { logout, user } from "@/store/slices/auth";
import { FaBell, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { GetUserRoleName } from "@/lib/getUserRoleName";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const auth = useSelector((state: any) => state?.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: any) => state.auth);

  // Get user initials
  const getUserInitials = () => {
    if (!user) return "SA";

    // const parts = name.split(" ");
    // if (parts.length > 1) {
    //   return (parts[0][0] + parts[1][0]).toUpperCase();
    // }
    return (
      user?.firstName?.substring(0, 1).toUpperCase() +
      user?.lastName?.substring(0, 1).toUpperCase()
    );
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return "Super Admin";
    if (user.firstName) return user.firstName + " " + (user.lastName || "");
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  // Get user email
  const getUserEmail = () => {
    if (!user) return "admin@kelmac.com";
    return user.email || "No email provided";
  };

  const handleLogout = () => {
    router.push("/");
    dispatch(logout());
  };
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us", mega: "about" },
    { href: "/courses", label: "Courses", mega: "courses" },
    { href: "/corporate", label: "Corporate", mega: "corporate" },
    { href: "/resources", label: "Resources", mega: "resources" },
    { href: "/contact-us", label: "Contact" },
    ...(auth?.user?.id ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];
  // i would like to add login logout button based on auth state

  return (
    <header className="relative z-50 bg-white">
      <div className="main-container">
        <div className="grid grid-cols-6 items-center py-4">
          <div className="site-logo col-span-3 lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Site Logo"
                width={130}
                height={57}
                priority
              />
            </Link>
          </div>
          <div className="hidden lg:block col-span-3">
            <nav className="flex items-center justify-center gap-7">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.mega === "about" && pathname.startsWith("/about")) ||
                  (link.mega === "courses" &&
                    (pathname.startsWith("/course") ||
                      pathname.startsWith("/courses"))) ||
                  (link.mega === "corporate" &&
                    pathname.startsWith("/corporate")) ||
                  (link.mega === "resources" &&
                    (pathname.startsWith("/blog") ||
                      pathname.startsWith("/webinar") ||
                      pathname.startsWith("/whitepaper") ||
                      pathname.startsWith("/resources")));

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.mega && setOpenMenu(link.mega)}
                    onMouseLeave={() => link.mega && setOpenMenu(null)}
                  >
                    {link.mega ? (
                      <span
                        className={`text-primary transition-colors duration-200 cursor-pointer ${
                          isActive ? "font-semibold" : "font-light"
                        }`}
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-primary transition-colors duration-200 ${
                          isActive ? "font-semibold" : "font-light"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                    <AnimatePresence>
                      {openMenu === link.mega && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                        >
                          <div className="bg-white rounded-lg shadow-md overflow-hidden relative before:content-[''] before:absolute before:-top-[8px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-blue-100">
                            {openMenu === "about" && <AboutMegaMenu />}
                            {openMenu === "courses" && <CoursesMegaMenu />}
                            {openMenu === "corporate" && <CorporateMegaMenu />}
                            {openMenu === "resources" && <ResourcesMegaMenu />}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="col-span-2 lg:col-span-2 flex items-center justify-end gap-4">
            <button className="px-3 py-2 bg-gray-50 border border-gray-100 flex gap-2 rounded-lg items-center">
              <Image
                src="/images/flags/us.png"
                className="rounded-full w-6 h-6"
                alt="USA Flag"
                width={24}
                height={24}
                priority
              />
              <span className="font-medium font-inter text-sm">USA</span>
            </button>
            {auth?.user?.id ? (
              <div className="flex items-center gap-2 md:gap-4">
                {/* Notifications Dropdown */}
                <div ref={notificationRef} className="relative">
                  <button
                    onClick={() => {
                      setNotificationOpen(!notificationOpen);
                      setUserMenuOpen(false);
                    }}
                    className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors group"
                    title="Notifications"
                  >
                    <FaBell className="text-lg group-hover:text-primary-600" />
                    <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      5
                    </span>
                  </button>

                  {/* Notifications Dropdown Menu */}
                  {notificationOpen && (
                    <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
                        <h3 className="font-bold text-gray-900 text-lg">
                          Notifications
                        </h3>
                        <button
                          onClick={() => setNotificationOpen(false)}
                          className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors"
                        >
                          CLEAR ALL
                        </button>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        <ul className="divide-y divide-gray-100">
                          {[
                            {
                              icon: null,
                              name: "Brian Johnson",
                              action: "paid the invoice",
                              id: "#DF65485",
                              time: "4 mins ago",
                              type: "payment",
                            },
                            {
                              icon: null,
                              name: "Marie Canales",
                              action: "has accepted your estimate",
                              id: "#GTR458789",
                              time: "6 mins ago",
                              type: "estimate",
                            },
                            {
                              icon: "user",
                              name: "New user registered",
                              action: "",
                              id: "",
                              time: "8 mins ago",
                              type: "user",
                            },
                            {
                              icon: null,
                              name: "Barbara Moore",
                              action: "declined the invoice",
                              id: "#RDW026896",
                              time: "12 mins ago",
                              type: "decline",
                            },
                            {
                              icon: "comment",
                              name: "You have received a new message",
                              action: "",
                              id: "",
                              time: "2 days ago",
                              type: "message",
                            },
                          ].map((notif, idx) => (
                            <li
                              key={idx}
                              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    notif.icon === "user"
                                      ? "bg-blue-100"
                                      : notif.icon === "comment"
                                      ? "bg-sky-100"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  {notif.icon === "user" ? (
                                    <i className="far fa-user text-blue-600 text-sm" />
                                  ) : notif.icon === "comment" ? (
                                    <i className="far fa-comment text-sky-600 text-sm" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-900 font-medium">
                                    <span className="font-semibold">
                                      {notif.name}
                                    </span>
                                    {notif.action && (
                                      <>
                                        <span className="text-gray-600">
                                          {" "}
                                          {notif.action}{" "}
                                        </span>
                                        {notif.id && (
                                          <span className="font-semibold">
                                            {notif.id}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {notif.time}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
                        <a
                          href="#"
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                        >
                          View all Notifications →
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu Dropdown */}
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setNotificationOpen(false);
                    }}
                    className="relative flex items-center bg-primary gap-2 px-3 py-2 -my-1 rounded-lg bg-primary-600 hover:bg-primary-700 transition-colors group"
                    title="User Menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                      <span className="text-primary-600 text-xs font-bold">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="flex flex-col items-start  ">
                      <span className="text-sm capitalize font-medium text-white hidden sm:inline">
                        {getDisplayName()}
                      </span>
                      <span className="text-sm capitalize font-medium text-white hidden sm:inline">
                        {GetUserRoleName(user?.role?.id)}
                      </span>
                    </div>
                    <FaChevronDown
                      className={`w-3 h-3 text-white transition-transform ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-900">
                          {getDisplayName()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {getUserEmail()}
                        </p>
                      </div>
                      <div className="py-2">
                        <a
                          href="/dashboard/settings"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-900 text-sm group/item"
                        >
                          <FaCog className="text-gray-600 group-hover/item:text-primary-600" />
                          <span>Settings</span>
                        </a>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 text-sm group/item border-t border-gray-100"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  id="mobile_btn"
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Mobile Menu"
                >
                  <i className="fas fa-bars text-lg" />
                </button>
              </div>
            ) : (
              <Button
                className="hidden lg:inline-flex px-5 py-3"
                href="/signin"
                text="Login"
                icon={<IconArrowRight className="stroke-primary w-5 h-5" />}
                color="primary"
              />
            )}

            <button
              className="lg:hidden p-2 cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center gap-8 text-white text-2xl z-50"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-6 right-6 p-2"
              >
                <X size={32} />
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {auth?.user?.id ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-white text-2xl"
                >
                  Logout
                </button>
              ) : (
                <Link href="/signin" onClick={() => setOpen(false)}>
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
