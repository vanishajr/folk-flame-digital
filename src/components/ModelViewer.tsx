import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Share2,
  Info,
  Camera
} from "lucide-react";

interface ModelViewerProps {
  modelPath: string;
  modelName: string;
  description: string;
  onARLaunch?: () => void;
}

const ModelViewer = ({ modelPath, modelName, description, onARLaunch }: ModelViewerProps) => {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load model-viewer web component if not already loaded
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer@^3.4.0/dist/model-viewer.min.js';
      script.type = 'module';
      script.onload = () => {
        // Once loaded, create the model-viewer element
        if (modelRef.current) {
          const modelViewer = document.createElement('model-viewer');
          modelViewer.setAttribute('src', modelPath);
          modelViewer.setAttribute('alt', modelName);
          modelViewer.setAttribute('camera-controls', '');
          modelViewer.setAttribute('auto-rotate', '');
          modelViewer.setAttribute('shadow-intensity', '1');
          modelViewer.setAttribute('environment-image', 'neutral');
          modelViewer.setAttribute('exposure', '1');
          modelViewer.setAttribute('shadow-softness', '0.5');
          modelViewer.setAttribute('min-camera-orbit', 'auto auto auto');
          modelViewer.setAttribute('max-camera-orbit', 'auto auto auto');
          modelViewer.setAttribute('min-field-of-view', '10deg');
          modelViewer.setAttribute('max-field-of-view', '90deg');
          
          modelViewer.style.width = '100%';
          modelViewer.style.height = '400px';
          
          modelViewer.addEventListener('load', handleModelLoad);
          modelViewer.addEventListener('error', handleModelError);
          
          // Clear the container and add the model-viewer
          if (modelRef.current) {
            modelRef.current.innerHTML = '';
            modelRef.current.appendChild(modelViewer);
          }
        }
      };
      document.head.appendChild(script);
    } else {
      // Component already loaded, create the model-viewer
      if (modelRef.current) {
        const modelViewer = document.createElement('model-viewer');
        modelViewer.setAttribute('src', modelPath);
        modelViewer.setAttribute('alt', modelName);
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('shadow-intensity', '1');
        modelViewer.setAttribute('environment-image', 'neutral');
        modelViewer.setAttribute('exposure', '1');
        modelViewer.setAttribute('shadow-softness', '0.5');
        modelViewer.setAttribute('min-camera-orbit', 'auto auto auto');
        modelViewer.setAttribute('max-camera-orbit', 'auto auto auto');
        modelViewer.setAttribute('min-field-of-view', '10deg');
        modelViewer.setAttribute('max-field-of-view', '90deg');
        
        modelViewer.style.width = '100%';
        modelViewer.style.height = '400px';
        
        modelViewer.addEventListener('load', handleModelLoad);
        modelViewer.addEventListener('error', handleModelError);
        
        if (modelRef.current) {
          modelRef.current.innerHTML = '';
          modelRef.current.appendChild(modelViewer);
        }
      }
    }
  }, [modelPath, modelName]);

  const handlePlayPause = () => {
    if (modelRef.current) {
      const modelViewer = modelRef.current.querySelector('model-viewer') as any;
      if (modelViewer) {
        if (isPlaying) {
          modelViewer.pause();
        } else {
          modelViewer.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleReset = () => {
    if (modelRef.current) {
      const modelViewer = modelRef.current.querySelector('model-viewer') as any;
      if (modelViewer) {
        modelViewer.reset();
      }
    }
  };

  const handleZoomIn = () => {
    if (modelRef.current) {
      const modelViewer = modelRef.current.querySelector('model-viewer') as any;
      if (modelViewer && modelViewer.camera) {
        const camera = modelViewer.camera;
        camera.dollyOut(1.2);
        modelViewer.requestUpdate();
      }
    }
  };

  const handleZoomOut = () => {
    if (modelRef.current) {
      const modelViewer = modelRef.current.querySelector('model-viewer') as any;
      if (modelViewer && modelViewer.camera) {
        const camera = modelViewer.camera;
        camera.dollyIn(1.2);
        modelViewer.requestUpdate();
      }
    }
  };

  const handleModelLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleModelError = () => {
    setIsLoading(false);
    setError('Failed to load 3D model');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* 3D Model Viewer */}
        <div className="relative bg-gradient-to-br from-heritage-beige to-heritage-gold/30 min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-heritage-maroon font-medium">Loading 3D Model...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-red-600">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="font-medium">{error}</p>
                <p className="text-sm opacity-75 mt-2">Please check the model file path</p>
              </div>
            </div>
          )}

          <div 
            ref={modelRef}
            style={{
              width: '100%',
              height: '400px',
              display: isLoading || error ? 'none' : 'block'
            }}
          />

          {/* Model Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayPause}
                className="h-8 w-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
                className="h-8 w-8 p-0"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleZoomIn}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleZoomOut}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-cultural text-xl font-semibold text-primary mb-2">
              {modelName}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onARLaunch}
              className="bg-heritage-maroon hover:bg-heritage-maroon/90 text-primary-foreground"
            >
              <Camera className="mr-2 h-4 w-4" />
              View in AR
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            
            <Button variant="outline" size="sm">
              <Info className="mr-2 h-4 w-4" />
              Info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelViewer; 