export default function SkeletonBox({ loading }: { loading: boolean }) {
  return loading ? (
    <div className="pl-3 pr-5 pb-5 animate-pulse flex flex-col gap-5">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className="bg-neutral-700 h-5 w-40" />
          <div className="bg-neutral-700 h-5 w-20" />
        </div>
      ))}
    </div>
  ) : null;
}
