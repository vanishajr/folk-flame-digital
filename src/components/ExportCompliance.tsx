import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Info, FileText, Globe, Shield, Award, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  category: 'quality' | 'packaging' | 'documentation' | 'certification';
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  tips: string[];
}

const ExportCompliance: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showTips, setShowTips] = useState<string | null>(null);

  const complianceRequirements: ComplianceRequirement[] = [
    // Quality Standards
    {
      id: 'quality-1',
      title: 'Material Quality Verification',
      description: 'Ensure all materials meet international quality standards',
      category: 'quality',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Use only certified organic/natural materials',
        'Avoid synthetic dyes and chemicals',
        'Test materials for colorfastness',
        'Document material sources and certifications'
      ]
    },
    {
      id: 'quality-2',
      title: 'Craftsmanship Standards',
      description: 'Maintain consistent quality across all pieces',
      category: 'quality',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Establish quality control checkpoints',
        'Train artisans on international standards',
        'Document production processes',
        'Implement quality assurance protocols'
      ]
    },
    {
      id: 'quality-3',
      title: 'Size and Weight Compliance',
      description: 'Meet international packaging and shipping standards',
      category: 'quality',
      isCompleted: false,
      priority: 'medium',
      tips: [
        'Check destination country regulations',
        'Optimize packaging dimensions',
        'Ensure weight limits compliance',
        'Use standard measurement units'
      ]
    },

    // Packaging Requirements
    {
      id: 'packaging-1',
      title: 'Eco-Friendly Packaging',
      description: 'Use sustainable and biodegradable packaging materials',
      category: 'packaging',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Use recycled paper and cardboard',
        'Avoid plastic packaging',
        'Include care instructions',
        'Use natural fiber packaging'
      ]
    },
    {
      id: 'packaging-2',
      title: 'Protective Packaging',
      description: 'Ensure artwork arrives in perfect condition',
      category: 'packaging',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Use acid-free tissue paper',
        'Implement shock-absorbing materials',
        'Waterproof outer packaging',
        'Proper labeling and handling instructions'
      ]
    },
    {
      id: 'packaging-3',
      title: 'Labeling Compliance',
      description: 'Meet international labeling requirements',
      category: 'packaging',
      isCompleted: false,
      priority: 'medium',
      tips: [
        'Include country of origin',
        'Material composition details',
        'Care instructions in multiple languages',
        'Size and weight information'
      ]
    },

    // Documentation
    {
      id: 'documentation-1',
      title: 'Certificate of Origin',
      description: 'Obtain official certificate of origin for exports',
      category: 'documentation',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Apply through local chamber of commerce',
        'Include detailed product descriptions',
        'Verify all information accuracy',
        'Keep copies for records'
      ]
    },
    {
      id: 'documentation-2',
      title: 'Material Safety Certificates',
      description: 'Provide safety compliance documentation',
      category: 'documentation',
      isCompleted: false,
      priority: 'high',
      tips: [
        'Obtain REACH compliance certificates',
        'Test for harmful substances',
        'Document safety testing procedures',
        'Keep certificates updated'
      ]
    },
    {
      id: 'documentation-3',
      title: 'Export Documentation',
      description: 'Complete all required export forms and permits',
      category: 'documentation',
      isCompleted: false,
      priority: 'medium',
      tips: [
        'Fill out commercial invoice',
        'Obtain export license if required',
        'Include packing list',
        'Verify destination country requirements'
      ]
    },

    // Certification
    {
      id: 'certification-1',
      title: 'Fair Trade Certification',
      description: 'Obtain fair trade certification for ethical practices',
      category: 'certification',
      isCompleted: false,
      priority: 'medium',
      tips: [
        'Implement fair labor practices',
        'Document worker conditions',
        'Apply through fair trade organizations',
        'Maintain certification standards'
      ]
    },
    {
      id: 'certification-2',
      title: 'Organic Certification',
      description: 'Certify organic materials and processes',
      category: 'certification',
      isCompleted: false,
      priority: 'low',
      tips: [
        'Use certified organic materials',
        'Document organic processes',
        'Apply through organic certifiers',
        'Regular compliance audits'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Requirements', icon: FileText },
    { id: 'quality', name: 'Quality Standards', icon: Award },
    { id: 'packaging', name: 'Packaging', icon: Shield },
    { id: 'documentation', name: 'Documentation', icon: FileText },
    { id: 'certification', name: 'Certification', icon: Globe }
  ];

  const filteredRequirements = selectedCategory === 'all' 
    ? complianceRequirements 
    : complianceRequirements.filter(req => req.category === selectedCategory);

  const completedCount = complianceRequirements.filter(req => req.isCompleted).length;
  const totalCount = complianceRequirements.length;
  const completionPercentage = (completedCount / totalCount) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleRequirement = (id: string) => {
    // In a real app, this would update the database
    console.log(`Toggled requirement: ${id}`);
  };

  const downloadComplianceGuide = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading Export Compliance Guide...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Globe className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Export Compliance Guide</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get your handicrafts export-ready by following these international standards and requirements
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            Export Readiness Progress
          </CardTitle>
          <CardDescription>
            Track your progress towards becoming export-ready
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {completedCount} of {totalCount} requirements completed
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Not Ready</span>
              <span>Export Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequirements.map((requirement) => (
          <Card key={requirement.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center">
                    {requirement.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    )}
                    {requirement.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {requirement.description}
                  </CardDescription>
                </div>
                <Badge className={`ml-2 ${getPriorityColor(requirement.priority)}`}>
                  {requirement.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTips(showTips === requirement.id ? null : requirement.id)}
                  className="w-full"
                >
                  <Info className="h-4 w-4 mr-2" />
                  {showTips === requirement.id ? 'Hide Tips' : 'Show Tips'}
                </Button>

                {showTips === requirement.id && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Implementation Tips:</h4>
                    <ul className="space-y-1">
                      {requirement.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  variant={requirement.isCompleted ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleRequirement(requirement.id)}
                  className="w-full"
                >
                  {requirement.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <Button onClick={downloadComplianceGuide} size="lg" className="mr-4">
          <Download className="h-5 w-5 mr-2" />
          Download Complete Guide
        </Button>
        <Button variant="outline" size="lg">
          <Globe className="h-5 w-5 mr-2" />
          Get Expert Consultation
        </Button>
      </div>

      {/* Export Readiness Checklist */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Export Readiness Checklist</CardTitle>
          <CardDescription>
            Essential items to check before your first export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Before Production:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Verify material quality standards</li>
                <li>• Establish quality control processes</li>
                <li>• Document production methods</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Before Shipping:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Complete all documentation</li>
                <li>• Package according to standards</li>
                <li>• Verify labeling compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportCompliance;
