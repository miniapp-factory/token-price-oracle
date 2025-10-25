'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} Token Price Mini App. All rights reserved.
      </div>
    </footer>
  );
}
