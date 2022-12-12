import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { firebaseApps } from '~/vendor/firebase/client'

type AuthState =
  | {
      isAuthenticated: false
    }
  | {
      isAuthenticated: true
      uid: string | null
    }

export const authStateAtom = atom<AuthState>({
  key: 'libs/auth:auth',
  default: { isAuthenticated: false },
})

const provider = new GoogleAuthProvider()
const { auth } = firebaseApps

export const useAuth = () => {
  const [authState, setAuthState] = useRecoilState(authStateAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ isAuthenticated: true, uid: user.uid })
      }
    })
    return unsubscribe
  }, [setAuthState])

  const signin = async () => {
    const { user } = await signInWithPopup(auth, provider)
    setAuthState({ isAuthenticated: true, uid: user.uid })
  }

  const signout = async () => {
    await signOut(auth)
    setAuthState({ isAuthenticated: false })
  }

  return { authState, signin, signout }
}
