import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { QrCode, Download, Share, CheckCircle, Package, Calendar, MapPin } from 'lucide-react';

interface QRCodeDisplayProps {
  batch: any;
}

export function QRCodeDisplay({ batch }: QRCodeDisplayProps) {
  if (!batch) return null;

  // Mock QR code - in real app this would be generated with actual QR library
  const qrCodeData = `https://agritrack.app/verify/${batch.id}`;

  const handleDownload = () => {
    alert('QR Code downloaded to device');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `AgriTrack - ${batch.cropType}`,
        text: `Track this ${batch.cropType} batch through the supply chain`,
        url: qrCodeData,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(qrCodeData);
      alert('QR code link copied to clipboard');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">QR Code Generated</h2>
        <p className="text-green-600">Your batch is now trackable!</p>
      </div>

      {/* Success Message */}
      <Card className="p-4 mb-6 border-green-200 bg-green-50">
        <div className="flex items-center justify-center mb-3">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <span className="text-green-800">Batch Successfully Created</span>
        </div>
        <div className="text-center text-sm text-green-600">
          Your produce has been registered on the blockchain and is ready for tracking
        </div>
      </Card>

      {/* Batch Info */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-green-800 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Batch Details
          </h3>
          <Badge className="bg-green-600 text-white">#{batch.id}</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-green-600">Crop Type:</span>
            <span className="text-green-800">{batch.cropType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Quantity:</span>
            <span className="text-green-800">{batch.quantity} {batch.unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Created:
            </span>
            <span className="text-green-800">
              {new Date(batch.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location:
            </span>
            <span className="text-green-800 text-right text-sm">
              {batch.location}
            </span>
          </div>
        </div>
      </Card>

      {/* QR Code Display */}
      <Card className="p-6 mb-6 text-center">
        <div className="w-48 h-48 bg-white border-2 border-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
          {/* Mock QR Code Pattern */}
          <div className="w-40 h-40 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-2 bg-white rounded-sm">
              <div className="w-full h-full bg-green-600 rounded-sm opacity-90" style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 2px, green 2px, green 4px),
                  repeating-linear-gradient(90deg, transparent, transparent 2px, green 2px, green 4px)
                `,
                backgroundSize: '8px 8px'
              }}></div>
            </div>
            <QrCode className="w-12 h-12 text-white relative z-10" />
          </div>
        </div>
        
        <div className="text-sm text-green-600 mb-4">
          Scan this QR code to track the produce journey
        </div>
        
        <div className="text-xs text-gray-500 break-all bg-gray-50 p-2 rounded">
          {qrCodeData}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl flex items-center justify-center space-x-3"
        >
          <Download className="w-5 h-5" />
          <span>Download QR Code</span>
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShare}
            variant="outline"
            className="h-12 border-green-200 hover:bg-green-50 text-green-700 flex items-center justify-center space-x-2"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="h-12 border-green-200 hover:bg-green-50 text-green-700 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-4 mt-6 border-blue-200 bg-blue-50">
        <h4 className="text-blue-800 mb-2">Next Steps:</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Print and attach QR code to produce packaging
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Share batch ID with distributors
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Track your produce through the supply chain
          </div>
        </div>
      </Card>
    </div>
  );
}