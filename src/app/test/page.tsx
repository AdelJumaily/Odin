export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      <p className="text-lg">If you can see this, the basic Next.js setup is working.</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Components Test:</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded">
            <h3 className="text-xl">Navbar Test</h3>
            <p>Testing if components load without errors</p>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <h3 className="text-xl">Hero Test</h3>
            <p>Testing video and scramble text components</p>
          </div>
        </div>
      </div>
    </div>
  );
}
