"use client";

export function ParallaxBackground({ 
  children, 
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}

export function ParallaxBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute rounded-full"
        style={{
          top: "-10%",
          right: "-5%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(245,197,24,0.45) 0%, rgba(230,168,0,0.25) 35%, rgba(204,136,0,0) 65%)",
        }}
      />
      
      <div
        className="absolute rounded-full"
        style={{
          top: "40%",
          left: "-15%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 40%, rgba(255,165,0,0) 65%)",
        }}
      />
      
      <div
        className="absolute rounded-full"
        style={{
          bottom: "15%",
          right: "5%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(255,193,7,0.35) 0%, rgba(255,152,0,0.15) 45%, rgba(255,152,0,0) 65%)",
        }}
      />
      
      <div
        className="absolute rounded-full"
        style={{
          top: "70%",
          left: "10%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(245,197,24,0.3) 0%, rgba(230,168,0,0.1) 50%, rgba(204,136,0,0) 70%)",
        }}
      />
    </div>
  );
}
