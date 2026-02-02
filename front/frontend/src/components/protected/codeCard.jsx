import Prism from "prismjs";
import { useEffect, useRef } from "react";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export default function CodeCard({ code,sender,language = "cpp" }) {
  const codeRef = useRef();

    const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    (async () => {
      await import("prismjs/components/prism-clike");
      await import("prismjs/components/prism-c");
      await import("prismjs/components/prism-cpp");

      Prism.highlightAll();
    })();
  }, []);

   useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="bg-[#1e1e1e] text-white rounded-xl p-4 border w-[100%z] border-gray-700 shadow-lg relative mt-2">
          <div className="flex justify-between items-center mb-3">
            <span>{sender}</span>
        <span className="text-sm text-gray-300">{language.toUpperCase()}</span>

        <button 
          onClick={copyCode}
          className="bg-gray-700 hover:bg-gray-600 px-2 py-1 text-xs rounded"
        >
          Copy 
        </button>
      </div>


      <pre className="line-numbers rounded ">
        <code ref={codeRef} className={`language-javascript`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
