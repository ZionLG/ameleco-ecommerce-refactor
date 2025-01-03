import { Separator } from "~/components/ui/Separator";
import { Skeleton } from "~/components/ui/skeleton";
import {
  ProductWrapper,
  ProductMain,
  StickyProduct,
  MobileProductWrapper,
  MobileProductSection,
} from "./_components/ProductLayout";

export default function Loading() {
  return (
    <ProductWrapper>
      <ProductMain>
        <Skeleton className="bg-default-300 rounded-sm shadow-md" />

        <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
          <Skeleton className="h-8 w-36 rounded-sm" />
          <Skeleton className="h-10 w-80 rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
        </div>
      </ProductMain>
      <StickyProduct>
        <Skeleton className="h-10 grow rounded-sm" />
        <Skeleton className="h-6 w-32 rounded-sm" />
        <Separator className="my-2" />
        <span className="flex min-w-fit items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-sm" />
          <Skeleton className="h-10 w-12 rounded-sm" />
        </span>
        <Skeleton className="h-7 w-48 rounded-sm" />

        <Skeleton className="h-10 w-full rounded-sm" />
      </StickyProduct>

      <MobileProductWrapper>
        <MobileProductSection section="upper">
          <Skeleton className="bg-default-300 h-64 rounded-sm shadow-md" />

          <Skeleton className="h-10 grow rounded-sm" />
          <Skeleton className="h-6 w-32 rounded-sm" />
          <Separator className="my-2" />
          <span className="flex min-w-fit items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-sm" />
            <Skeleton className="h-10 w-12 rounded-sm" />
          </span>
          <Skeleton className="h-7 w-48 rounded-sm" />

          <Skeleton className="h-10 w-full rounded-sm" />
        </MobileProductSection>
        <MobileProductSection section="lower">
          <Skeleton className="h-8 w-36 rounded-sm" />
          <Skeleton className="h-10 w-80 rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
        </MobileProductSection>
      </MobileProductWrapper>
    </ProductWrapper>
  );
}
