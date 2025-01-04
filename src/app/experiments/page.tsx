"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExperimentForm } from "@/components/ExperimentForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ExperimentsPage() {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/create-account");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-6 max-h-[80vh] overflow-auto">
        <ExperimentForm />
      </div>
      <Footer />
    </div>
  );
}
