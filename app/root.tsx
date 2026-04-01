import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Navbar } from "~/components/ui/Navbar";
import { Footer } from "~/components/ui/Footer";
import { CartDrawer } from "~/components/ui/CartDrawer";
import stylesheet from "~/styles/global.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="font-display text-4xl text-forest mb-4">Something went wrong</h1>
          <a href="/" className="btn-primary">Return Home</a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
