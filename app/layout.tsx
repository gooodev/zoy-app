import classNames from 'classnames'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import './globals.css'
import { Providers } from './providers'

const RootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>ZOY 2022</title>
      </head>
      <body data-theme="light">
        <Providers>
          <header
            data-theme="luxury"
            className={classNames(
              'flex w-screen justify-center md:justify-start',
              'h-[var(--header-height)]'
            )}
          >
            <Link href="" className="my-auto md:ml-10">
              <h2
                className={classNames(
                  'text-center font-serif text-lg font-bold lg:text-2xl',
                  'text-gold-gradient'
                )}
              >
                {`ゼロリノベ・オブ・ザ・イヤー ${process.env.NEXT_PUBLIC_YEAR}`}
              </h2>
            </Link>
          </header>
          <main className="min-h-[var(--main-min-height)]">{children}</main>
          <footer
            className={classNames(
              'flex w-screen items-center justify-center text-gray-400',
              'h-[var(--footer-height)]'
            )}
          >
            <small>&copy; ZERO OF THE YEAR 2022 by grooveagent.co.jp</small>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
