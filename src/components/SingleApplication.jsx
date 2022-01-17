import useAuthContext from "../hooks/useAuthContext"

export default function SingleApplication() {
  const { user } = useAuthContext()
  if (user) {
    return <div>private application(detaylı)</div>
  } else {
    return <div>sorgulayınca karşımıza çıkan</div>
  }
}
