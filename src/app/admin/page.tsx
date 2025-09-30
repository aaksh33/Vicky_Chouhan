'use client'

import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  ShoppingBag, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Plus,
  Eye,
  TrendingUp,
  DollarSign
} from 'lucide-react'

import Loading from '../loading'

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Loading/>
    )
  }

  if (!session || (session.user?.role !== 'admin' && session.user?.email !== 'admin@electronic.com')) {
    notFound()
  }

  const adminCards = [
    {
      title: 'Add Product',
      description: 'Add new products to your inventory',
      icon: Plus,
      href: '/admin/products',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'View Products',
      description: 'Manage existing products and inventory',
      icon: Package,
      href: '/admin/products',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    },
    {
      title: 'Analytics',
      description: 'View sales reports and analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
    },
    {
      title: 'Settings',
      description: 'Configure store settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gradient-to-r from-gray-500 to-gray-600',
      hoverColor: 'hover:from-gray-600 hover:to-gray-700'
    }
  ]

  const stats = [
    { label: 'Total Products', value: '156', icon: Package, color: 'text-blue-600' },
    { label: 'Total Orders', value: '89', icon: ShoppingBag, color: 'text-green-600' },
    { label: 'Total Users', value: '234', icon: Users, color: 'text-purple-600' },
    { label: 'Revenue', value: '₹2,45,000', icon: DollarSign, color: 'text-orange-600' }
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Manage your electronic store from this dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Admin Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Link
                  key={index}
                  href={card.href}
                  className={`${card.color} ${card.hoverColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8" />
                    <div className="opacity-20 group-hover:opacity-30 transition-opacity">
                      <Icon className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm">{card.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
            >
              <Plus className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-700 group-hover:text-green-800">Add Product</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <Eye className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-700 group-hover:text-blue-800">View Orders</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
            >
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-700 group-hover:text-purple-800">Analytics</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
            >
              <Users className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-orange-700 group-hover:text-orange-800">Manage Users</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}