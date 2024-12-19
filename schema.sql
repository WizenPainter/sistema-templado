CREATE TABLE glass_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR NOT NULL,
    thickness DECIMAL NOT NULL,
    width DECIMAL NOT NULL,
    height DECIMAL NOT NULL,
    quantity INTEGER NOT NULL,
    location VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES auth.users(id),
    project_name VARCHAR,
    subproject_name VARCHAR,
    status VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    glass_type VARCHAR NOT NULL,
    width DECIMAL NOT NULL,
    height DECIMAL NOT NULL,
    quantity INTEGER NOT NULL,
    processes VARCHAR[],
    current_process VARCHAR,
    qr_code VARCHAR UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
