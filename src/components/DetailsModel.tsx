import { useEffect } from "react";
import { useCreateTransectionMutation } from "../redux/Features/transectionApi/transectionApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface WebsiteModalProps {
  website: any;
  onClose: () => void;
}

export default function WebsiteModal({ website, onClose }: WebsiteModalProps) {
  const [createTransection] = useCreateTransectionMutation()
  const handleBuyNow = async () => {
    if (!website) return;

    try {

      const { _id,...rest} = website
      const finalData: any = {
        ...rest,
        website: _id,
        amount: website.price
      }
      // Call the transaction API
      const response: any = await createTransection(finalData).unwrap();
      if (response) {
        window.location.href = response.paymentUrl;
      }

      console.log(response);
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      onClose(); // Close the modal
    }
  };
    useEffect(() => {
    handleBuyNow();
  }, []);
  console.log(website)
  return (
    // <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    //   <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative p-6">
    //     <button
    //       className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
    //       onClick={onClose}
    //     >
    //       ✕
    //     </button>

    //     <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
    //       {website.sites}
    //     </h2>
    //     <p className="text-sm text-gray-500 mb-6 italic">{website.category}</p>

    //     {/* Product Overview */}
    //     <div className="mb-6">
    //       <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Product Overview</h3>
    //       <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{website.description}</p>
    //     </div>

    //     {/* Video Demo */}
    //     {website.video && (
    //       <div className="mb-6">
    //         <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Video Preview</h3>
    //         <video controls className="w-full rounded-lg max-h-96 border border-gray-300 dark:border-gray-600">
    //           <source src={website.video} />
    //           Your browser does not support the video tag.
    //         </video>
    //       </div>
    //     )}

    //     {/* Image Gallery */}
    //     {website.images?.length > 0 && (
    //       <div className="mb-6">
    //         <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Image Gallery</h3>
    //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    //           {website.images.map((img: string, index: number) => (
    //             <img
    //               key={index}
    //               src={img}
    //               alt={`Screenshot ${index + 1}`}
    //               className="rounded-lg border border-gray-300 dark:border-gray-700"
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Additional Info */}
    //     <div className="mb-6">
    //       <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Details</h3>
    //       <ul className="text-gray-700 dark:text-gray-300 space-y-1">
    //         <li><strong>URL:</strong> <a href={website.siteUrl} className="text-blue-500 hover:underline" target="_blank">{website.siteUrl}</a></li>
    //         <li><strong>Price:</strong> {website.price} TAKA</li>
    //         <li><strong>Type:</strong> {website.type}</li>
    //         {website.docs && (
    //           <li><strong>Docs:</strong> <a href={website.docs} className="text-blue-500 hover:underline" target="_blank">{website.docs}</a></li>
    //         )}
    //       </ul>
    //     </div>

    //     {/* CTA */}
    //     {/* <div className="flex justify-end">
    //       <button
    //         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
    //         onClick={handleBuyNow}
    //       >
    //         Buy Now
    //       </button>
    //     </div> */}
    //   </div>
    // </div>

    <div>
<h1>loding</h1>
    </div>
  );
}
