import { Clock8, Phone, Utensils } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
     
      <footer className="bg-black border-t border-red-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-fire text-[crimson] text-2xl mr-2"></i>
                <span className="font-bebas text-xl text-white">Burato</span>
              </div>
              <p className="text-gray-400 mb-4">
                Serving authentic BBQ flavors with passion and tradition since
                15+ years.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="https://wa.me/923492177616"
                  className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bebas text-xl text-white mb-4">
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#menu"
                    className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Cart"
                    className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-[crimson] transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bebas text-xl text-white mb-4">
                CONTACT INFO
              </h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <i className=" text-[crimson] mr-2">
                    <Phone size={20} />
                  </i>{" "}
                  0349-1234454
                </p>
                <p className="flex items-center">
                  <i className=" text-[crimson] mr-2">
                    <Clock8 size={20} />
                  </i>{" "}
                  sdjgnsdg
                </p>
                <p className="flex items-center">
                  <i className=" text-[crimson] mr-2">
                    <Utensils size={20} />
                  </i>{" "}
                  Dine-in • Takeaway • Catering • Delivery
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-red-900/30 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Burato & Catering. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
