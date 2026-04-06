-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- REGIONS TABLE
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- CITIES TABLE
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for cities
CREATE INDEX idx_cities_region_id ON cities(region_id);
CREATE INDEX idx_cities_coordinates ON cities(latitude, longitude);

-- TOURIST SITES TABLE
CREATE TABLE tourist_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  price_per_person DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for tourist_sites
CREATE INDEX idx_sites_city_id ON tourist_sites(city_id);
CREATE INDEX idx_sites_is_featured ON tourist_sites(is_featured) WHERE is_featured = true;
CREATE INDEX idx_sites_coordinates ON tourist_sites(latitude, longitude);

-- ENUMS for Bookings and Payments
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- BOOKINGS TABLE
-- Note: Assuming user_id refers to Supabase auth.users table which is standard, 
-- but kept as generic UUID referencing auth.users.
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- normally REFERENCES auth.users(id) ON DELETE CASCADE
  tourist_site_id UUID NOT NULL REFERENCES tourist_sites(id) ON DELETE RESTRICT,
  booking_date DATE NOT NULL,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0),
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status booking_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for bookings
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_site_id ON bookings(tourist_site_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);

-- PAYMENTS TABLE
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  status payment_status DEFAULT 'pending' NOT NULL,
  payment_provider VARCHAR(50), -- e.g., 'mobile_money', 'orange_money', 'stripe'
  provider_transaction_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for payments
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);

-- TRIGGER FOR UPDATED_AT ON BOOKINGS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_modtime
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
