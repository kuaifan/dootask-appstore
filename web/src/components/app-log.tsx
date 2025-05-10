import {requestAPI} from "@dootask/tools";
import {useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Skeleton} from "./ui/skeleton";
import {useTranslation} from "react-i18next";
import {ScrollArea} from "./ui/scroll-area";

interface AppLogProps {
  appName: string
  onLoading?: (loading: boolean) => void
}

export interface AppLogRef {
  fetchLogs: (isQueue?: boolean) => Promise<void>
}

export const AppLog = forwardRef<AppLogRef, AppLogProps>(({appName, onLoading}, ref) => {
  const {t} = useTranslation()
  const [loading, setLoading] = useState(true)
  const [logDetail, setLogDetail] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const isRequestingRef = useRef(false)
  const timerRef = useRef<NodeJS.Timeout>(null)

  const fetchLogs = async (isQueue = true) => {
    if (isRequestingRef.current) return

    const now = Date.now()
    try {
      isRequestingRef.current = true
      setLoading(true)
      onLoading?.(true)
      const {data} = await requestAPI({
        url: 'apps/logs',
        data: {
          app_name: appName
        }
      })
      if (data) {
        setLogDetail(data.log)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
        onLoading?.(false)
        isRequestingRef.current = false
      }, isQueue ? 1000 - (Date.now() - now) : 0)
    }
  }

  useImperativeHandle(ref, () => ({
    fetchLogs
  }))

  useEffect(() => {
    // 初始加载
    fetchLogs(false)

    // 设置定时器
    timerRef.current = setInterval(() => {
      fetchLogs(false)
    }, 15000)

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
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
})
