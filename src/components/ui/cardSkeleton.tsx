import { Skeleton } from "./skeleton";

const CardSkeleton = () => {
  return (
    <article className="h-full p-2 min-h-96 bg-white dark:bg-gray-600 rounded-lg shadow-md overflow-hidden flex flex-col items-center gap-2 hover:shadow-xl transform hover:scale-[1.03] hover:-translate-y-2 transition-colors duration-300">
      <Skeleton className="w-full h-48 object-cover rounded-lg" />
      <div className="flex flex-col items-start w-full overflow-hidden p-2">
        <Skeleton className="w-1/2 h-6 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-1/4 h-6" />
      </div>
    </article>
  );
};

export default CardSkeleton;
