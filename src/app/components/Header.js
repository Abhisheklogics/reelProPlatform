"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Menu } from "lucide-react";
import { useState } from "react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-base-300/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left - Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold btn btn-ghost"
          prefetch={true}
          onClick={() =>
            showNotification("Welcome to ImageKit ReelsPro", "info")
          }
        >
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Kamwale</span>
        </Link>

     
        <nav className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/upload"
                className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
                onClick={() =>
                  showNotification("Welcome to Admin Dashboard", "info")
                }
              >
                Video Upload
              </Link>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg text-error hover:bg-base-200 transition"
              >
                Sign Out
              </button>

              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-base-200">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="user"
                    className="w-7 h-7 rounded-full border"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="text-sm">
                  {session.user?.email?.split("@")[0]}
                </span>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
              onClick={() =>
                showNotification("Please sign in to continue", "info")
              }
            >
              Login
            </Link>
          )}
        </nav>

       
        <button
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

    
      {menuOpen && (
        <div className="md:hidden bg-base-100 shadow-lg border-t animate-slide-down">
          <ul className="flex flex-col gap-1 py-2 px-4">
            {session ? (
              <>
                <li className="text-sm opacity-70">
                  {session.user?.email?.split("@")[0]}
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 rounded-lg hover:bg-base-200"
                    onClick={() => {
                      showNotification("Welcome to Admin Dashboard", "info");
                      setMenuOpen(false);
                    }}
                  >
                    Video Upload
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-error hover:bg-base-200"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2 rounded-lg hover:bg-base-200"
                  onClick={() => {
                    showNotification("Please sign in to continue", "info");
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
