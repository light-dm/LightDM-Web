import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="text-[#F5C518] text-[150px] md:text-[200px] font-bold leading-none tracking-tight mb-4">
          404
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Seite nicht gefunden
        </h1>
        
        <p className="text-white/50 mb-8">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F5C518] via-[#FFD700] to-[#E6A800] text-black font-semibold hover:opacity-90 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
