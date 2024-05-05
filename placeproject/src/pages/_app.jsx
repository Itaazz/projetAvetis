import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main>
    <header className="border-b border-violet-100 bg-grey-200 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/places/create" className="text-gray-800 hover:text-gray-600 font-medium">
                <button className="bg-violet-500 hover:bg-violet-800 text-white py-2 px-6 rounded shadow">
                  Create
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section className="flex-1">
      <div className="container mx-auto px-4 py-3">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App
