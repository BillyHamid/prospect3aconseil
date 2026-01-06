import React from 'react';

// Dashboard Skeleton
const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-40"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Prospects Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Prospection Form Skeleton
const ProspectionFormSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Stepper Header Skeleton */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Progress Steps Skeleton */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 mt-2"></div>
                </div>
                {index < 4 && <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content Skeleton */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-80 mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons Skeleton */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

// Table Row Skeleton
const TableRowSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[...Array(3)].map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-gray-200">
          <td className="py-4 px-6">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="py-4 px-6">
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </div>
  );
};

// Card Skeleton
const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="border rounded-xl p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
        </div>
        
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-64"></div>
        </div>
        
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="space-y-3 mb-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

// Generic Skeleton
const Skeleton = ({ type = 'default' }) => {
  switch (type) {
    case 'dashboard':
      return <DashboardSkeleton />;
    case 'prospection':
      return <ProspectionFormSkeleton />;
    case 'table-row':
      return <TableRowSkeleton />;
    case 'card':
      return <CardSkeleton />;
    default:
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      );
  }
};

export { 
  Skeleton, 
  DashboardSkeleton, 
  ProspectionFormSkeleton, 
  TableRowSkeleton, 
  CardSkeleton 
};