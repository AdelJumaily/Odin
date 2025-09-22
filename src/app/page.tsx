import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Odin Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Organized, scalable, and maintainable company platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Company</h2>
            <p className="text-gray-300 mb-6">
              Company pages, dashboard, and corporate information
            </p>
            <Link 
              href="/company" 
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded transition-colors inline-block"
            >
              Visit Company
            </Link>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Products</h2>
            <p className="text-gray-300 mb-6">
              Our product portfolio including Valkyrie and more
            </p>
            <Link 
              href="/products" 
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded transition-colors inline-block"
            >
              View Products
            </Link>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Valkyrie</h2>
            <p className="text-gray-300 mb-6">
              Advanced file management and security platform
            </p>
            <Link 
              href="/products/valkyrie" 
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded transition-colors inline-block"
            >
              Launch Valkyrie
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">New Organization Structure</h3>
          <div className="bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto">
            <pre className="text-sm text-gray-300 text-left overflow-x-auto">
{`odin/
├── company/          # Company pages & components
├── products/         # Product applications
│   └── valkyrie/    # Valkyrie file manager
├── shared/          # Shared utilities
└── src/app/         # Main Next.js app`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}