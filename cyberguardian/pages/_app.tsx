import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

/**app.tsx:
 * 
Purpose: _app.tsx is a top-level component that acts as a wrapper for all pages in your Next.js application.
 It allows you to include global styles, layout components,
  and other shared functionality that should persist across all pages.

Features:
Layout Components: You can use _app.tsx to define layout components such as headers, footers, navigation bars,
 or sidebars that should be present on every page.

Global Styles: _app.tsx is a convenient place to import global stylesheets or CSS frameworks
 that should be applied to your entire application.

Custom Providers: You can wrap your application with custom context providers or state management libraries
 to share state across components.

Example Use Cases: Initializing global context providers, setting up authentication, fetching initial data,
 applying global styles. */
