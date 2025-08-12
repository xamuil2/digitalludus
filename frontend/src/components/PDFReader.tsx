import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

interface PDFReaderProps {
  pdfUrl: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PDFReader({ pdfUrl, currentPage = 1, onPageChange }: PDFReaderProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <CardTitle className="text-lg sm:text-xl">Cambridge Textbook</CardTitle>
            <CardDescription className="text-sm">Page {currentPage} • {zoom}% zoom</CardDescription>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Button variant="outline" size="icon" onClick={handleZoomOut} className="touch-manipulation active:scale-95 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
              <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn} className="touch-manipulation active:scale-95 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRotate} className="touch-manipulation active:scale-95 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
              <RotateCw className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="outline" size="icon" className="touch-manipulation active:scale-95 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: window.innerWidth < 640 ? '400px' : '600px' }}>
          <iframe
            src={pdfUrl}
            title="Ludus Textbook PDF"
            className="w-full h-full border-none"
            style={{
              height: window.innerWidth < 640 ? '400px' : '600px',
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
          />
          {/* Navigation Controls */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 shadow-lg border">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="touch-manipulation active:scale-95 h-8 w-8 p-0"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <span className="text-xs sm:text-sm font-medium px-2">
              Page {currentPage}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onPageChange?.(currentPage + 1)}
              className="touch-manipulation active:scale-95 h-8 w-8 p-0"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
