import React, { useState } from 'react';
import { FarmerDashboard } from './components/FarmerDashboard';
import { DistributorDashboard } from './components/DistributorDashboard';
import { RetailerDashboard } from './components/RetailerDashboard';
import { ConsumerView } from './components/ConsumerView';
import { CreateBatchForm } from './components/CreateBatchForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Sprout, Truck, Store, User, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('userSelect');
  const [userType, setUserType] = useState('');
  const [currentBatch, setCurrentBatch] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [batchData, setBatchData] = useState(null);

  const handleUserSelect = (type) => {
    setUserType(type);
    setCurrentScreen(type + 'Dashboard');
  };

  const handleCreateBatch = () => {
    setCurrentScreen('createBatch');
  };

  const handleBatchSubmit = (formData) => {
    const batch = {
      id: 'BTC' + Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      farmer: 'John Doe Farm',
      location: formData.location || 'Auto GPS: 40.7128°N, 74.0060°W'
    };
    setBatchData(batch);
    setCurrentBatch(batch);
    setShowQRCode(true);
    setCurrentScreen('qrDisplay');
  };

  const handleQRScan = (qrData) => {
    // Mock QR scan result
    const mockBatch = {
      id: 'BTC1234567890',
      cropType: 'Organic Tomatoes',
      quantity: '50 kg',
      farmer: 'Green Valley Farm',
      location: 'Punjab, India',
      plantedDate: '2024-01-15',
      harvestDate: '2024-03-20',
      distributorInfo: {
        company: 'Fresh Transport Co.',
        transportDate: '2024-03-21',
        temperature: '4°C',
        expectedDelivery: '2024-03-22'
      },
      retailerInfo: {
        store: 'FreshMart Supermarket',
        receivedDate: '2024-03-22',
        price: '₹80/kg',
        soldDate: '2024-03-23'
      },
      blockchain: {
        verified: true,
        txHash: '0x1a2b3c4d5e6f...'
      }
    };
    setBatchData(mockBatch);
    setCurrentScreen('consumerView');
  };

  const handleBackToMain = () => {
    setCurrentScreen('userSelect');
    setUserType('');
    setCurrentBatch(null);
    setShowQRCode(false);
    setBatchData(null);
  };

  const handleBack = () => {
    if (currentScreen === 'createBatch' || currentScreen === 'qrDisplay') {
      setCurrentScreen('farmerDashboard');
    } else {
      setCurrentScreen(userType + 'Dashboard');
    }
  };

  if (currentScreen === 'userSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 mt-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl text-green-800 mb-2">AgriTrack</h1>
            <p className="text-green-600">Blockchain Produce Tracking</p>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <Button
                onClick={() => handleUserSelect('farmer')}
                variant="outline"
                className="w-full h-20 border-green-200 hover:bg-green-50 flex items-center justify-center space-x-4"
              >
                <Sprout className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-lg text-green-800">Farmer</div>
                  <div className="text-sm text-green-600">Create & Track Produce</div>
                </div>
              </Button>
            </Card>

            <Card className="p-6">
              <Button
                onClick={() => handleUserSelect('distributor')}
                variant="outline"
                className="w-full h-20 border-green-200 hover:bg-green-50 flex items-center justify-center space-x-4"
              >
                <Truck className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-lg text-green-800">Distributor</div>
                  <div className="text-sm text-green-600">Transport & Update</div>
                </div>
              </Button>
            </Card>

            <Card className="p-6">
              <Button
                onClick={() => handleUserSelect('retailer')}
                variant="outline"
                className="w-full h-20 border-green-200 hover:bg-green-50 flex items-center justify-center space-x-4"
              >
                <Store className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-lg text-green-800">Retailer</div>
                  <div className="text-sm text-green-600">Price & Sell</div>
                </div>
              </Button>
            </Card>

            <Card className="p-6">
              <Button
                onClick={() => handleQRScan()}
                variant="outline"
                className="w-full h-20 border-green-200 hover:bg-green-50 flex items-center justify-center space-x-4"
              >
                <User className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-lg text-green-800">Consumer</div>
                  <div className="text-sm text-green-600">Scan & Verify</div>
                </div>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const showBackButton = currentScreen !== 'userSelect';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {showBackButton && (
        <div className="p-4">
          <Button
            onClick={currentScreen === 'consumerView' ? handleBackToMain : handleBack}
            variant="ghost"
            className="text-green-600 hover:bg-green-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {currentScreen === 'consumerView' ? 'Back to Main' : 'Back'}
          </Button>
        </div>
      )}

      {currentScreen === 'farmerDashboard' && (
        <FarmerDashboard onCreateBatch={handleCreateBatch} />
      )}
      {currentScreen === 'distributorDashboard' && (
        <DistributorDashboard onQRScan={handleQRScan} />
      )}
      {currentScreen === 'retailerDashboard' && (
        <RetailerDashboard onQRScan={handleQRScan} />
      )}
      {currentScreen === 'consumerView' && (
        <ConsumerView batchData={batchData} />
      )}
      {currentScreen === 'createBatch' && (
        <CreateBatchForm onSubmit={handleBatchSubmit} />
      )}
      {currentScreen === 'qrDisplay' && (
        <QRCodeDisplay batch={currentBatch} />
      )}
    </div>
  );
}