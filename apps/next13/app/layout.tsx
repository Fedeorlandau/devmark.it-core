import "@/styles/globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme")?.value || "dark";

  return (
    <html className={theme} lang="en">
      <head>
        <title>Devmark.it</title>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="description"
          content="Devmark.it is a poker planning tool that let you create private rooms to help you estimating your next feature!"
        />
        <meta name="title" content="Start estimating your next feature." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devmark.it/" />
        <meta
          property="og:title"
          content="Start estimating your next feature."
        />
        <meta
          property="og:description"
          content="Devmark.it is a poker planning tool that let you create private rooms to help you estimating your next feature!"
        />
        <meta
          property="og:image"
          content="https://devmark.it/images/twitter-card.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://devmark.it/" />
        <meta
          property="twitter:title"
          content="Start estimating your next feature."
        />
        <meta
          property="twitter:description"
          content="Devmark.it is a poker planning tool that let you create private rooms to help you estimating your next feature!"
        />
        <meta
          property="twitter:image"
          content="https://devmark.it/images/twitter-card.png"
        />
        <meta name="robots" content="follow, index" />
        <meta property="og:url" content="https://devmark.it/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="devmark.it" />
        <meta
          property="og:description"
          content="Devmark.it is a poker planning tool that let you create private rooms to help you estimating your next feature!"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
      </head>
      <body className="bg-palepink-400 dark:bg-black">
        <main className=" text-indigo-400 w-full">
          <div className="h-full max-w-screen-xl p-6 mx-auto leading-normal tracking-normal">
            <div className="w-full container mx-auto px-6 md:px-0 flex items-center">
              <div className="">
                <Link
                  href="/"
                  className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                >
                  <span className="text-transparent  bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text">
                    Devmark.it
                  </span>
                </Link>
              </div>
              <div className="ml-auto">
                <ThemeSwitcher defaultTheme={theme} />
              </div>
            </div>

            <div className="container mt-4 mx-auto">{children}</div>
          </div>
        </main>
        <div className="w-full pt-16 pb-6 text-sm text-center ">
          <a
            className="text-black dark:text-white no-underline hover:underline"
            href="https://fedeorlandau.dev"
            target="blank"
          >
            &copy; Federico Orlandau 2022
          </a>
        </div>
      </body>
    </html>
  );
}
