/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";

export const handleCopyClick = (textToCopy: any) => {
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  toast.success("copied to Clipboard");
};
