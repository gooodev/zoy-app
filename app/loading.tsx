import Image from 'next/image'
export default function Loading() {
  return (
    <center className="flex h-[var(--main-min-height)]">
      <figure className="m-auto">
        <Image
          src="/zero-logo.png"
          width={200}
          height={200}
          alt="logo"
          className="m-auto animate-spin"
        />
      </figure>
    </center>
  )
}
