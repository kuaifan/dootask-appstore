import {requestAPI} from "@dootask/tools";
import {useEffect, useState, useRef} from "react";
import {Skeleton} from "./ui/skeleton";
import {useTranslation} from "react-i18next";
import {ScrollArea} from "./ui/scroll-area";

interface AppLogProps {
  appName: string
}

export function AppLog({appName}: AppLogProps) {
  const {t} = useTranslation()
  const [loading, setLoading] = useState(true)
  const [logDetail, setLogDetail] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAPI({
      url: 'apps/logs',
      data: {
        app_name: appName
      }
    }).then(({data}) => {
      if (data) {
        setLogDetail(data.log)
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [appName]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: "instant"});
    }
  }, [logDetail]);

  return (
    <ScrollArea className="h-full">
      <div className="select-text">
        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-[80%]"/>
            <Skeleton className="h-4 w-[70%]"/>
            <Skeleton className="h-4 w-[40%]"/>
          </div>
        ) : (
          logDetail ? (
            <pre><code>{logDetail}</code></pre>
          ) : (
            <div className="text-sm text-gray-500 mb-4">{t('app.no_log')}</div>
          )
        )}
      </div>
      <div ref={bottomRef}></div>
    </ScrollArea>
  )
}
