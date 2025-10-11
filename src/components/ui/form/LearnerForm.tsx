"use client";

export default function LearnerForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Full Name*
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Last Name*
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Company Name*
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Job Title*
          </label>
          <input
            type="text"
            placeholder="Enter your job title"
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Email Address*
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Phone Number*
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:border-secondary focus:ring-secondary outline-none transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Country*
          </label>
          <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition">
            <option>Select country</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Industry*
          </label>
          <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition">
            <option>Select industry</option>
          </select>
        </div>
      </div>
    </form>
  );
}