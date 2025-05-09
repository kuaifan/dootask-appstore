"use client"
import {useTranslations} from 'next-intl';
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AppCard} from "@/components/app-card";
import {AppSearch} from "@/components/app-search";
import {ChevronLeft, ChevronRight, RefreshCw} from 'lucide-react';
import {useTheme} from "next-themes"

export default function Home() {
  const {setTheme, resolvedTheme} = useTheme()
  const t = useTranslations();

  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">{t('common.title')}</h1>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}>
              <RefreshCw/>
            </Button>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[300px]">
            <AppSearch/>
          </div>
        </div>

        <div className="flex gap-x-4 mb-6">
          <Button variant="secondary" className="px-4 py-2 text-sm rounded-full">{t('app.all')}</Button>
          <Button variant="ghost" className="px-4 py-2 text-sm rounded-full">{t('app.installed')}</Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-5 max-w-md light:bg-gray-100">
            <TabsTrigger value="all" className="text-sm">{t('app.all')}</TabsTrigger>
            <TabsTrigger value="database" className="text-sm">{t('categories.database')}</TabsTrigger>
            <TabsTrigger value="oss" className="text-sm">{t('categories.oss')}</TabsTrigger>
            <TabsTrigger value="tool" className="text-sm">{t('categories.tool')}</TabsTrigger>
            <TabsTrigger value="note" className="text-sm">{t('categories.note')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Nginx"
                description="Nginx is a web server and a reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, with a strong f..."
                status="installed"
                category={["Tool", "Web Server"]}
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Redis"
                description="Redis is an in-memory data structure store, used as a database, cache and message broker."
                status="installed"
                category="Database"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooAlioss"
                description="DooAliOss is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="install"
                category="Oss"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooT x COS"
                description="DooT/COS is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="install"
                category="Oss"
              />
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooQiNiu"
                description="DooQiNiu is a plugin for DooTask to support Alioss storage. Note: This is a local image."
                status="install"
                category="Oss"
              />
            </div>
          </TabsContent>

          <TabsContent value="database" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Redis"
                description="Redis is an in-memory data structure store, used as a database, cache and message broker."
                status="installed"
                category="Database"
              />
            </div>
          </TabsContent>

          <TabsContent value="oss" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="DooAlioss"
                description="DooAliOss is a plugin for DooTask to support AliOss storage. Note: This is a local image."
                status="install"
                category="Oss"
              />
            </div>
          </TabsContent>

          <TabsContent value="tool" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon="http://127.0.0.1:2222/images/application/appstore.svg"
                title="Nginx"
                description="Nginx is a web server and a reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, with a strong f..."
                status="installed"
                category="Tool"
              />
            </div>
          </TabsContent>

          <TabsContent value="note" className="mt-6">
            <div className="empty-content text-center py-10 text-gray-500">
              <p>{t('app.noApps')}</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
          <div>{t('app.totalItems', { count: 5 })}</div>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" size="icon" className="w-7 h-7">
              <ChevronLeft />
            </Button>
            <span>1</span>
            <span>/</span>
            <span>1</span>
            <span>{t('app.page')}</span>
            <Button variant="outline" size="icon" className="w-7 h-7">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
