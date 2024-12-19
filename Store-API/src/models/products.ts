import mongoose, { Schema, Document } from 'mongoose'

export interface Iproducts extends Document {
  // Define your schema interface here
  name: string
  price: number
  featured: boolean
  rating: number
  createdAt: Date
  company: string
}

const ProductSchema: Schema = new Schema<Iproducts>({
  // Define your schema fields here
  name: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 3.5 },
  createdAt: { type: Date, default: Date.now },
  company: {
    type: String,
    enum: {
      values: ['Amazon', 'IKEA', 'M&T', 'H&M'],
      message: `{VALUE} is not supported.`,
    },
  },
})

export default mongoose.model<Iproducts>('product', ProductSchema)
