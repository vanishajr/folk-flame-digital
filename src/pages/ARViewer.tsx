import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";

const ARViewer = () => {
  const [searchParams] = useSearchParams();
  const modelFile = searchParams.get('model') || '/models/painting1.usdz';
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if device supports AR
    const checkARSupport = async () => {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsARActive(true);
          }
        } catch (error) {
          console.log('Camera access denied or not available');
        }
      }
      setIsLoading(false);
    };

    checkARSupport();
  }, []);

  const handleStartAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      }
    } catch (error) {
      alert('Please allow camera access to use AR features');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center text-white hover:text-gray-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <span className="font-medium">AR Viewer</span>
          </div>
        </div>
      </div>

      {/* AR Camera View */}
      <div className="relative min-h-screen">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Loading AR Experience...</p>
            </div>
          </div>
        ) : isARActive ? (
          <>
            {/* Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-screen object-cover"
            />
            
            {/* AR Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-screen pointer-events-none"
            />

            {/* AR Instructions */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
              <Card className="bg-black/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                  <p className="text-white text-sm mb-2">
                    Point camera at a flat surface
                  </p>
                  <p className="text-white/70 text-xs">
                    Tap to place 3D model: {modelFile.split('/').pop()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* AR Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
                <Button size="sm" variant="ghost" className="text-white">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-12 w-12 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-4">
                AR Experience
              </h1>
              
              <p className="text-white/70 mb-6">
                View your 3D model in augmented reality. Point your camera at a flat surface 
                and tap to place the artwork in your space.
              </p>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-white text-sm mb-2">Model to view:</p>
                <p className="text-white/70 text-xs font-mono">
                  {modelFile.split('/').pop()}
                </p>
              </div>

              <Button 
                onClick={handleStartAR}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                <Camera className="mr-2 h-4 w-4" />
                Start AR Experience
              </Button>

              <p className="text-white/50 text-xs mt-4">
                Make sure to allow camera access when prompted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARViewer; 