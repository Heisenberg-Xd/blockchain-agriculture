import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, QrCode, Package, MapPin, Calendar, User } from 'lucide-react';

interface FarmerDashboardProps {
  onCreateBatch: () => void;
}

export function FarmerDashboard({ onCreateBatch }: FarmerDashboardProps) {
  const recentBatches = [
    { id: 'BTC001', crop: 'Tomatoes', quantity: '100 kg', date: '2024-03-20', status: 'Active' },
    { id: 'BTC002', crop: 'Carrots', quantity: '75 kg', date: '2024-03-18', status: 'Delivered' },
    { id: 'BTC003', crop: 'Potatoes', quantity: '200 kg', date: '2024-03-15', status: 'Sold' }
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">Farmer Dashboard</h2>
        <p className="text-green-600">Welcome back, John!</p>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-4 mb-8">
        <Card className="p-4">
          <Button
            onClick={onCreateBatch}
            className="w-full h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center space-x-4"
          >
            <Plus className="w-10 h-10" />
            <div className="text-left">
              <div className="text-lg">Create Batch</div>
              <div className="text-sm opacity-90">Add new produce</div>
            </div>
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <Button
              variant="outline"
              className="w-full h-24 border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
            >
              <QrCode className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <div className="text-sm text-green-800">Generate QR</div>
                <div className="text-xs text-green-600">Quick codes</div>
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
                <div className="text-sm text-green-800">My Produce</div>
                <div className="text-xs text-green-600">View all</div>
              </div>
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Batches */}
      <div className="mb-6">
        <h3 className="text-lg text-green-800 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Recent Batches
        </h3>
        <div className="space-y-3">
          {recentBatches.map((batch) => (
            <Card key={batch.id} className="p-4 border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-green-800">{batch.crop}</div>
                    <div className="text-sm text-green-600">{batch.quantity}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {batch.date}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  batch.status === 'Active' ? 'bg-green-100 text-green-800' :
                  batch.status === 'Delivered' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {batch.status}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Farm Info */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-green-800">Green Valley Farm</div>
            <div className="text-sm text-green-600">Punjab, India</div>
            <div className="text-xs text-green-500">Organic Certified ✓</div>
          </div>
        </div>
      </Card>
    </div>
  );
}