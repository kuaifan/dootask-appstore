import type {AppItem} from "@/types/app"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ExternalLink} from "lucide-react"
import {useTranslation} from "react-i18next";
import {requestAPI} from "@dootask/tools";
import {useEffect, useState} from "react";
import {Skeleton} from "./ui/skeleton";
import ReactMarkdown from "react-markdown"
import "@/styles/github-markdown-light.css"

interface AppDetailProps {
  app: AppItem
}

export function AppDetail({app}: AppDetailProps) {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true)
  const [appDetail, setAppDetail] = useState<AppItem>(app)

  useEffect(() => {
    requestAPI({
      url: 'apps/info',
      data: {
        app_name: app.name
      }
    }).then(({data}) => {
      if (data) {
        setAppDetail(data)
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [app]);

  return (
    <div className="p-6 flex-1 h-0 flex flex-col">
      {/* 顶部信息区 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-1 items-start gap-4 mr-4">
          <img src={appDetail.info.icon} alt={appDetail.info.name} className="w-16 h-16 rounded-lg object-cover"/>
          <div className="min-h-16 flex flex-col justify-center">
            <div className="text-2xl font-bold mb-1">{appDetail.info.name}</div>
            <div className="text-gray-500 text-sm mb-1">{appDetail.info.description}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 min-w-[120px]">
          {appDetail.local.status === 'installed' ? (
            <Button className="bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-6 py-2 font-semibold cursor-pointer">{t('app.uninstall')}</Button>
          ) : (
            <Button className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg px-6 py-2 font-semibold cursor-pointer">{t('app.install')}</Button>
          )}
          <div className="flex flex-wrap justify-end gap-2 mt-2">
            {appDetail.info.website && (
              <a href={appDetail.info.website} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                {t('common.website')} <ExternalLink size={14}/>
              </a>
            )}
            {appDetail.info.document && (
              <a href={appDetail.info.document} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                {t('common.document')} <ExternalLink size={14}/>
              </a>
            )}
            {appDetail.info.github && (
              <a href={appDetail.info.github} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                {t('common.open_community')} <ExternalLink size={14}/>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div className="border-b border-gray-200 mb-6"/>

      {/* Main Features */}
      <div className="flex-1 h-0 overflow-hidden">
        <ScrollArea className="h-full">
          {loading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-[80%]"/>
              <Skeleton className="h-4 w-[70%]"/>
              <Skeleton className="h-4 w-[40%]"/>
            </div>
          ) : (
            appDetail.document ? (
              <div className="flex w-full">
                <div className="flex-1 w-0 prose select-text app-markdown-body">
                  <ReactMarkdown>{appDetail.document}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mb-4">
                {t('app.no_document')}
              </div>
            )
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
