import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./styles/global.css?url";

export const links = () => [
  { rel: "stylesheet", href: styles }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
      </head>

      <body>

        {/* TOP NAV */}
        <Navbar />

        {/* PAGE CONTENT */}
        <Outlet />

        {/* BOTTOM NAV */}
        <Footer />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
