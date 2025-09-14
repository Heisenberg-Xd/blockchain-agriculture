import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Camera, MapPin, Calendar, Package } from 'lucide-react';

interface CreateBatchFormProps {
  onSubmit: (formData: any) => void;
}

export function CreateBatchForm({ onSubmit }: CreateBatchFormProps) {
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    unit: 'kg',
    location: '',
    plantedDate: '',
    harvestDate: '',
    notes: '',
    photo: null
  });

  const cropTypes = [
    'Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Wheat', 'Rice', 'Corn', 'Beans', 'Lettuce', 'Spinach'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = () => {
    // Mock photo upload
    setFormData(prev => ({ ...prev, photo: 'mock-photo-url.jpg' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cropType || !formData.quantity) {
      alert('Please fill in crop type and quantity');
      return;
    }
    
    const submissionData = {
      ...formData,
      location: formData.location || 'Auto GPS: 40.7128°N, 74.0060°W',
      harvestDate: formData.harvestDate || new Date().toISOString().split('T')[0]
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-green-800">Create New Batch</h2>
        <p className="text-green-600">Register your produce</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Crop Type */}
        <Card className="p-4">
          <Label className="text-green-800 mb-2 block">Crop Type *</Label>
          <Select onValueChange={(value) => handleInputChange('cropType', value)}>
            <SelectTrigger className="w-full h-12 border-green-200">
              <SelectValue placeholder="Select crop type" />
            </SelectTrigger>
            <SelectContent>
              {cropTypes.map((crop) => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Quantity */}
        <Card className="p-4">
          <Label className="text-green-800 mb-2 block">Quantity *</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className="flex-1 h-12 border-green-200"
            />
            <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
              <SelectTrigger className="w-20 h-12 border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="tons">tons</SelectItem>
                <SelectItem value="bags">bags</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4">
          <Label className="text-green-800 mb-2 block flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Farm location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="flex-1 h-12 border-green-200"
            />
            <Button
              type="button"
              variant="outline"
              className="h-12 px-3 border-green-200 text-green-600"
            >
              Auto GPS
            </Button>
          </div>
          <p className="text-xs text-green-600 mt-2">Leave blank to use automatic GPS location</p>
        </Card>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <Label className="text-green-800 mb-2 block flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Planted
            </Label>
            <Input
              type="date"
              value={formData.plantedDate}
              onChange={(e) => handleInputChange('plantedDate', e.target.value)}
              className="h-12 border-green-200"
            />
          </Card>

          <Card className="p-4">
            <Label className="text-green-800 mb-2 block flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Harvest
            </Label>
            <Input
              type="date"
              value={formData.harvestDate}
              onChange={(e) => handleInputChange('harvestDate', e.target.value)}
              className="h-12 border-green-200"
            />
          </Card>
        </div>

        {/* Photo Upload */}
        <Card className="p-4">
          <Label className="text-green-800 mb-2 block flex items-center">
            <Camera className="w-4 h-4 mr-2" />
            Photo
          </Label>
          <Button
            type="button"
            onClick={handlePhotoUpload}
            variant="outline"
            className="w-full h-20 border-2 border-dashed border-green-200 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
          >
            <Camera className="w-8 h-8 text-green-600" />
            {formData.photo ? (
              <span className="text-green-800">Photo uploaded ✓</span>
            ) : (
              <>
                <span className="text-green-800">Take Photo</span>
                <span className="text-xs text-green-600">Tap to capture produce</span>
              </>
            )}
          </Button>
        </Card>

        {/* Notes */}
        <Card className="p-4">
          <Label className="text-green-800 mb-2 block">Notes (Optional)</Label>
          <Textarea
            placeholder="Add any additional information..."
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="min-h-20 border-green-200"
          />
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl"
        >
          Create Batch & Generate QR
        </Button>
      </form>
    </div>
  );
}