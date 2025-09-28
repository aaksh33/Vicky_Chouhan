import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  role: { type: String, default: 'user' },
  password: String,
}, { timestamps: true })

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: String,
  image: String,
  description: String,
  slug: { type: String, unique: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true })

const OrderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  items: [{
    productId: String,
    qty: Number,
    price: Number,
    name: String
  }],
  total: Number,
  status: { type: String, default: 'pending' },
  address: {
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String
  },
  paymentMethod: String,
  deliveryDate: Date,
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)