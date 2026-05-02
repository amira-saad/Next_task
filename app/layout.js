import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-4">{children}</main>
     
      </body>
    </html>
  );
}