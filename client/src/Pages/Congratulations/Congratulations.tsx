import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Congratulations() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 to-white px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md text-center space-y-6 border border-green-200">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h1 className="text-4xl font-bold text-green-700">Congratulations!</h1>
        <p className="text-gray-700 text-lg">
          Your booking was successful. We're excited to see you at the event!
        </p>
        <Button
          onClick={() => navigate("/my-bookings")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-3 rounded-xl transition duration-300"
        >
          View My Bookings
        </Button>
      </div>
    </div>
  );
}

export default Congratulations;
