import ChatRoom from './components/ChatRoom'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <main>
        <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">

              {/* Header Section */}
              <div className="text-center mb-8">
                <h1 className="text-5xl font-medium text-[#314328] mb-2">
                  Anonymous Chat Rooms
                </h1>
                <p className="text-gray-600">"Connect and Relax"</p>
              </div>

              {/* Chat Room Section */}
              <div className="p-6 bg-white rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-medium text-[#314328] mb-4">Join a Chat Room</h2>
                <p className="text-gray-600 mb-4">"Engage in anonymous conversations"</p>
                <ChatRoom />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

