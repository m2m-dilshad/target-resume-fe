// 'use client';
// import Button from '@/components/ui/Button';
// import Heading from '@/components/ui/Heading';
// import Typography from '@/components/ui/Typography';
// import { useMemo, useState } from 'react';
// import { Template, FilterState, FilterCategory } from '../_constants/templates.types';
// import { ChevronDown, X } from 'lucide-react';
// const templateList: Template[] = [
//     {
//         id: 1,
//         name: 'Modern Pro',
//         structure: 'Chronological',
//         design: 'Modern',
//         layout: 'Two Column',
//     },
//     {
//         id: 2,
//         name: 'Classic Professional',
//         structure: 'Chronological',
//         design: 'Professional',
//         layout: 'One Column',
//     },
//     {
//         id: 3,
//         name: 'Creative Edge',
//         structure: 'Combination',
//         design: 'Creative',
//         layout: 'Mixed',
//     },
//     {
//         id: 4,
//         name: 'Minimal Simple',
//         structure: 'Functional',
//         design: 'Simple',
//         layout: 'One Column',
//     },
//     {
//         id: 5,
//         name: 'Modern Compact',
//         structure: 'Chronological',
//         design: 'Modern',
//         layout: 'Two Column',
//     },
// ];
// const filterCategories: FilterCategory[] = ['structure', 'design', 'layout'];

// export default function Templates() {
//     const [filters, setFilters] = useState({
//         structure: [],
//         design: [],
//         layout: [],
//     });

//     const toggleFilter = (category: FilterCategory, value: string) => {
//         setFilters((prev) => {
//             const list = prev[category];
//             return {
//                 ...prev,
//                 [category]: list.includes(value)
//                     ? list.filter((v) => v !== value)
//                     : [...list, value],
//             };
//         });
//     };
//     const filteredTemplates = useMemo(() => {
//         return templateList.filter((t) => {
//             const structureMatch =
//                 filters.structure.length === 0 ||
//                 filters.structure.includes(t.structure);
//             const designMatch =
//                 filters.design.length === 0 || filters.design.includes(t.design);
//             const layoutMatch =
//                 filters.layout.length === 0 || filters.layout.includes(t.layout);
//             return structureMatch && designMatch && layoutMatch;
//         });
//     }, [filters]);

//     const activeFilterCount = filters.structure.length + filters.design.length + filters.layout.length;

//     return (
//         <div className="p-4">
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <Heading variant="h5" className="text-primary mb-2">
//                         Templates Library
//                     </Heading>
//                     <Typography variant="span" size='xs' className="text-muted-foreground">
//                         Pick a layout that best showcases your career path
//                     </Typography>
//                 </div>

//                 <Button size="base" className='w-full max-w-xs' >
//                     Suggest Template
//                 </Button>
//             </div>
//             <div className='sticky top-0 z-20 mb-10 border-y border-border bg-background/95 py-1'>
//                 <div className='flex flex-wrap items-center gap-6'>
//                     <div className='mr-4 flex items-center gap-2 border-r border-border pr-6 text-sm font-semibold'>
//                         <Typography variant='span' className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white'>
//                             {activeFilterCount}
//                         </Typography>
//                         Filters
//                     <div>
//   {filterOptions[category].map((option) => (
//     <label
//       key={option}
//       className={`hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
//         filters[category].includes(option)
//           ? 'bg-primary font-semibold text-primary'
//           : ''
//       }`}
//     >
//       {option}

//       <input
//         type='checkbox'
//         className='hidden'
//         checked={filters[category].includes(option)}
//         onChange={() => toggleFilter(category, option)}
//       />

//       {filters[category].includes(option) && <X size={14} />}
//     </label>
//   ))}
// </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
export default function Templates() {
  return <div>templates page</div>;
}
