export default function Navbar() {
    return (
      <nav className="border-b">
        <div className="max-w-6xl mx-auto flex justify-between p-5">
          <h2 className="font-bold text-2xl">
            KnowledgeBot AI
          </h2>
  
          <div className="flex gap-6">
            <a href="#">Features</a>
            <a href="#">About</a>
            <button className="border px-4 py-2 rounded">
              Login
            </button>
          </div>
        </div>
      </nav>
    );
  }