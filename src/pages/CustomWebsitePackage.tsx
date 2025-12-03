
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";

const CustomWebsitePackage = () => {
  const features = [
    "১০০% সেন্ড হবে গ্যারান্টি",
    "ব্যক্তিগত (যেকোনো স্টাইল/ডিজাইন)",
    "ডেডিকেটেড পার্সোনাল ডোমেইন",
    "তিন মাসের গ্যারান্টি, পরে চার্জ প্রযোজ্য",
    "মোবাইল ফ্রেন্ডলি এক্সক্লুসিভ ডিজাইন",
    "এক্সক্লুসিভ ডিজাইন আইডিয়া – শুধুই আপনার জন্য",
    "সর্বোচ্চ ২৪ ঘণ্টায় ডেলিভারি",
    "ফ্রি SSL সার্টিফিকেট",
    "ইউজার ফ্রেন্ডলি UI/UX",
    "২৪/৭ WhatsApp সাপোর্ট",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <div className="bg-white dark:bg-gray-800 max-w-xl w-full rounded-2xl shadow-xl border border-slate-300 p-6 md:p-10 text-center animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">
          ব্যক্তিগত কাস্টম ওয়েবসাইট ইউআরএল তৈরি করুন
        </h1>
        <p className="text-base text-slate-500 mb-6">
          এই বিশেষ লিঙ্কটি শুধুমাত্র আপনার জন্য – ১০০% নিরাপদ, প্রাইভেট এবং এক্সক্লুসিভ
        </p>

        <ul className="text-left space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start gap-2 text-slate-700 dark:text-slate-200">
              <FaCheckCircle className="text-teal-500 mt-0.5 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/8801817423940?text=আমি%20একটি%20একান্ত%20কাস্টম%20ওয়েবসাইট%20অর্ডার%20করতে%20চাই"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3 rounded-lg text-sm md:text-base transition-all duration-200 shadow-md w-full sm:w-auto"
        >
          <FaWhatsapp className="text-lg" />
          অর্ডার করতে WhatsApp করুন
        </a>
      </div>
    </div>
  );
};

export default CustomWebsitePackage;
