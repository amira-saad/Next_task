"use client"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const ADMIN_EMAIL = "dramirasaad103@gmail.com"

export default function Navbar() {
  const { data: session } = authClient.useSession()

  const isAdmin = session?.user?.email === ADMIN_EMAIL

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning px-4">
      <Link className="navbar-brand fw-bold" href="/">
        🐝 BeeHoney
      </Link>

      <div className="navbar-nav ms-auto align-items-center">
        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/shop">Shop</Link>
        <Link className="nav-link" href="/farms">Farms</Link>
        <Link className="nav-link" href="/bees">About Bees</Link>
        <Link className="nav-link" href="/blog">Blog</Link>
        <Link className="nav-link" href="/contact">Contact</Link>

        {isAdmin && (
          <Link className="nav-link fw-bold text-dark" href="/dashboard">
            🛠 Dashboard
          </Link>
        )}

        {session ? (
          <div className="d-flex align-items-center gap-2 ms-3">
            <img
              src={session.user.image}
              alt={session.user.name}
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
            <span className="fw-semibold">{session.user.name}</span>
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => authClient.signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="btn btn-sm btn-dark ms-3"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  )
}