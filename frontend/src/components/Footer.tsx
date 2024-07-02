import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaFacebook, FaInstagram, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600 h-8 font-bold dark:text-teal-300">
              COMPANY
            </div>

            <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
              Best Company Ever !!
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  to="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className='h-6 w-6' aria-hidden='true' />
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className='h-6 w-6' aria-hidden='true' />
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className='h-6 w-6' aria-hidden='true' />
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className='h-6 w-6' aria-hidden='true' />
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Dribbble</span>
                  <FaDribbble className='h-6 w-6' aria-hidden='true' />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    1on1 Coaching
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Company Review
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Accounts Review
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    HR Consulting
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    SEO Optimisation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    About
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Meet the Team
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Accounts Review
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Contact
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Live Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Accessibility
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Returns Policy
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link to="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                    Hiring Statistics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2022. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
