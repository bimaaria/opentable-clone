import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Clone of Opentable",
  description: "Created for portfolio purpose",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="w-screen min-h-screen bg-gray-100">
          <AuthContext>
            <main className="m-auto bg-white max-w-screen-2xl">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  )
}
