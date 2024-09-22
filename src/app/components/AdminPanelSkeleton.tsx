import { Skeleton } from "@/components/ui/skeleton";

export function AdminPanelSkeleton() {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/4 h-screen p-4 bg-gray-100">
        <div className="mb-4">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Top Button */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-48 rounded" />
        </div>

        {/* Filter Input */}
        <div className="flex mb-6">
          <Skeleton className="h-10 w-full max-w-xs rounded" />
        </div>

        {/* Table */}
        <div className="border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-4 py-2 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-4 py-2 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-4 py-2 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Skeleton className="h-6 w-12 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="h-6 w-24 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="h-6 w-24 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="h-8 w-32 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Skeleton className="h-10 w-32 rounded mr-2" />
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}
