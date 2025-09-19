"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/Degen-news.svg"
              alt="degenNews"
              className="w-8 h-8"
              loading="lazy"
              width="32"
              height="32"
            />
            <span className="text-2xl font-bold text-white">degenNews</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            {!loading && categories.length > 0 && (
              <div className="flex items-center space-x-6">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    dangerouslySetInnerHTML={{ __html: category }}
                  />
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}