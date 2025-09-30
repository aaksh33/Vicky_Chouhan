'use client'

import { CheckCircle, Clock, Package, Truck } from 'lucide-react'

type OrderProgressProps = {
  status: string
  statusHistory?: Array<{
    status: string
    timestamp: string
    note?: string
  }>
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'paid', label: 'Payment Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'out-for-delivery', label: 'Out For Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle }
]

export function OrderProgress({ status, statusHistory = [] }: OrderProgressProps) {
  const currentStepIndex = statusSteps.findIndex(step => step.key === status)
  
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex <= currentStepIndex) return 'completed'
    return 'pending'
  }
  
  const getTimestamp = (stepKey: string) => {
    const historyItem = statusHistory.find(h => h.status === stepKey)
    return historyItem ? new Date(historyItem.timestamp).toLocaleString() : null
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const Icon = step.icon
          const stepStatus = getStepStatus(index)
          const timestamp = getTimestamp(step.key)
          
          return (
            <div key={step.key} className="flex items-start relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 z-10 ${
                stepStatus === 'completed' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  stepStatus === 'completed' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                {timestamp && (
                  <p className="text-xs text-gray-400">
                    {timestamp}
                  </p>
                )}
              </div>
              {index < statusSteps.length - 1 && (
                <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                  stepStatus === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}