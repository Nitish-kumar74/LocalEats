import { shops } from '../data';
import Link from 'next/link';
import Image from 'next/image';

export default function ShopDetail({ params }) {
  const shop = shops.find(shop => shop.id === params.id);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Shop not found</h1>
          <Link href="/shop" className="text-red-600 hover:text-red-800">
            Return to shops list
          </Link>
        </div>
      </div>
    );
  }

  // Get the first image or use a placeholder if no images exist
  const firstImage = shop.images?.[0] || '/placeholder-shop.jpg';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src={firstImage}
              alt={shop.name}
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-red-600 font-semibold">
              {shop.category}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">{shop.name}</h1>
            <p className="mt-2 text-gray-600">{shop.description}</p>
            <div className="mt-4">
              <p className="text-gray-700"><strong>Location:</strong> {shop.location}</p>
              <p className="text-gray-700"><strong>Hours:</strong> {shop.openingHours}</p>
              <p className="text-gray-700"><strong>Contact:</strong> {shop.contact}</p>
              <p className="text-gray-700"><strong>Rating:</strong> {shop.rating}/5</p>
            </div>
          </div>
        </div>
        
        {/* Gallery of additional images */}
        {shop.images?.length > 1 && (
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">More Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shop.images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  className="h-48 w-full object-cover rounded-lg"
                  src={image}
                  alt={`${shop.name} - Image ${index + 2}`}
                  width={300}
                  height={200}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const shop = shops.find(shop => shop.id === params.id);
  
  return {
    title: `${shop?.name || 'Shop'} - Baragaon Local Shops`,
    description: shop?.description || `Discover ${shop?.name}, a ${shop?.category} located in ${shop?.location}`,
    openGraph: {
      images: shop?.images?.length > 0 ? [{ url: shop.images[0] }] : [],
    },
  };
}