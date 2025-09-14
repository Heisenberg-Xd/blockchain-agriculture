import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { QrCode, Truck, Thermometer, Clock, MapPin, Package } from 'lucide-react';

interface DistributorDashboardProps {
  onQRScan: (qrData: any) => void;
}

export function DistributorDashboard({ onQRScan }: DistributorDashboardProps) {
  const [showTransportForm, setShowTransportForm] = useState(false);
  const [transportData, setTransportData] = useState({
    temperature: '',
    humidity: '',
    estimatedDelivery: '',
    notes: ''
  });

  const activeBatches = [
    { id: 'BTC001', crop: 'Tomatoes', from: 'Green Valley Farm', to: 'FreshMart', status: 'In Transit', temp: '4°C' },
    { id: 'BTC002', crop: 'Carrots', from: 'Sunny Acres', to: 'SuperStore', status: 'Loading', temp: '2°C' },
  ];

  const handleQRScan = () => {
    // Mock QR scan - would trigger camera in real app
    onQRScan({ batchId: 'BTC1234567890' });
  };

  const handleTransportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transport information updated successfully!');
    setShowTransportForm(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">Distributor Dashboard</h2>
        <p className="text-green-600">Fresh Transport Co.</p>
      </div>

      {/* Main Actions */}
      <div className="space-y-4 mb-8">
        <Card className="p-4">
          <Button
            onClick={handleQRScan}
            className="w-full h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center space-x-4"
          >
            <QrCode className="w-10 h-10" />
            <div className="text-left">
              <div className="text-lg">Scan QR Code</div>
              <div className="text-sm opacity-90">Update batch info</div>
            </div>
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <Button
              onClick={() => setShowTransportForm(!showTransportForm)}
              variant="outline"
              className="w-full h-24 border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
            >
              <Truck className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <div className="text-sm text-green-800">Transport Info</div>
                <div className="text-xs text-green-600">Update details</div>
              </div>
            </Button>
          </Card>

          <Card className="p-4">
            <Button
              variant="outline"
              className="w-full h-24 border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
            >
              <Package className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <div className="text-sm text-green-800">Quality Report</div>
                <div className="text-xs text-green-600">Add inspection</div>
              </div>
            </Button>
          </Card>
        </div>
      </div>

      {/* Transport Form */}
      {showTransportForm && (
        <Card className="p-4 mb-6 border-green-200 bg-green-50">
          <h3 className="text-lg text-green-800 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Update Transport Info
          </h3>
          <form onSubmit={handleTransportSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-green-800 mb-1 block flex items-center">
                  <Thermometer className="w-4 h-4 mr-1" />
                  Temperature
                </Label>
                <Input
                  placeholder="4°C"
                  value={transportData.temperature}
                  onChange={(e) => setTransportData(prev => ({ ...prev, temperature: e.target.value }))}
                  className="h-10 border-green-200"
                />
              </div>
              <div>
                <Label className="text-green-800 mb-1 block">Humidity</Label>
                <Input
                  placeholder="60%"
                  value={transportData.humidity}
                  onChange={(e) => setTransportData(prev => ({ ...prev, humidity: e.target.value }))}
                  className="h-10 border-green-200"
                />
              </div>
            </div>
            <div>
              <Label className="text-green-800 mb-1 block flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Est. Delivery
              </Label>
              <Input
                type="datetime-local"
                value={transportData.estimatedDelivery}
                onChange={(e) => setTransportData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                className="h-10 border-green-200"
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Update Transport Info
            </Button>
          </form>
        </Card>
      )}

      {/* Active Batches */}
      <div className="mb-6">
        <h3 className="text-lg text-green-800 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Active Batches
        </h3>
        <div className="space-y-3">
          {activeBatches.map((batch) => (
            <Card key={batch.id} className="p-4 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-800">{batch.crop}</div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  batch.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {batch.status}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-green-600">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {batch.from} → {batch.to}
                </div>
                <div className="flex items-center">
                  <Thermometer className="w-3 h-3 mr-1" />
                  {batch.temp}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{batch.id}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl text-green-800">24</div>
            <div className="text-xs text-green-600">Active</div>
          </div>
          <div>
            <div className="text-xl text-green-800">156</div>
            <div className="text-xs text-green-600">Delivered</div>
          </div>
          <div>
            <div className="text-xl text-green-800">98%</div>
            <div className="text-xs text-green-600">On Time</div>
          </div>
        </div>
      </Card>
    </div>
  );
}