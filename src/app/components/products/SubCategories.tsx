// import React from 'react'
// import SmoothCollapseGSAP from "./SmoothCollapse";

// function SubCategories() {
//   return (
//    <SmoothCollapseGSAP  
//         className="hidden md:block"
//         isOpen={showSubCategories}
//       >
//         <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto">
//           {categoryTabs
//             .find((t) => t.id === activeTab)
//             ?.subCategories?.map((sub) => {
//               const selected = selectedSubCategories.includes(sub.id);
//               return (
//                 <button
//                   key={sub.id}
//                   type="button"
//                   onClick={() => toggleSubCategory(sub.id)}
//                   className={clsx(
//                     "px-4 py-2 border rounded-[10px] transition inline-flex items-center",
//                     selected
//                       ? "border-[#DC4C03] text-[#DC4C03]"
//                       : "border-[#4C5861] hover:bg-gray-100"
//                   )}
//                 >
//                   <span className="mr-2">{sub.name}</span>
//                   {selected && (
//                     <div
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleSubCategory(sub.id);
//                       }}
//                       className="w-[20px] h-[20px] relative"
//                     >
//                       <Image src="/images/cross-orange.svg" alt="icon" fill />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//         </div>
//       </SmoothCollapseGSAP>
//   )
// }

// export default SubCategories