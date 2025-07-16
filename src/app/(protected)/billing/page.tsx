"use client";

import { PricingTable } from "@clerk/nextjs";
import React from "react";

const BillingPage = () => {
  return (
    <div className="min-h-screen w-full bg-muted rounded-2xl py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Upgrade your experience with meeting analysis, summaries, and searchable logs.
        </p>

        <div className="rounded-2xl p-6">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
