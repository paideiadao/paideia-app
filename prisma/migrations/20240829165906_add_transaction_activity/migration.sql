-- CreateTable
CREATE TABLE "user_details_cache" (
    "user_details_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dao" TEXT NOT NULL,
    "profile_image_url" TEXT,

    CONSTRAINT "user_details_cache_pkey" PRIMARY KEY ("user_details_id")
);

-- CreateTable
CREATE TABLE "transaction_activity" (
    "id" TEXT NOT NULL,
    "user_details_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "href" TEXT,
    "action" TEXT NOT NULL,
    "value" TEXT,
    "category" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_activity" ADD CONSTRAINT "transaction_activity_user_details_id_fkey" FOREIGN KEY ("user_details_id") REFERENCES "user_details_cache"("user_details_id") ON DELETE CASCADE ON UPDATE CASCADE;
