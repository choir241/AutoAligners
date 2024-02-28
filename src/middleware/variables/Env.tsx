import React from "react";

//globally accessible env variables
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      COLLECTION_ID: string;
      DATABASE_ID: string;
      SERVICE_COLLECTION_ID: string;
      PROJECT: string;
      CAR_API_KEY: string;
      ENDPOINT: string;
      INVENTORY_COLLECTION_ID: string;
      CART_COLLECTION_ID: string;
      PURCHASES_COLLECTION_ID: string;
      CART_DATABASE_ID: string;
      PAYMENTS_COLLECTION_ID: string;
      ESTIMATES_COLLECTION_ID: string;
      FINANCE_PAYMENTS_COLLECTION_ID: string;
      PROFILE_COLLECTION_ID: string;
      PTO_COLLECTION_ID: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}
