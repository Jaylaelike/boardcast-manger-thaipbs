import { Skeleton } from "@/components/ui/skeleton"

interface LoadingProps {
    WidghtLoadingProps: string;

}

export default function Loading( { WidghtLoadingProps }: LoadingProps) {
    return (
        <div className="flex items-center space-x-4">
            <div className="space-y-2">
                <Skeleton className={`w-[${WidghtLoadingProps}px] h-[126px]`} />
            </div>
        </div>
    )
}

// import { Skeleton } from "@/components/ui/skeleton"

// export default function Loading() {
//   return (
//     <div className="flex items-center space-x-4">
//       <Skeleton className="h-12 w-12 rounded-full" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px]" />
//         <Skeleton className="h-4 w-[200px]" />
//       </div>
//     </div>
//   )
// }



// `w-[${wClass}] h-[${hClass}]`