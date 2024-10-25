import React from "react";
import Link from "next/link";
import { Video } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Pages",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Studio", href: "/products" },
        { label: "Clients", href: "/products" },
        { label: "Pricing", href: "/products" },
        { label: "Blog", href: "/products" },
      ],
    },
    {
      title: "Socials",
      links: [
        { label: "Facebook", href: "/products" },
        { label: "Instagram", href: "/products" },
        { label: "Twitter", href: "/products" },
        { label: "LinkedIn", href: "/products" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/products" },
        { label: "Terms of Service", href: "/products" },
        { label: "Cookie Policy", href: "/products" },
      ],
    },
    {
      title: "Register",
      links: [
        { label: "Sign Up", href: "/products" },
        { label: "Login", href: "/products" },
        { label: "Forgot Password", href: "/products" },
      ],
    },
  ];

  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start md:px-8">
        <div>
          <div className="mr-0 md:mr-4 md:flex mb-4">
            <Link
              href="/"
              className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
            >
              <Video className="w-6 h-6 text-blue-600" />

              <span className="font-medium text-black dark:text-white">
                CallYours
              </span>
            </Link>
          </div>
          <div className="mt-2 ml-2">
            © copyright CallYours {new Date().getFullYear()}. All rights
            reserved.
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 items-start mt-10 sm:mt-0 md:mt-0">
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="flex justify-center space-y-4 flex-col"
            >
              <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
                {section.title}
              </p>
              <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                {section.links.map((link) => (
                  <li key={link.label} className="list-none">
                    <Link
                      href={link.href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-gray-600 duration-200 hover:text-black"
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
        CallYours
      </p>
    </div>
  );
};

export default Footer;
