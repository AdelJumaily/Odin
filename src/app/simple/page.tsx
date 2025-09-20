export default function SimplePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <h1 className="text-6xl font-bold mb-4">Odin</h1>
        <p className="text-2xl mb-8">Autonomous Security Operations</p>
        <div className="space-y-4">
          <p className="text-lg">The future of cybersecurity starts here</p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
