import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";

interface AppCardProps {
  icon?: string;
  title: string;
  description: string;
  status: "已安装" | "安装";
  category?: string | string[];
}

export function AppCard({icon, title, description, status, category}: AppCardProps) {
  const statusClass = {
    "已安装": "bg-green-100 text-green-800 hover:bg-green-200",
    "安装": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  }[status];

  return (
    <Card className="flex flex-col overflow-hidden border px-2 py-5">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-md">
              {icon ? (
                <div className="relative h-10 w-10">
                  <Image
                    src={icon}
                    alt={title}
                    fill
                    sizes="40px"
                    style={{objectFit: "contain"}}
                  />
                </div>
              ) : (
                <div className="relative h-10 w-10">
                  <Image
                    src="/icons/default-app-icon.svg"
                    alt={title}
                    fill
                    sizes="40px"
                    style={{objectFit: "contain"}}
                  />
                </div>
              )}
            </div>
            <div className="ml-3 min-h-12 flex flex-col justify-center">
              <h3 className="font-medium">{title}</h3>
              {category && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Array.isArray(category) ? (
                    category.map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{cat}</Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">{category}</Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md ${statusClass} whitespace-nowrap`}>
            {status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
