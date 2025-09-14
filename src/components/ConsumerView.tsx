import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, MapPin, Calendar, Thermometer, DollarSign, Sprout, Truck, Store, Shield } from 'lucide-react';

interface ConsumerViewProps {
  batchData: any;
}

export function ConsumerView({ batchData }: ConsumerViewProps) {
  if (!batchData) return null;

  const timelineSteps = [
    {
      icon: Sprout,
      title: 'Farm',
      status: 'completed',
      data: {
        name: batchData.farmer,
        location: batchData.location,
        date: batchData.plantedDate || '2024-01-15',
        details: ['Organic Certified', 'Planted: Jan 15', 'Harvested: Mar 20']
      }
    },
    {
      icon: Truck,
      title: 'Transport',
      status: batchData.distributorInfo ? 'completed' : 'pending',
      data: batchData.distributorInfo ? {
        name: batchData.distributorInfo.company,
        location: 'Cold Chain Transport',
        date: batchData.distributorInfo.transportDate,
        details: [
          `Temperature: ${batchData.distributorInfo.temperature}`,
          `Picked up: ${batchData.distributorInfo.transportDate}`,
          `Delivered: ${batchData.distributorInfo.expectedDelivery}`
        ]
      } : null
    },
    {
      icon: Store,
      title: 'Retail',
      status: batchData.retailerInfo ? 'completed' : 'pending',
      data: batchData.retailerInfo ? {
        name: batchData.retailerInfo.store,
        location: 'Supermarket',
        date: batchData.retailerInfo.receivedDate,
        details: [
          `Price: ${batchData.retailerInfo.price}`,
          `Received: ${batchData.retailerInfo.receivedDate}`,
          batchData.retailerInfo.soldDate ? `Sold: ${batchData.retailerInfo.soldDate}` : 'Available for sale'
        ]
      } : null
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">Product Journey</h2>
        <p className="text-green-600">Blockchain Verified ✓</p>
      </div>

      {/* Product Info */}
      <Card className="p-4 mb-6 border-green-200 bg-green-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg text-green-800">{batchData.cropType}</h3>
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-green-600">Batch ID</div>
            <div className="text-green-800">{batchData.id}</div>
          </div>
          <div>
            <div className="text-green-600">Quantity</div>
            <div className="text-green-800">{batchData.quantity}</div>
          </div>
        </div>
        
        {/* Blockchain Verification */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-800">
              <Shield className="w-4 h-4 mr-2" />
              Blockchain Verified
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            TX: {batchData.blockchain?.txHash || '0x1a2b3c4d5e6f...'}
          </div>
        </div>
      </Card>

      {/* Journey Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg text-green-800 mb-4">Supply Chain Journey</h3>
        
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          
          return (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-green-200"></div>
              )}
              
              <Card className={`p-4 ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-400'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`${isCompleted ? 'text-green-800' : 'text-gray-600'}`}>
                        {step.title}
                      </h4>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    
                    {step.data ? (
                      <div className="space-y-2">
                        <div className={`${isCompleted ? 'text-green-800' : 'text-gray-600'}`}>
                          {step.data.name}
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {step.data.location}
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {step.data.date}
                        </div>
                        <div className="space-y-1">
                          {step.data.details.map((detail, i) => (
                            <div key={i} className="text-xs text-green-600 flex items-center">
                              <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        Pending update...
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Quality Assurance */}
      <Card className="p-4 mt-6 border-green-200 bg-green-50">
        <h4 className="text-green-800 mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Quality Assurance
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Organic Certified
            </div>
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Cold Chain Maintained
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Quality Inspected
            </div>
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Freshness Guaranteed
            </div>
          </div>
        </div>
      </Card>

      {/* Trust Message */}
      <div className="text-center mt-6 p-4">
        <div className="text-green-800 mb-2">🌱 Farm to Table Transparency</div>
        <div className="text-sm text-green-600">
          This product's journey has been verified using blockchain technology, 
          ensuring complete traceability and authenticity.
        </div>
      </div>
    </div>
  );
}