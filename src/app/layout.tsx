/* eslint-disable prettier/prettier */
'use client';

/* eslint-disable prettier/prettier */
//import { ClientLayout } from './ClientLayout';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ExternalNavigation } from './Navbar';
//import Footer from '@/components/tailwind/Footer';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Disable session persistence
  },
});

export default function RootLayout() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [drink, setDrink] = useState('');
  const [social_media, setSocialMedia] = useState('');
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.log('Fetched data:', data); // Log the fetched data
      setPosts(data); // Update state with fetched data or an empty array
    }
  };

  useEffect(() => {
    fetchPosts(); // Ensure this is called when the component mounts
  }, []); // Empty dependency array means it only runs on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log what you are about to insert
    console.log('Inserting data:', { name, country, drink });

    // Upload the image to Supabase Storage
    let imageUrl = '';
    if (image) {
      const { data, error } = await supabase.storage
        .from('drink_pictures')
        .upload(`public/${Date.now()}_${image.name}`, image);

      if (error) {
        console.error('Error uploading image:', error.message);
        return;
      }

      // Get the public URL for the uploaded image
      const publicUrl = supabase.storage
        .from('drink_pictures')
        .getPublicUrl(data.path).data.publicUrl;

      imageUrl = publicUrl; // Get the image URL
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ name, country, drink, social_media, imageUrl }]);
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Inserted data:', data);
      setName('');
      setCountry('');
      setDrink('');
      setSocialMedia('');
      setImage(null);
      await fetchPosts(); // Fetch posts after inserting new data
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <head />
      <body>
        <div className="flex pt-2 flex-col min-h-screen bg-white dark:bg-gray-900">
          <ExternalNavigation />

          <div className="container mx-auto flex flex-col mt-5 md:flex-row items-center justify-center px-4">
            {/* Left Side: Form */}
            <div className="w-full md:w-2/3 lg:w-1/2 mb-6 md:mb-0 mx-auto">
              <h2 className="text-2xl font-bold items-center mt-8 mb-4">
                Show the Community 🤗
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (e.g. Vix)"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={social_media}
                  onChange={(e) => setSocialMedia(e.target.value)}
                  placeholder="X/Instagram/TikTok Handler"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder=" Country (e.g. USA)"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={drink}
                  onChange={(e) => setDrink(e.target.value)}
                  placeholder="Favorite Starbucks Drink 😉"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-2 border rounded-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-500 text-white py-2 rounded-full hover:bg-green-700"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Right Side: About the App */}
            <div className="w-full md:w-1/2 lg:w-1/3 md:pl-6 px-4 py-4 mx-auto border rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                What is Next Starbucks Drink? 😵‍💫
              </h2>
              <p className="mb-2">First of all,</p>
              <p className="text-emerald-600">
                <b>WELCOME TO YOUR NEXT STARBUCKS DRINK</b>
              </p>
              <p className="text-black-600">
                If you are a Starbucks lover and want to meet other Starbucks
                lovers, this is your place!
              </p>
              <ul className="mt-4 list-disc list-inside mb-7">
                <li>Add your name</li>
                <li>
                  Provide your social media handle so others can contact you if
                  you share the same Starbucks interests.
                </li>
                <li>Share your favorite Starbucks drink.</li>
                <li>Upload a picture of your favorite Starbucks drink.</li>
              </ul>
              <p className="text-emerald-600">
                But most importantly, have fun! And check this website from time
                to time in case you meet another person who loves the same
                starbucks drink as you 💚
              </p>
            </div>
          </div>

          {/* Wall of Posts */}
          <div className="p-6 bg-gray-100 dark:bg-gray-800 flex flex-wrap justify-center">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-700 shadow-md rounded p-4 m-2 w-full md:w-1/3 lg:w-1/4"
              >
                <h3 className="text-lg font-semibold">
                  {post.name} ({post.country})
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Social Media: {post.social_media}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Favorite Drink: {post.drink}
                </p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl} // Directly use the public URL
                    alt={post.drink}
                    className="mt-2 w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
