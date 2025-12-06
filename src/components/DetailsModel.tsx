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

      
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      onClose(); // Close the modal
    }
  };
    useEffect(() => {
    handleBuyNow();
  }, []);
  
  return (
   
    <div>
<h1>loding</h1>
    </div>
  );
}
