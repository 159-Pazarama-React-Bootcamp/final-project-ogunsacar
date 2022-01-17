import useAuthContext from "../hooks/useAuthContext"

export default function SingleApplication() {
  const { user } = useAuthContext()
  if (user) {
    return <div>private application</div>
  } else {
    return <div>sorgulayınca karşımıza çıkan</div>
  }
}
