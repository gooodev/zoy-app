import { NextRequest, NextResponse } from 'next/server'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === '/top') {
//         return token?.email != null
//       }
//       // `/me` only requires the user to be logged in
//       return true
//     },
//   },
//   secret: 'dsjkajgio[dsatadasghads',
// })

// export const config = { matcher: ['/', '/top'] }
// const protectedRoutes = ['/top']
export const middleware = async (req: NextRequest) => {
  //   const jwt = req.cookies.get('next-auth.session-token') as
  //     | { value: string }
  //     | undefined

  //   const { pathname, origin } = req.nextUrl
  //   if (!jwt?.value && protectedRoutes.includes(pathname)) {
  //     return NextResponse.redirect(`${origin}/api/auth/signin`)
  //   }
  console.log(req.nextUrl)
  return NextResponse.next()
}
