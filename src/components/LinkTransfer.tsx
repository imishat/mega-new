/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSocket from "../hooks/useSocket";
import { useAppSelector } from "../redux/hooks";


type FormValues = {
  type: "link" | "code";
  url: string;
  code?: string;
};

export default function LinkTransfer({ seter,id }: any) {
  // const { id } = useParams<{ id: string }>();
    const { data }: any = useAppSelector((state) => state.auth);
  console.log(data.data.id,"user")
const userId =data.data.id
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      type: "code",
      url: seter || "", // use initial seter value
    }
  });

  const { sendToServer } = useSocket();
  const selectedType = watch("type");

  // Watch for changes in `seter` and update `url`
  useEffect(() => {
    if (seter) {
      setValue("url", seter);
    }
  }, [seter, setValue]);

  const onSubmit = (data: FormValues) => {

     const payload = {
    ...data,
    ...(data.type === "link" && id && { userId }), // only include userId when type is 'link'
  };
  console.log(data,data.type ,payload)
     sendToServer(data.type, id, payload);

    
    reset({
      type: "code",
      code: "",
      url: seter || "", // re-set URL after submit
    });
  };

  return (
    <>
      {/* <h2 className="text-xl my-10 font-semibold">Link Transfer</h2> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mt-6 grid gap-4 ${selectedType === "code"
          ? "grid-cols-1 md:grid-cols-4"
          : "grid-cols-1 md:grid-cols-3"
          }`}
      >
        <select
          {...register("type")}
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm dark:bg-gray-700"
        >
          <option value="link">Link</option>
          <option value="code">Code</option>
        </select>

        <input
          type="text"
          {...register("url", { required: true })}
          placeholder="Enter your link here..."
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm h-9 resize-none dark:bg-gray-700"
        />

        {selectedType === "code" && (
          <input
            type="text"
            {...register("code", { required: selectedType === "code" })}
            placeholder="Enter your code here..."
            className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm h-9 resize-none dark:bg-gray-700"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}
