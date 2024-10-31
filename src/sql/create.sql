-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "listing_id" VARCHAR(255) NOT NULL,
    "listing_key" VARCHAR(255) NOT NULL,
    "property_type" VARCHAR(255) NOT NULL,
    "standard_status" VARCHAR(255) NOT NULL,
    "list_price" DOUBLE PRECISION NOT NULL,
    "bathrooms_total" DOUBLE PRECISION NOT NULL,
    "bedrooms_total" DOUBLE PRECISION NOT NULL,
    "living_area" DOUBLE PRECISION NOT NULL,
    "public_remarks" VARCHAR(255) NOT NULL,
    "is_swimming_pool" BOOLEAN NOT NULL,
    "is_parking_lot" BOOLEAN NOT NULL,
    "address_line_1" VARCHAR(255) NOT NULL,
    "address_line_2" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "zip" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "unparsed_address" TEXT NOT NULL,
    "internet_address_display_yn" BOOLEAN NOT NULL,
    "feed_types" VARCHAR(255),
    "list_agent_full_name" VARCHAR(255) NOT NULL,
    "list_office_name" VARCHAR(255) NOT NULL,
    "list_agent_mls_id" VARCHAR(255) NOT NULL,
    "list_office_mls_id" VARCHAR(255) NOT NULL,
    "originating_system_name" VARCHAR(255) NOT NULL,
    "modification_timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_by" VARCHAR(255) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "screen_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contact_number" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar_url" VARCHAR(255) NOT NULL,
    "is_mfa_enabled" BOOLEAN NOT NULL,
    "user_type_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" INTEGER,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "media_key" VARCHAR(255) NOT NULL,
    "media_url" VARCHAR(255) NOT NULL,
    "media_size" INTEGER NOT NULL,
    "resource_record_key" VARCHAR(255) NOT NULL,
    "resource_name" VARCHAR(255) NOT NULL,
    "class_name" VARCHAR(255),
    "media_type" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "media_category" VARCHAR(255) NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_number_key" ON "User"("contact_number");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
