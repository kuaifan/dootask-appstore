import type {AppItem} from "@/types/app"

interface AppDetailProps {
  app: AppItem
}

export function AppDetail({ app }: AppDetailProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{app.info.name}</h2>
      {/* 后续会添加更多详情内容 */}
    </div>
  )
}
