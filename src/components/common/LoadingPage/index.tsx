export function LoadingPage() {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-gray-700 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-ping text-4xl font-bold text-white">WenLock</div>
        </div>
      </div>
    );
  }
  