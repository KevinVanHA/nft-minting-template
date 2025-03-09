import React from 'react';

export default function Utilities() {
  return (
    <section id="utilities" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Blasted Buck NFT Utilities</h2>

      <h4 className="mb-8 text-align-center">There will be a limit of 2 per wallet. When you mint a Blasted Buck, you’re buying a 10+ year admission to a private 22 hour camp out style event on multiple acres of land in the great state of Maine in the United States</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Event Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Event Details</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✅ 10+ year admission</li>
            <li>✅ 22 hour camp out style event</li>
            <li>📍 Multiple acres in Maine, USA</li>
            <li>👥 415 exclusive attendees</li>
          </ul>
        </div>

        {/* What's Included Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">What's Included</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Event ticket</li>
            <li>✅ Tent space</li>
            <li>✅ Parking space</li>
            <li>✅ Dinner & drinks</li>
            <li>✅ Swag bag</li>
            <li>🎵 Live entertainment</li>
          </ul>
        </div>

        {/* Prizes & Perks Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Prizes & Perks</h3>
          <ul className="space-y-3 text-gray-700">
            <li>🎁 Trait-based prizes post-mint</li>
            <li>🎉 Annual event improvements</li>
            <li>🌟 Exclusive holder experience</li>
          </ul>
        </div>

        {/* On-Site Activities Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">On-Site Activities</h3>
          <ul className="space-y-3 text-gray-700">
            <li>🎮 Pay-to-play games</li>
            <li>🎨 Project booths</li>
            <li>🛍️ Merch booths</li>
            <li>⻝ Concessions available</li>
          </ul>
        </div>

        {/* Important Notes Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✅ 18+ only event</li>
            <li>✅ ID check required</li>
            <li>✅ Asset check required</li>
            <li>🌟 Dedicated to your experience</li>
          </ul>
        </div>
      </div>
    </section>
  );
}