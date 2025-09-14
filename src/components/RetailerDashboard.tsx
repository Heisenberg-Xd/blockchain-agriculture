import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { QrCode, Store, DollarSign, CheckCircle, Package, TrendingUp } from 'lucide-react';

interface RetailerDashboardProps {
  onQRScan: (qrData: any) => void;
}

export function RetailerDashboard({ onQRScan }: RetailerDashboardProps) {
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [priceData, setPriceData] = useState({
    price: '',
    discountPercent: '',
    expiryDate: ''
  });

  const inventory = [
    { id: 'BTC001', crop: 'Tomatoes', quantity: '45 kg', price: '₹80/kg', status: 'Fresh', daysLeft: 3 },
    { id: 'BTC002', crop: 'Carrots', quantity: '30 kg', price: '₹60/kg', status: 'Fresh', daysLeft: 5 },
    { id: 'BTC003', crop: 'Potatoes', quantity: '100 kg', price: '₹40/kg', status: 'Sold', daysLeft: 0 },
  ];

  const handleQRScan = () => {
    // Mock QR scan - would trigger camera in real app
    onQRScan({ batchId: 'BTC1234567890' });
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pricing updated successfully!');
    setShowPriceForm(false);
  };

  const handleMarkAsSold = (batchId: string) => {
    alert(`Batch ${batchId} marked as sold!`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">Retailer Dashboard</h2>
        <p className="text-green-600">FreshMart Supermarket</p>
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
              <div className="text-sm opacity-90">Add to inventory</div>
            </div>
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <Button
              onClick={() => setShowPriceForm(!showPriceForm)}
              variant="outline"
              className="w-full h-24 border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
            >
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <div className="text-sm text-green-800">Update Price</div>
                <div className="text-xs text-green-600">Set retail price</div>
              </div>
            </Button>
          </Card>

          <Card className="p-4">
            <Button
              variant="outline"
              className="w-full h-24 border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <div className="text-sm text-green-800">Mark as Sold</div>
                <div className="text-xs text-green-600">Complete sale</div>
              </div>
            </Button>
          </Card>
        </div>
      </div>

      {/* Price Update Form */}
      {showPriceForm && (
        <Card className="p-4 mb-6 border-green-200 bg-green-50">
          <h3 className="text-lg text-green-800 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Update Pricing
          </h3>
          <form onSubmit={handlePriceSubmit} className="space-y-4">
            <div>
              <Label className="text-green-800 mb-1 block">Retail Price (per kg)</Label>
              <Input
                placeholder="₹80"
                value={priceData.price}
                onChange={(e) => setPriceData(prev => ({ ...prev, price: e.target.value }))}
                className="h-10 border-green-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-green-800 mb-1 block">Discount %</Label>
                <Input
                  placeholder="10"
                  type="number"
                  value={priceData.discountPercent}
                  onChange={(e) => setPriceData(prev => ({ ...prev, discountPercent: e.target.value }))}
                  className="h-10 border-green-200"
                />
              </div>
              <div>
                <Label className="text-green-800 mb-1 block">Best Before</Label>
                <Input
                  type="date"
                  value={priceData.expiryDate}
                  onChange={(e) => setPriceData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="h-10 border-green-200"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Update Price
            </Button>
          </form>
        </Card>
      )}

      {/* Current Inventory */}
      <div className="mb-6">
        <h3 className="text-lg text-green-800 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Current Inventory
        </h3>
        <div className="space-y-3">
          {inventory.map((item) => (
            <Card key={item.id} className="p-4 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-800">{item.crop}</div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'Fresh' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-green-600 mb-2">
                <div>{item.quantity}</div>
                <div className="text-green-800">{item.price}</div>
              </div>
              {item.status === 'Fresh' && (
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {item.daysLeft} days left
                  </div>
                  <Button
                    onClick={() => handleMarkAsSold(item.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                  >
                    Mark Sold
                  </Button>
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">{item.id}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sales Summary */}
      <Card className="p-4 bg-green-50 border-green-200">
        <h4 className="text-green-800 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Today's Sales
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl text-green-800">₹12,450</div>
            <div className="text-xs text-green-600">Revenue</div>
          </div>
          <div>
            <div className="text-xl text-green-800">18</div>
            <div className="text-xs text-green-600">Items Sold</div>
          </div>
          <div>
            <div className="text-xl text-green-800">42</div>
            <div className="text-xs text-green-600">Customers</div>
          </div>
        </div>
      </Card>
    </div>
  );
}