import { NextResponse } from 'next/server';
import { db, orders } from '@/lib/schema';
import { z } from 'zod';

// Create a validation schema for the order
const orderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
  totalCheckoutAmount: z.number().positive("Total amount must be positive")
});

export async function POST(req: Request) {
  try {
    // Log the incoming request


    // Get the request body and log it
    const body = await req.json();


    // Validate the request body
    const validatedData = orderSchema.parse(body);
    

    // Create the order object
    const orderData = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      street_address: validatedData.streetAddress,
      city: validatedData.city,
      phone: validatedData.phone,
      email: validatedData.email,
      additional_info: validatedData.additionalInfo || '',
      total_checkout_amount: validatedData.totalCheckoutAmount,
      created_at: new Date().toISOString(),
    };

  

   

    // Insert order into the database
    const newOrder = await db.insert(orders).values(orderData);
  

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Order created successfully',
      order: newOrder 
    }, { 
      status: 201 
    });

  } catch (error) {
    // Log the full error
    console.error('Detailed error:', error);

    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false,
        error: 'Validation failed', 
        details: error.errors 
      }, { 
        status: 400 
      });
    }

    // Return detailed error for debugging (remove in production)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}
