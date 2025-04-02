import React, { useState, useRef } from 'react';
import { Upload, Video, Camera, Car, AlertTriangle, X, PlayCircle } from 'lucide-react';

interface Violation {
  id: string;
  timestamp: string;
  type: 'person' | 'vehicle';
  imageUrl: string;
  location: string;
  details: string;
}

function Demo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [violations, setViolations] = useState<Violation[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock violations for demonstration
  const mockViolations: Violation[] = [
    {
      id: '1',
      timestamp: '2024-03-15 10:30:45',
      type: 'person',
      imageUrl: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=500',
      location: 'Main Street Park',
      details: 'Face detected: Male, approximately 30-35 years old'
    },
    {
      id: '2',
      timestamp: '2024-03-15 11:15:22',
      type: 'vehicle',
      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500',
      location: 'Downtown Plaza',
      details: 'License Plate: ABC 123'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setViolations(mockViolations);
    setIsAnalyzing(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setViolations([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Demo Instructions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <PlayCircle className="w-8 h-8 text-green-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Try the Demo</h2>
              <p className="text-gray-600 mt-2">
                Upload a video of a public area to detect littering incidents. Our AI will analyze the
                footage and identify any violations.
              </p>
            </div>
          </div>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!selectedFile ? (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your video file here, or</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Select Video
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: MP4, AVI, MOV (max size: 100MB)
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-gray-700">{selectedFile.name}</span>
                </div>
                <button
                  onClick={clearSelection}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {selectedFile && !isAnalyzing && violations.length === 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleAnalyze}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Analyze Video
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="mt-6 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full mb-3"></div>
                <p className="text-gray-600">Analyzing video for violations...</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {violations.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Analysis Results
            </h2>
            <div className="space-y-6">
              {violations.map((violation) => (
                <div
                  key={violation.id}
                  className="border rounded-lg p-6 bg-gray-50"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        {violation.type === 'person' ? (
                          <Camera className="w-6 h-6 text-blue-500 mr-2" />
                        ) : (
                          <Car className="w-6 h-6 text-green-500 mr-2" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {violation.type === 'person' ? 'Person Detected' : 'Vehicle Detected'}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Timestamp</p>
                          <p className="text-gray-900">{violation.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="text-gray-900">{violation.location}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Details</p>
                          <p className="text-gray-900">{violation.details}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        src={violation.imageUrl}
                        alt="Violation evidence"
                        className="w-48 h-32 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Demo;