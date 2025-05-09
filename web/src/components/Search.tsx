import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export function Search() {
  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="搜索"
        className="pr-10 w-full h-10 text-sm"
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
      >
        <div className="relative w-[16px] h-[16px]">
          <Image src="/icons/search.svg" alt="搜索" fill/>
        </div>
        <span className="sr-only">搜索</span>
      </Button>
    </div>
  );
}
