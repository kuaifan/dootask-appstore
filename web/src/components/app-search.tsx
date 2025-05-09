import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

export function AppSearch() {
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
        <Search />
        <span className="sr-only">搜索</span>
      </Button>
    </div>
  );
}
