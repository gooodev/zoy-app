import classNames from 'classnames'
import Link from 'next/link'

const Page = () => {
  return (
    <section
      className={classNames(
        'fixed top-0 flex h-screen w-screen items-center justify-center'
      )}
      data-theme="luxury"
    >
      <center className={classNames('stack mx-10 gap-10')}>
        <h1
          className={classNames(
            'my-0 whitespace-pre-wrap font-serif text-xl font-extrabold sm:text-4xl sm:leading-[3.5rem] lg:text-5xl lg:leading-[4.5rem]',
            'text-gold-gradient'
          )}
        >
          {`ゼロリノベ・オブ・ザ・イヤー\n${process.env.NEXT_PUBLIC_YEAR}`}
        </h1>
        <Link href="/vote" className="cursor-pointer">
          <p
            className={classNames(
              'font-serif text-lg font-bold sm:text-xl lg:text-2xl',
              'text-gold-gradient'
            )}
          >
            エントリー作品一覧 &gt;
          </p>
        </Link>
      </center>
    </section>
  )
}

export default Page
